import express from "express";
import addressController from '../controllers/addressController'
const router = express.Router();

router.post("/create", addressController.createFunc);
router.post("/edit", addressController.editFunc);
router.get("/get-all", addressController.getAllFunc);

module.exports = router;
