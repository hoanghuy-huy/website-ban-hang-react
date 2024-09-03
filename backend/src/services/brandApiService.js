import { Op } from "sequelize";
import db from "../models/index";

let handleGetAllFuncPagination = (categoryId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Brand.findAll({
        include: [
          {
            model: db.Product,
            where: { categoryId: categoryId },
          },
        ],
      });
      resolve({
        EC: 0,
        EM: "get all success",
        DT: data,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

module.exports = {
  handleGetAllFuncPagination,
};
