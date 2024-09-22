import express from "express";
import orderController from "../controllers/orderController";

const router = express.Router();

router.post('/create', orderController.createFunc)

module.exports = router;
