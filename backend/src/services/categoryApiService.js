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
        where: { path: '/' + categoryPath },
      });

      if (category) {
        data = await db.Category.findOne({
          include: [{ model: db.Product }],
        });

        return {
          EM: "Get All products Success",
          EC: 0,
          DT: data,
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
}

module.exports = new categoryApiService();
