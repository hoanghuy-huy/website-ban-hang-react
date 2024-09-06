import express from "express";
import categoryController from '../controllers/categoryController'

const router = express.Router();
router.get("/categories/get-all-product-best-seller-pagination", categoryController.getAllProductBestSellerPaginationWithCategory)
router.get("/categories/get-all-product-hot-pagination", categoryController.getAllProductHotPaginationWithCategory)
router.get("/categories/get-one/:category", categoryController.getProductWithCategory)
router.get('/categories',categoryController.getAllCategory)

module.exports = router;
