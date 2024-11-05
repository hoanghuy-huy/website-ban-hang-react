import express from "express";
import categoryController from '../controllers/categoryController'

const router = express.Router();
router.post("/categories/edit", categoryController.editFunc)

router.put("/categories/delete", categoryController.deleteFunc)

router.post("/categories/create", categoryController.createFunc)

router.get("/categories/get-all-category-hot", categoryController.getAllCategoryHot)
router.get("/categories/get-all-product-best-seller-pagination", categoryController.getAllProductBestSellerPaginationWithCategory)
router.get("/categories/get-all-product-hot-pagination", categoryController.getAllProductHotPaginationWithCategory)
router.get("/categories/get-one/:category", categoryController.getProductWithCategory)
router.get('/categories',categoryController.getAllCategory)

module.exports = router;
