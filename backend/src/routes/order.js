import express from "express";
import orderController from "../controllers/orderController";

const router = express.Router();


router.post('/confirm-order-return-admin', orderController.confirmOrderReturnAdmin)
router.get('/get-list-order-return-to-confirm-admin', orderController.getListOrderToReturnAdmin)

router.get('/get-list-order-to-return', orderController.getListOrderToReturn)
router.get('/get-list-order-to-review', orderController.getListOrderToReview)


router.get('/get-monthly-return', orderController.getMonthlyReturn)
router.get('/get-monthly-sold', orderController.getMonthlySold)
router.get('/get-monthly-revenue', orderController.getMonthlyRevenue)

router.post('/customer-review-product', orderController.customerReviewProductFunc)
router.post('/customer-return-order', orderController.customerReturnOrderFunc)
router.post('/customer-confirm-order', orderController.customerConfirmOrderFunc)
router.get('/get-revenue-by-day', orderController.getAllRevenuePagination)

router.get('/total-order-return', orderController.totalOrderReturn)
router.get('/total-order-sold', orderController.totalOrderSold)
router.get('/total-revenue', orderController.totalRevenue)
router.get('/total-products-sold', orderController.totalProductSold)-
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
