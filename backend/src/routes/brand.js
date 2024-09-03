import express from "express";
import brandController from "../controllers/brandController";

const router = express.Router();

router.get('/get-all', brandController.getAllFuncPagination)

module.exports = router;
