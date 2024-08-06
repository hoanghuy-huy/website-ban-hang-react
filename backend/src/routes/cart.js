import express from "express";
import cartController from "../controllers/cartController";

const router = express.Router();

router.post('/change-quantity', cartController.changeQuantityProduct)
router.post('/add-product-to-cart', cartController.addProductToCart)
router.get('/get-all', cartController.getAllFunc)

module.exports = router;
