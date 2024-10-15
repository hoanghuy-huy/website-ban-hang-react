import express from "express";
import orderController from "../controllers/orderController";

const router = express.Router();

router.get('/get-all-order', orderController.getAllOrderPagination)
router.post('/confirm-order', orderController.confirmOrderFunc)
router.post('/confirm-order-for-shipment', orderController.confirmOrderForShipmentFunc)


router.post('/create', orderController.createFunc)
router.get('/get-all-order-with-user-id', orderController.getAllOrderWithUserIdPagination)
router.get('/get-all-order-in-transit-with-user-id', orderController.getAllOrderInTransitWithUserIdPagination)
router.get('/get-all-status-order-with-user-id', orderController.getAllOrderStatusWithUserIdPagination)
router.get('/get-one-order/:orderId', orderController.getOneOrder)
router.put('/delete-order', orderController.deleteFunc)

module.exports = router;
