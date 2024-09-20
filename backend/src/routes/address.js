import express from "express";
import addressController from '../controllers/addressController'
const router = express.Router();

router.get("/get-address-default", addressController.getAddressDefault);
router.post("/create", addressController.createFunc);
router.put("/delete", addressController.deleteFunc);
router.post("/edit", addressController.editFunc);
router.get("/get-all", addressController.getAllFunc);
module.exports = router;
