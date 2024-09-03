import express from "express";
import productController from "../controllers/productController";

const router = express.Router();

router.get("/products/get-all-pagination", productController.getAllProductPagination);
router.get("/products/get-all-hot-pagination", productController.getAllProductHotPagination);
router.get("/products/get-all-authentic-pagination", productController.getAllProductAuthenticPagination);
router.get("/products/get-all-discount-pagination", productController.getAllProductDiscountPagination);
router.get("/products/get-all", productController.getAllProduct);
router.get("/products/get-all-hot", productController.getAllProductHot);
router.get("/products/get-one/:productId",productController.getOneProduct)
router.get("/products/categories/:productId",productController.getCategoryWithProduct)
// router.get("/products?", productController.getAllProductPagination);
router.get("/products/get-one-category/:category", productController.getProductWithCategory)
router.get("/products/get-product-with-category-id/:categoryId", productController.getProductWithCategoryId)
module.exports = router;
