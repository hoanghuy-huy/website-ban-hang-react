import { Op, where } from "sequelize";
import db from "../models/index";
import emailService from "../services/emailService";
let createNewOrder = (rawData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { order, orderDetail, productList } = rawData;
      if (orderDetail && orderDetail.length < 1) {
        resolve({
          EM: "something wrong with data",
          DT: "",
          EC: 1,
        });
      }
      let productId = productList.map((item) => item.productId);
      let productQuantity = productList.map((item) => item.quantity);

      let products = await db.Product.findAll({
        where: { id: productId },
      });

      const updateQuantities = products.map((product, index) => ({
        id: product.id,
        newInventory: product.inventoryNumber - productQuantity[index],
      }));

      const dataOrder = await db.Order.create(order);

      if (dataOrder) {
        const buildDataOrderDetail = orderDetail.map((item) => {
          return {
            orderId: dataOrder.id,
            ...item,
          };
        });

        const dataOrderDetail = await db.OrderDetail.bulkCreate(
          buildDataOrderDetail
        );

        if (!dataOrderDetail) {
          await db.Order.destroy({
            where: { id: dataOrder.id },
          });

          resolve({
            EM: "something wrong with data order detail",
            DT: "",
            EC: 1,
          });
        }

        await Promise.all(
          updateQuantities.map(({ id, newInventory }) =>
            db.Product.update(
              { inventoryNumber: newInventory },
              { where: { id } }
            )
          )
        );

        resolve({
          EM: "ok! create order successfully",
          DT: dataOrder,
          EC: 0,
        });
      }

      resolve({
        EM: "Something wrong with data order",
        DT: "",
        EC: 1,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

let handleGetAllOrderWithUserIdPagination = ({
  limit,
  page,
  userId,
  pending,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        return reject({ EM: "User ID không hợp lệ", EC: 400 });
      }
      limit = +limit;
      let offset = (page - 1) * limit;

      let { count, rows } = await db.Order.findAndCountAll({
        where: !pending
          ? { userId }
          : { [Op.and]: [{ userId: userId }, { status: 0 }] },
        offset: offset,
        limit: limit,
        include: [
          {
            model: db.OrderDetail,
            include: [
              {
                model: db.Product,
                attributes: ["name", "thumbnailUrl"],
              },
            ],
          },
        ],
        distinct: true,
        order: [["id", "DESC"]],
      });

      let totalPages = Math.ceil(count / limit);

      let data = {
        totalPages: totalPages,
        totalItems: count,
        orders: rows,
      };

      resolve({
        EM: "Ok",
        EC: 0,
        DT: data,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

let handleGetAllOrderInTransitWithUserIdPagination = ({
  limit,
  page,
  userId,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        return reject({ EM: "User ID không hợp lệ", EC: 400 });
      }
      limit = +limit;

      let offset = (page - 1) * limit;

      let { count, rows } = await db.Order.findAndCountAll({
        where: {
          [Op.and]: [
            { userId: userId },
            { orderStatusDelivery: 1 },
            { orderStatus: null },
            { status: 1 },
          ],
        },
        offset: offset,
        limit: limit,
        include: [
          {
            model: db.OrderDetail,
            include: [
              {
                model: db.Product,
                attributes: ["name", "thumbnailUrl"],
              },
            ],
          },
        ],
        distinct: true,
        order: [["id", "DESC"]],
      });

      let totalPages = Math.ceil(count / limit);

      let data = {
        totalPages: totalPages,
        totalItems: count,
        orders: rows,
      };

      resolve({
        EM: "Ok",
        EC: 0,
        DT: data,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

let handleGetAllOrderStatusWithUserIdPagination = ({
  limit,
  page,
  userId,
  status,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId || !status) {
        return reject({ EM: "Missing value", EC: 400 });
      }
      limit = +limit;
      let offset = (page - 1) * limit;
      let { count, rows } = await db.Order.findAndCountAll({
        where: {
          [Op.and]: [
            { userId: userId },
            { orderStatus: status },
            status == 1 && { orderStatusDelivery: true },
          ],
        },
        offset: offset,
        limit: limit,
        include: [
          {
            model: db.OrderDetail,
            include: [
              {
                model: db.Product,
                attributes: ["name", "thumbnailUrl"],
              },
            ],
          },
        ],
        distinct: true,
        order: [["id", "DESC"]],
      });

      let totalPages = Math.ceil(count / limit);

      let data = {
        totalPages: totalPages,
        totalItems: count,
        orders: rows,
      };

      resolve({
        EM: "Ok",
        EC: 0,
        DT: data,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

let handleGetOneOrder = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { orderId } = params;
      if (!orderId) {
        reject({
          EM: "Missing value",
          DT: "",
          EC: 1,
        });
      }

      const data = await db.Order.findOne({
        where: { id: orderId },
        include: [
          {
            model: db.OrderDetail,
            include: [
              { model: db.Product, attributes: ["name", "thumbnailUrl"] },
            ],
          },
        ],
      });

      if (!data) {
        reject({
          EM: "Not Found Order",
          DT: "",
          EC: 1,
        });
      }

      resolve({
        EM: "Ok",
        DT: data,
        EC: 0,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

let handleDeleteFunc = (query, productList) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { orderId } = query;
      if (!productList) {
        reject({
          EC: -1,
          EM: "Missing Value Product List",
          DT: [],
        });
      }
      let productId = productList.map((item) => item.productId);
      let productQuantity = productList.map((item) => item.quantity);

      let products = await db.Product.findAll({
        where: { id: productId },
      });

      const updateQuantities = products.map((product, index) => ({
        id: product.id,
        newInventory: product.inventoryNumber + productQuantity[index],
      }));

      if (!orderId) {
        return reject({
          EM: "Missing value",
          DT: "",
          EC: 1,
        });
      }

      const order = await db.Order.findOne({ where: { id: orderId } });
      if (!order) {
        return reject({
          EM: "Not Found Order",
          DT: "",
          EC: 1,
        });
      }

      await order.update({
        orderStatus: 0,
      });

      await Promise.all(
        updateQuantities.map(({ id, newInventory }) =>
          db.Product.update(
            { inventoryNumber: newInventory },
            { where: { id } }
          )
        )
      );

      resolve({
        EM: "Ok reject order success",
        DT: "",
        EC: 0,
      });
    } catch (error) {
      console.log(error);
      reject({
        EM: "An error occurred",
        DT: error.message,
        EC: 500,
      });
    }
  });
};

let handleGetAllOrderPagination = ({
  limit,
  page,
  pending,
  pendingShipment,
  orderStatus,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      limit = +limit;
      let offset = (page - 1) * limit;
      if (pendingShipment) {
        let { count, rows } = await db.Order.findAndCountAll({
          where: {
            [Op.and]: [
              { status: 1 },
              { orderStatusDelivery: pendingShipment },
              { orderStatus: null },
            ],
          },
          offset: offset,
          limit: limit,
          include: [
            {
              model: db.OrderDetail,
              include: [
                {
                  model: db.Product,
                  attributes: ["name", "thumbnailUrl"],
                },
              ],
            },
          ],
          distinct: true,
          order: [["id", "DESC"]],
        });
        let totalPages = Math.ceil(count / limit);

        let data = {
          totalPages: totalPages,
          totalItems: count,
          orders: rows,
        };

        resolve({
          EM: "Ok",
          EC: 0,
          DT: data,
        });
      }

      if (orderStatus) {
        let { count, rows } = await db.Order.findAndCountAll({
          where: {
            orderStatus: orderStatus,
          },
          offset: offset,
          limit: limit,
          include: [
            {
              model: db.OrderDetail,
              include: [
                {
                  model: db.Product,
                  attributes: ["name", "thumbnailUrl"],
                },
              ],
            },
          ],
          distinct: true,
          order: [["id", "DESC"]],
        });
        let totalPages = Math.ceil(count / limit);

        let data = {
          totalPages: totalPages,
          totalItems: count,
          orders: rows,
        };

        resolve({
          EM: "Ok",
          EC: 0,
          DT: data,
        });
      }

      let { count, rows } = await db.Order.findAndCountAll({
        where: pending
          ? { [Op.and]: [{ status: 0 }, { orderStatus: null }] }
          : "",
        offset: offset,
        limit: limit,
        include: [
          {
            model: db.OrderDetail,
            include: [
              {
                model: db.Product,
                attributes: ["name", "thumbnailUrl"],
              },
            ],
          },
        ],
        distinct: true,
        order: [["id", "DESC"]],
      });

      let totalPages = Math.ceil(count / limit);

      let data = {
        totalPages: totalPages,
        totalItems: count,
        orders: rows,
      };

      resolve({
        EM: "Ok",
        EC: 0,
        DT: data,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

let handleConfirmFunc = ({ orderId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!orderId) {
        reject({
          EM: "missing value id order",
          EC: 1,
          DT: "",
        });
      }

      await db.Order.update(
        {
          status: 1,
        },
        {
          where: { id: +orderId },
        }
      );

      resolve({
        EM: "Ok",
        EC: 0,
        DT: "",
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

let handleConfirmOrderForShipmentFunc = ({ orderId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!orderId) {
        reject({
          EM: "missing value id order",
          EC: 1,
          DT: "",
        });
      }

      await db.Order.update(
        {
          orderStatusDelivery: 1,
        },
        {
          where: { id: +orderId },
        }
      );

      resolve({
        EM: "Ok",
        EC: 0,
        DT: "",
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

module.exports = {
  createNewOrder,
  handleGetAllOrderWithUserIdPagination,
  handleGetOneOrder,
  handleDeleteFunc,
  handleGetAllOrderInTransitWithUserIdPagination,
  handleGetAllOrderStatusWithUserIdPagination,
  handleGetAllOrderPagination,
  handleConfirmFunc,
  handleConfirmOrderForShipmentFunc,
};
