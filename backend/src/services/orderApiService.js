import { Op, where } from "sequelize";
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

module.exports = {
  createNewOrder,
};
