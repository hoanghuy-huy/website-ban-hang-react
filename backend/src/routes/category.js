import express from "express";
import categoryController from '../controllers/categoryController'

const router = express.Router();

router.get("/categories/get-one/:category", categoryController.getProductWithCategory)
router.get('/categories',categoryController.getAllCategory)

module.exports = router;
