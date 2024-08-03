import db from "../models/index";
import productApiService from "../services/productApiService";

class productController {
  async getAllProductPagination(req, res) {
    try {
      let { page, limit } = req.query;

      let data = await productApiService.handleGetAllProductPagination(
        +page,
        +limit
      );

      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        EM: "Error form server",
        EC: -1,
        DT: "",
      });
    }
  }

  async getAllProduct(req, res) {
    try {
      let data = await productApiService.handleGetAllProduct();

      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        EM: "Error form server",
        EC: -1,
        DT: "",
      });
    }
  }
  async getAllProductHot(req, res) {
    try {
      let data = await productApiService.handleGetAllProductHot();

      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        EM: "Error form server",
        EC: -1,
        DT: "",
      });
    }
  }
  
  async getProductWithCategory(req, res) {
    try {
      let categoryPath = req.params.category;
      let data = await productApiService.handleGetProductWithCategory(
        categoryPath
      );

      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        EM: "Error form server",
        EC: -1,
        DT: "",
      });
    }
  }

  async getOneProduct(req, res) {
    try {
      let productId = req.params.productId;
      let data = await productApiService.handleGetOneProduct(productId);

      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        EM: "Error form server",
        EC: -1,
        DT: "",
      });
    }
  }

  async getCategoryWithProduct(req, res) {
    try {
      let productId = req.params.productId;
      let data = await productApiService.handleGetCategoryWithProduct(
        productId
      );

      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        EM: "Error form server",
        EC: -1,
        DT: "",
      });
    }
  }
}

module.exports = new productController();
