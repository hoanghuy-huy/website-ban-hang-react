import express from "express";
import productController from "../controllers/productController";

const router = express.Router();
router.get("/products/get-all-pagination", productController.getAllProductPagination);
router.get("/products/get-all", productController.getAllProduct);
router.get("/products/get-all-hot", productController.getAllProductHot);
router.get("/products/get-one/:productId",productController.getOneProduct)
router.get("/products/categories/:productId",productController.getCategoryWithProduct)
// router.get("/products?", productController.getAllProductPagination);
router.get("/products/get-one-category/:category", productController.getProductWithCategory)
module.exports = router;
