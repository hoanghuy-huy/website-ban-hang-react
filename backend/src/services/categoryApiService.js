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

  async handleGetProductHotPaginationWithCategory(categoryId, page, limit, sort, starNumber, price, brand) {
    try {
      let offset = (page - 1) * limit;
      let product
      let convertPriceToObject = price.split(',')
      let convertBrandToObject = brand.split(',')
      if(sort) {
        product = await db.Product.findAndCountAll({
          where: {
            [Op.and]: [
              { authentic: true },
              { categoryId: categoryId },
              !!starNumber && {starsNumber: {[Op.gt]: 4}},              
              +convertPriceToObject[1] !== 0 && {price: {[Op.between] :[convertPriceToObject[0],convertPriceToObject[1]]}},
              convertBrandToObject[0] !== '' && convertBrandToObject.length > 0 && {brandName: {[Op.or] : [...convertBrandToObject]} }
            ]
          },
          offset: offset,
          limit: limit,
          order:[["price", sort]],
        });
      }else {
        product = await db.Product.findAndCountAll({
          where: {
            [Op.and]: [
              { authentic: true },
              { categoryId: categoryId },
              !!starNumber && {starsNumber: {[Op.gt]: 4}},
              +convertPriceToObject[1] !== 0 && {price: {[Op.between] :[convertPriceToObject[0],convertPriceToObject[1]]}},
              convertBrandToObject[0] !== '' && convertBrandToObject.length > 0 && {brandName: {[Op.or] : [...convertBrandToObject]} }
            ]
          },
          offset: offset,
          limit: limit,
        });
      }
      
      const { count, rows } = product

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

  async handleGetProductBestSellerPaginationWithCategory(categoryId, page, limit, sort, starNumber, price, brand) {
    try {
      let offset = (page - 1) * limit;
      let product
      let convertPriceToObject = price.split(',')
      let convertBrandToObject = brand.split(',')
      if(sort) {
        product = await db.Product.findAndCountAll({
          where: {
            [Op.and]: [
              { quantitySold: { [Op.gt]: 100 } },
              { categoryId: categoryId },
              !!starNumber && {starsNumber: {[Op.gt]: 4}},              
              +convertPriceToObject[1] !== 0 && {price: {[Op.between] :[convertPriceToObject[0],convertPriceToObject[1]]}},
              convertBrandToObject[0] !== '' && convertBrandToObject.length > 0 && {brandName: {[Op.or] : [...convertBrandToObject]} }
            ]
          },
          offset: offset,
          limit: limit,
          order:[["price", sort]],
        });
      }else {
        product = await db.Product.findAndCountAll({
          where: {
            [Op.and]: [
              { quantitySold: { [Op.gt]: 100 } },
              { categoryId: categoryId },
              !!starNumber && {starsNumber: {[Op.gt]: 4}},              
              +convertPriceToObject[1] !== 0 && {price: {[Op.between] :[convertPriceToObject[0],convertPriceToObject[1]]}},
              convertBrandToObject[0] !== '' && convertBrandToObject.length > 0 && {brandName: {[Op.or] : [...convertBrandToObject]} }
            ]
          },
          offset: offset,
          limit: limit,
        });
      }
      
      const { count, rows } = product

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
}

module.exports = new categoryApiService();
