import express from "express";
import voucherController from "../controllers/voucherController";

const router = express.Router();

router.get("/get-all", voucherController.getAllFunc);

module.exports = router;
