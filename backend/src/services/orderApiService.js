import { Op } from "sequelize";
import db from "../models/index";
let createNewOrder = (rawData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { order, orderDetail } = rawData;

      if (orderDetail && orderDetail.length < 1) {
        resolve({
          EM: "something wrong with length order detail",
          DT: "",
          EC: 1,
        });
      }

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

let handleGetAllOrderWithUserIdPagination = ({ limit, page, userId, pending }) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        return reject({ EM: "User ID không hợp lệ", EC: 400 });
      }
      limit = +limit;
      let offset = (page - 1) * limit;

      let { count, rows } = await db.Order.findAndCountAll({
        where: !pending ? { userId } : {[Op.and] : [{userId: userId}, {status : 0}]},
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
        order: [['id', 'DESC']]
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



let handleGetAllOrderInTransitWithUserIdPagination = ({ limit, page, userId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        return reject({ EM: "User ID không hợp lệ", EC: 400 });
      }
      limit = +limit;

      let offset = (page - 1) * limit;

      let { count, rows } = await db.Order.findAndCountAll({
        where: {[Op.and]: [{userId: userId},{orderStatusDelivery: 1},{orderStatus : 0}]},
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
        order: [['id', 'DESC']]
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

let handleGetAllOrderStatusWithUserIdPagination = ({ limit, page, userId, status }) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId || !status) {
        return reject({ EM: "Missing value", EC: 400 });
      }
      limit = +limit;
      let offset = (page - 1) * limit;
      let { count, rows } = await db.Order.findAndCountAll({
        where: {[Op.and]: [{userId: userId},{orderStatus: status}, status == 1 && {orderStatusDelivery: true}]},
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
        order: [['id', 'DESC']]

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

let handleDeleteFunc = (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { orderId } = query;
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

      await db.OrderDetail.destroy({ where: { orderId: orderId } });

      await order.destroy();

      resolve({
        EM: "Ok delete success",
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
module.exports = {
  createNewOrder,
  handleGetAllOrderWithUserIdPagination,
  handleGetOneOrder,
  handleDeleteFunc,
  handleGetAllOrderInTransitWithUserIdPagination,
  handleGetAllOrderStatusWithUserIdPagination
};
