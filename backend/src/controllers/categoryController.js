import categoryApiService from "../services/categoryApiService";
class categoryController {
  async getAllCategory(req, res) {
    try {
      let data = await categoryApiService.handleGetAllCategory();

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
      let data = await categoryApiService.handleGetProductWithCategory(
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

  async getAllProductHotPaginationWithCategory(req, res) {
    try {
      let { page, limit, categoryId, sort, starNumber, price, brand } = req.query;

      let data = await categoryApiService.handleGetProductHotPaginationWithCategory(
        categoryId, +page, +limit,sort, +starNumber, price, brand
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

  async getAllProductBestSellerPaginationWithCategory(req, res) {
    try {
      let { page, limit, categoryId, sort, starNumber, price, brand } = req.query;

      let data = await categoryApiService.handleGetProductBestSellerPaginationWithCategory(
        categoryId, +page, +limit,sort, +starNumber, price, brand
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

module.exports = new categoryController();
