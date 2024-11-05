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

let handleGetAllFunc = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Brand.findAll();

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

let handleCreateFunc = (rawData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Brand.create(rawData);

      if (!data) {
        reject({
          EC: 1,
          EM: "create error",
          DT: "",
        });
      }

      resolve({
        EC: 0,
        EM: "create success",
        DT: "",
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

let handleGetAllBrandPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;

    const { count, rows } = await db.Brand.findAndCountAll({
      offset: offset,
      limit: limit,
      order: [["id", "DESC"]],
    });

    let totalPages = Math.ceil(count / limit);

    const data = {
      totalPages: totalPages,
      totalRows: count,
      brands: rows,
    };

    return {
      EM: "Get All brand Success",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: " Something wrong in service",
      EC: 2,
    };
  }
};

let handleDeleteFunc = async ({ brandId }) => {
  try {
    let brand = await db.Brand.findOne({ where: { id: brandId } });

    if (!brand) {
      return {
        EM: "id brand not found",
        EC: 1,
        DT: "",
      };
    }

    await brand.destroy();

    return {
      EM: "delete success",
      EC: 0,
      DT: "",
    };
  } catch (error) {
    console.log(error);
    return {
      EM: " Something wrong in service",
      EC: 2,
    };
  }
};

let handleEditFunc = (rawData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let brand = await db.Brand.findOne({ where: rawData.id });
      let data = await brand.update(rawData);

      if (!data) {
        reject({
          EC: 1,
          EM: "update error",
          DT: "",
        });
      }

      resolve({
        EC: 0,
        EM: "update success",
        DT: "",
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
module.exports = {
  handleGetAllFuncPagination,
  handleGetAllFunc,
  handleCreateFunc,
  handleGetAllBrandPagination,
  handleDeleteFunc,
  handleEditFunc,
};
