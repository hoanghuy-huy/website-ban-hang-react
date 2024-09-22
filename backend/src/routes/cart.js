import express from "express";
import cartController from "../controllers/cartController";

const router = express.Router();


router.post('/selected',cartController.selectedProduct)
router.put('/delete-multiple', cartController.removeMultipleProductFromCart)
router.put('/delete-multiple-with-id', cartController.removeMultipleProductFromCartWithId)
router.put('/delete-one', cartController.removeOneProductFromCart)
router.post('/change-quantity', cartController.changeQuantityProduct)
router.post('/add-product-to-cart', cartController.addProductToCart)
router.get('/get-all', cartController.getAllFunc)

module.exports = router;
