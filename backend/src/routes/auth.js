import express from "express";
import authController from "../controllers/authController";


const router = express.Router();

router.post('/logout',authController.logout)
router.post('/login',authController.login)
router.post('/register',authController.register)

module.exports = router;
