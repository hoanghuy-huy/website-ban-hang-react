import { Op } from "sequelize";
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
            totalPrice: item.quantity * item.price,
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
  statusReturnProduct,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        return reject({ EM: "User ID không hợp lệ", EC: 1 });
      }
      limit = +limit;
      let offset = (page - 1) * limit;

      let { count, rows } = await db.Order.findAndCountAll({
        where: !pending
          ? {
              [Op.and]: [
                { userId: userId },
                !!statusReturnProduct && { orderStatus: 1 },
                !!statusReturnProduct && {
                  statusReturnProduct: 1,
                },
              ],
            }
          : {
              [Op.and]: [
                { userId: userId },
                { status: 1 },
                { orderStatus: null },
                { statusReturnProduct: null },
                { orderStatusDelivery: 0 },
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

      console.log(status);
      limit = +limit;
      let offset = (page - 1) * limit;
      let { count, rows } = await db.Order.findAndCountAll({
        where: {
          [Op.and]: [
            { userId: userId },
            { orderStatus: status },
            status == 0 && { orderStatusDelivery: 0 },
            status == 1 && { orderStatusDelivery: 1 },
            status == 1 && { statusReturnProduct: null },
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
            [Op.and]: [
              { orderStatus: orderStatus },
              { statusReturnProduct: null },
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

let handleTotalProductSold = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const countProductSold = await db.OrderDetail.sum("quantity", {
        where: {
          [Op.and]: [{ status: 1 }, { returnItem: null }],
        },
      });

      resolve({
        EM: "Ok",
        EC: 0,
        DT: countProductSold,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

let handleTotalRevenue = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let totalPrice = await db.OrderDetail.sum("totalPrice", {
        where: {
          [Op.and]: [{ status: 1 }, { returnItem: null }],
        },
      });
      resolve({
        EM: "Ok",
        EC: 0,
        DT: totalPrice,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
//delivery success
let handleCustomerConfirmFunc = ({ orderId }) => {
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
          orderStatus: 1,
        },
        {
          where: { id: +orderId },
        }
      );

      const orderDetail = await db.OrderDetail.findAll({
        where: { orderId: +orderId },
      });

      if (orderDetail.length > 0) {
        const updatePromises = orderDetail.map((order) => {
          return order.update({
            status: 1,
          });
        });
        
        orderDetail.map(async (order) => {
          await db.Product.update(
            {
              quantitySold: db.Sequelize.literal(
                `quantitySold + ${order.quantity}`
              ),
            },
            {
              where: { id: order.productId },
            }
          );
        })
        await Promise.all(updatePromises);
      }

      resolve({
        EM: "Ok",
        EC: 0,
        DT: orderDetail,
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

let handleCustomerReturnOrderFunc = ({
  orderId,
  productId,
  productQuantity,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!orderId) {
        reject({
          EM: "missing value id order",
          EC: 1,
          DT: "",
        });
      }

      await db.OrderDetail.update(
        { returnItem: 1 },
        {
          where: {
            [Op.and]: [{ orderId: orderId }, { productId: productId }],
          },
        }
      );
      await db.Product.update(
        {
          inventoryNumber: db.sequelize.literal(`inventoryNumber + ${productQuantity}`),
          quantitySold: db.sequelize.literal(`quantitySold - ${productQuantity}`),
        },
        { where: { id: productId } }
      );

      resolve({
        EM: "Ok update success",
        EC: 0,
        DT: "",
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

let handleTotalOrderSold = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let quantityProductDeliverySuccess = await db.OrderDetail.sum(
        "quantity",
        {
          where: {
            [Op.and]: [{ returnItem: null }, { status: 1 }],
          },
        }
      );

      resolve({
        EM: "Ok",
        EC: 0,
        DT: quantityProductDeliverySuccess,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

let handleTotalOrderReturn = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let quantityProductDeliveryReturn = await db.OrderDetail.sum("quantity", {
        where: {
          [Op.and]: [{ returnItem: 1 }, { status: 1 }],
        },
      });
      resolve({
        EM: "Ok",
        EC: 0,
        DT: quantityProductDeliveryReturn,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

let checkDate = (dateToCheck, datesAgo) => {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const targetDate = new Date(today);

  targetDate.setDate(targetDate.getDate() - datesAgo);

  return (
    dateToCheck.getDate() === targetDate.getDate() &&
    dateToCheck.getMonth() === targetDate.getMonth() &&
    dateToCheck.getFullYear() === targetDate.getFullYear()
  );
};

// tinh doanh thu theo ngay
let handleGetRevenueByDay = ({ dateAgo }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const today = new Date();

      const targetDate = new Date(today);

      targetDate.setDate(targetDate.getDate() - dateAgo);

      let totalRevenue = await db.OrderDetail.sum("totalPrice", {
        where: {
          [Op.and]: [
            !!dateAgo &&
              db.sequelize.where(
                db.sequelize.fn("DAY", db.sequelize.col("updatedAt")),
                targetDate.getDate()
              ),
            db.sequelize.where(
              db.sequelize.fn("MONTH", db.sequelize.col("updatedAt")),
              targetDate.getMonth() + 1
            ),
            db.sequelize.where(
              db.sequelize.fn("YEAR", db.sequelize.col("updatedAt")),
              targetDate.getFullYear()
            ),
            { status: 1 },
            { returnItem: null },
          ],
        },
      });

      let totalProductReturn = await db.OrderDetail.sum("quantity", {
        where: {
          [Op.and]: [
            !!dateAgo &&
              db.sequelize.where(
                db.sequelize.fn("DAY", db.sequelize.col("updatedAt")),
                targetDate.getDate()
              ),
            db.sequelize.where(
              db.sequelize.fn("MONTH", db.sequelize.col("updatedAt")),
              targetDate.getMonth() + 1
            ),
            db.sequelize.where(
              db.sequelize.fn("YEAR", db.sequelize.col("updatedAt")),
              targetDate.getFullYear()
            ),
            { status: 1 },
            { returnItem: 1 },
          ],
        },
      });

      const totalProductSold = await db.OrderDetail.sum("quantity", {
        where: {
          [Op.and]: [
            //  !!year && db.sequelize.where(
            //      db.sequelize.fn("YEAR", db.sequelize.col("createdAt")),
            //     year
            //   ),
            !!dateAgo &&
              db.sequelize.where(
                db.sequelize.fn("DAY", db.sequelize.col("updatedAt")),
                targetDate.getDate()
              ),
            db.sequelize.where(
              db.sequelize.fn("MONTH", db.sequelize.col("updatedAt")),
              targetDate.getMonth() + 1
            ),
            db.sequelize.where(
              db.sequelize.fn("YEAR", db.sequelize.col("updatedAt")),
              targetDate.getFullYear()
            ),
            { returnItem: null },
            { status: 1 },
          ],
        },
      });

      let data = {
        totalRevenue: totalRevenue ? totalRevenue : 0,
        totalProductReturn: totalProductReturn ? totalProductReturn : 0,
        totalProductSold: totalProductSold ? totalProductSold : 0,
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

let handleGetMonthlyRevenue = ({}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const today = new Date();

      const currentMonth = today.getMonth() + 1;

      let totalRevenue = await db.OrderDetail.sum("totalPrice", {
        where: {
          [Op.and]: [
            db.sequelize.where(
              db.sequelize.fn("MONTH", db.sequelize.col("updatedAt")),
              currentMonth
            ),
            { status: 1 },
            { returnItem: null },
          ],
        },
      });

      resolve({
        EM: "Ok",
        EC: 0,
        DT: totalRevenue,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

let handleGetMonthlyReturn = ({}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const today = new Date();

      const currentMonth = today.getMonth() + 1;

      let totalProductReturn = await db.OrderDetail.sum("quantity", {
        where: {
          [Op.and]: [
            db.sequelize.where(
              db.sequelize.fn("MONTH", db.sequelize.col("updatedAt")),
              currentMonth
            ),
            { status: 1 },
            { returnItem: 1 },
          ],
        },
      });

      resolve({
        EM: "Ok",
        EC: 0,
        DT: totalProductReturn,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
let handleGetMonthlySold = ({}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const today = new Date();

      const currentMonth = today.getMonth() + 1;

      const totalProductSold = await db.OrderDetail.sum("quantity", {
        where: {
          [Op.and]: [
            db.sequelize.where(
              db.sequelize.fn("MONTH", db.sequelize.col("updatedAt")),
              currentMonth
            ),
            { returnItem: null },
            { status: 1 },
          ],
        },
      });

      resolve({
        EM: "Ok",
        EC: 0,
        DT: totalProductSold,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

let handleCustomerReviewProductFunc = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data || !data.productId || !data.starNumber) {
        return reject({
          EM: "missing value productId or starNumber",
          EC: 1,
          DT: "",
        });
      }

      // Lấy tất cả các đánh giá hiện có
      let ratings = await db.Comment.findAll({
        where: { productId: data.productId },
        attributes: ["starNumber"],
      });

      let totalStars = ratings.reduce((acc, rating) => acc + rating.starNumber, 0);
      let totalCount = ratings.length;

      totalStars += data.starNumber;
      totalCount += 1; 

      const averageRating = totalStars / totalCount;
      const roundedAverageRating = Math.round(averageRating);

      await db.Comment.create(data);

      await db.Product.update(
        {
          starsNumber: roundedAverageRating,
          totalRating: totalCount,
        },
        {
          where: { id: data.productId },
        }
      );

      await db.OrderDetail.update(
        {
          statusReview: 1,
        },
        {
          where: { id: data.orderDetailId },
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
  handleTotalProductSold,
  handleTotalRevenue,
  handleCustomerConfirmFunc,
  handleCustomerReturnOrderFunc,
  handleTotalOrderSold,
  handleTotalOrderReturn,
  handleGetRevenueByDay,
  handleGetMonthlyReturn,
  handleGetMonthlyRevenue,
  handleGetMonthlySold,
  handleCustomerReviewProductFunc,
};
