import express from "express";
import orderController from "../controllers/orderController";

const router = express.Router();

router.post('/create', orderController.createFunc)
router.get('/get-all-order-with-user-id', orderController.getAllOrderWithUserIdPagination)
router.get('/get-one-order/:orderId', orderController.getOneOrder)
router.put('/delete-order', orderController.deleteFunc)

module.exports = router;
