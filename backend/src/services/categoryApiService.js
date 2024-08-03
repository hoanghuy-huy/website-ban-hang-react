import db from "../models/index";

class categoryApiService {
  async handleGetAllCategory() {
    try {
      let category = await db.ParentCategory.findAll({
        attributes: ["id", "name", "description", "hot", "path"],
        include: [
          {
            model: db.ChildCategory,
            attributes: ["id", "name", "description", "hot", "path"],
          },
        ],
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

  async handleGetProductWithCategory(categoryPath) {
    try {

      let data
      const url_path = ''.concat("/", categoryPath)
      const childCategory = await db.ChildCategory.findOne({
        where: { path: url_path },
      });

      const parentCategory = await db.ParentCategory.findOne({
        where: { path: url_path },
      });

      if (parentCategory) {
        const category = await db.ParentCategory.findOne({
          where: { id: parentCategory ? parentCategory.id : null },
          include: [
            {
              model: db.ChildCategory,
              include: [{ model: db.Product }],
            },
          ],
        });

        if (category && category.ChildCategories) {
          data.Products = category.ChildCategories.reduce((arr, value) => {
            arr = arr.concat(value.Products);

            return arr;
          }, []);

          data.name = category.name;
          return {
            EM: "Get All products Success",
            EC: 0,
            DT: data,
          };
        }
      }

      if (childCategory) {
        data = await db.ChildCategory.findOne({
          where: { id: childCategory ? childCategory.id : null },

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
