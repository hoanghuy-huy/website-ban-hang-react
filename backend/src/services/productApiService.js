import db from "../models/index";

class productApiService {
  async handleGetAllProductPagination(page, limit) {
    try {
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
        limit: 15,
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

  async handleGetProductWithCategory(categoryId) {
    try {
      let data = {};

      console.log(categoryId);

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

  async handleGetProductWithCategoryId(categoryId, page, limit) {
    try {
      let offset = (page - 1) * limit;

      const { count, rows } = await db.Product.findAndCountAll({
        where: { categoryId: categoryId },
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

      if (totalPages === 0) {
        return {
          EM: "Not found id of category or product empty",
          EC: 1,
          DT: "",
        };
      }
      return {
        EM: "ok!, get product with category id success",
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

  async handleGetOneProduct(_productId) {
    try {
      let data;

      let product = await db.Product.findOne({
        where: { id: _productId },
        include: [{ model: db.ProductImage }],
      });

      let product1 = await db.Product.findOne({
        where: { id: _productId },
        include: [{ model: db.DetailProduct }],
      });

      let { DetailProduct } = product1;
      data = {
        product,
        DetailProduct,
      };
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
      let product = await db.Product.findOne({
        where: { id: productId },
      });

      if (product) {
        const cat = await db.Product.findAll({
          where: { categoryId: product.categoryId },
          limit: 8,
        });

        return {
          EM: "ok",
          EC: 0,
          DT: cat,
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
