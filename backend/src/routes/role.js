import express from "express";
import roleController from "../controllers/roleController";

const router = express.Router();


router.get('/roles/by-group?', roleController.getRoleByGroup)
router.get('/roles/read', roleController.getAllFunc)
router.post('/roles/create', roleController.createFunc)
router.put('/roles/delete', roleController.deleteFunc)

module.exports = router;
