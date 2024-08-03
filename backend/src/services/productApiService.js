import db from "../models/index";

class productApiService {
  async handleGetAllProductPagination(page, limit) {
    try {

      console.log(page, limit)
      let offset = (page - 1) * limit;

      const { count, rows } = await db.Product.findAndCountAll({
        offset: offset,
        limit: limit,
        order: [["id", "DESC"]],
      });

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

  async handleGetAllProduct() {
    try {
      let data = await db.Product.findAll();
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

  async handleGetAllProductHot() {
    try {
      let data = await db.Product.findAll({
        where: { hot: true },
      });
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

  async handleGetProductWithCategory(categoryPath) {
    try {
      // const path = "/" + categoryPath;
      let data = {};
      const childCategory = await db.ChildCategory.findOne({
        where: { path: categoryPath },
      });

      const parentCategory = await db.ParentCategory.findOne({
        where: { path: categoryPath },
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

  async handleGetOneProduct(_productId) {
    try {
      let data;

      let product = await db.Product.findOne({
        where: { id: _productId },
        include: [{ model: db.ProductImage }],
      });

      let product1 = await db.Product.findOne({
        where: { id: _productId },
        include: [{model: db.DetailProduct, include: [{model: db.ValueDetailProduct}]}]
      });
      let {DetailProduct} = product1
      data = {
          product, DetailProduct
      }
      if (data) {
        return {
          EM: "ok",
          EC: 0,
          DT: data,
        };
      }
      return {
        EM: "Product not found",
        EC: 1,
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

  async handleGetCategoryWithProduct(productId) {
    try {
      console.log(productId);
      let product = await db.Product.findOne({
        where: { id: productId },
      });

      let data = await db.ChildCategory.findOne({
        where: { id: product.childCategoryId },
        include: [{ model: db.Product }],
      });
      if (data) {
        return {
          EM: "ok",
          EC: 0,
          DT: data,
        };
      }
      return {
        EM: "Product not found",
        EC: 1,
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

module.exports = new productApiService();
