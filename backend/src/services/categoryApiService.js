import { Op } from "sequelize";
import db from "../models/index";

class categoryApiService {
  async handleGetAllCategory() {
    try {
      let category = await db.Category.findAll();
      if (category) {
        return {
          EM: "Get All Category Successfully",
          EC: 0,
          DT: category,
        };
      }
      return {
        EM: "Not Found Category",
        EC: 1,
        DT: "",
      };
    } catch (error) {
      console.log(error);
      return {
        EM: " Something wrong in service",
        EC: 2,
      };
    }
  }

  async handleGetProductWithCategory(categoryPath) {
    try {
      let data;
      const category = await db.Category.findOne({
        where: { path: "/" + categoryPath },
      });

      if (category) {
        // data = await db.Category.findOne({
        //   include: [{ model: db.Product }],
        // });

        return {
          EM: "Get All products Success",
          EC: 0,
          DT: category,
        };
      }

      return {
        EM: "Category not found",
        EC: 1,
        DT: "",
      };
    } catch (error) {
      console.log(error);
      return {
        EM: " Something wrong in service",
        EC: 2,
      };
    }
  }

  async handleGetProductHotPaginationWithCategory(
    categoryId,
    page,
    limit,
    sort,
    starNumber,
    price,
    brand
  ) {
    try {
      let offset = (page - 1) * limit;
      let product;
      let convertPriceToObject = price.split(",");
      let convertBrandToObject = brand.split(",");
      if (sort) {
        product = await db.Product.findAndCountAll({
          where: {
            [Op.and]: [
              { authentic: true },
              { categoryId: categoryId },
              !!starNumber && { starsNumber: { [Op.gt]: 3.9 } },
              +convertPriceToObject[1] !== 0 && {
                price: {
                  [Op.between]: [
                    convertPriceToObject[0],
                    convertPriceToObject[1],
                  ],
                },
              },
              convertBrandToObject[0] !== "" &&
                convertBrandToObject.length > 0 && {
                  brandName: { [Op.or]: [...convertBrandToObject] },
                },
            ],
          },
          offset: offset,
          limit: limit,
          order: [["price", sort]],
        });
      } else {
        product = await db.Product.findAndCountAll({
          where: {
            [Op.and]: [
              { authentic: true },
              { categoryId: categoryId },
              !!starNumber && { starsNumber: { [Op.gt]: 3.9 } },
              +convertPriceToObject[1] !== 0 && {
                price: {
                  [Op.between]: [
                    convertPriceToObject[0],
                    convertPriceToObject[1],
                  ],
                },
              },
              convertBrandToObject[0] !== "" &&
                convertBrandToObject.length > 0 && {
                  brandName: { [Op.or]: [...convertBrandToObject] },
                },
            ],
          },
          offset: offset,
          limit: limit,
        });
      }

      const { count, rows } = product;

      let totalPages = Math.ceil(count / limit);

      const data = {
        totalPages: totalPages,
        totalRows: count,
        products: rows,
      };

      return {
        EM: "Get All products Success",
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
  }

  async handleGetProductBestSellerPaginationWithCategory(
    categoryId,
    page,
    limit,
    sort,
    starNumber,
    price,
    brand
  ) {
    try {
      let offset = (page - 1) * limit;
      let product;
      let convertPriceToObject = price.split(",");
      let convertBrandToObject = brand.split(",");
      if (sort) {
        product = await db.Product.findAndCountAll({
          where: {
            [Op.and]: [
              { quantitySold: { [Op.gt]: 50 } },
              { categoryId: categoryId },
              !!starNumber && { starsNumber: { [Op.gt]: 3.9 } },
              +convertPriceToObject[1] !== 0 && {
                price: {
                  [Op.between]: [
                    convertPriceToObject[0],
                    convertPriceToObject[1],
                  ],
                },
              },
              convertBrandToObject[0] !== "" &&
                convertBrandToObject.length > 0 && {
                  brandName: { [Op.or]: [...convertBrandToObject] },
                },
            ],
          },
          offset: offset,
          limit: limit,
          order: [["price", sort]],
        });
      } else {
        product = await db.Product.findAndCountAll({
          where: {
            [Op.and]: [
              { quantitySold: { [Op.gt]: 100 } },
              { categoryId: categoryId },
              !!starNumber && { starsNumber: { [Op.gt]: 3.9 } },
              +convertPriceToObject[1] !== 0 && {
                price: {
                  [Op.between]: [
                    convertPriceToObject[0],
                    convertPriceToObject[1],
                  ],
                },
              },
              convertBrandToObject[0] !== "" &&
                convertBrandToObject.length > 0 && {
                  brandName: { [Op.or]: [...convertBrandToObject] },
                },
            ],
          },
          offset: offset,
          limit: limit,
        });
      }

      const { count, rows } = product;

      let totalPages = Math.ceil(count / limit);

      const data = {
        totalPages: totalPages,
        totalRows: count,
        products: rows,
      };

      return {
        EM: "Get All products Success",
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
  }

  async handleGetAllCategoryHot() {
    try {
      let category = await db.Category.findAll({
        where: { hot: 1 },
      });
      if (category) {
        return {
          EM: "Get All Category Successfully",
          EC: 0,
          DT: category,
        };
      }
      return {
        EM: "Not Found Category",
        EC: 1,
        DT: "",
      };
    } catch (error) {
      console.log(error);
      return {
        EM: " Something wrong in service",
        EC: 2,
      };
    }
  }

  async handleCreateFunc(rawData) {
    try {
      let data = await db.Category.create(rawData);
      if (!data) {
        return {
          EM: "create error",
          EC: 1,
          DT: "",
        };
      }
      return {
        EM: "create success",
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
  }

  async handleDeleteFunc({ categoryId }) {
    try {
      let category = await db.Category.findOne({ where: { id: categoryId } });

      if (!category) {
        return {
          EM: "id category not found",
          EC: 1,
          DT: "",
        };
      }

      await category.destroy();

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
  }

  async handleEditFunc(rawData) {
    return new Promise(async (resolve, reject) => {
      try {
        let cat = await db.Category.findOne({ where: rawData.id });
        let data = await cat.update(rawData);

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
  }
}

module.exports = new categoryApiService();
