import express from "express";
import brandController from "../controllers/brandController";

const router = express.Router();

router.get('/get-all', brandController.getAllFuncPagination)
router.get('/get-all-brand', brandController.getAllFunc)

module.exports = router;
