import express from "express";
import cartController from "../controllers/cartController";

const router = express.Router();

router.put('/delete-multiple', cartController.deleteMultiple)
router.put('/delete-one', cartController.deleteOneProduct)
router.post('/change-quantity', cartController.changeQuantityProduct)
router.post('/add-product-to-cart', cartController.addProductToCart)
router.get('/get-all', cartController.getAllFunc)

module.exports = router;
