import { Op } from "sequelize";
import db from "../models/index";

let handleGetAllFunc = ({ limit, page }) => {
  return new Promise(async (resolve, reject) => {
    try {
      limit = +limit;
      page = +page;
      let offset = (page - 1) * limit;

      const { count, rows } = await db.Voucher.findAndCountAll({
        offset: offset,
        limit: limit,
        order: [["id", "DESC"]],
      });
      let totalPages = Math.ceil(count / limit);

      const data = {
        totalPages: totalPages,
        totalRows: count,
        vouchers: rows,
      };


      resolve({
        EC: 1,
        EM: "ok",
        DT: data,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

module.exports = {
  handleGetAllFunc,
};
