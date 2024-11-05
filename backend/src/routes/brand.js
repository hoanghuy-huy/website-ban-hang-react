import express from "express";
import brandController from "../controllers/brandController";

const router = express.Router();
router.put("/delete", brandController.deleteFunc);
router.post("/edit", brandController.editFunc);

router.post("/create", brandController.createFunc);
router.get("/get-all", brandController.getAllFuncPagination);
router.get("/get-all-brand", brandController.getAllFunc);
router.get("/get-all-brand-pagination", brandController.getAllBrandPagination);

module.exports = router;
