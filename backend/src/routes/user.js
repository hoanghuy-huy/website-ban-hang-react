import express from "express";
import userController from "../controllers/userController";
import { checkUserLogin, checkUserPermission } from "../middleware/jwtUser";

const router = express.Router();

// router.all("*", checkUserLogin, checkUserPermission);
router.get("/account", userController.getAccount);
router.put("/users/update", userController.updateUser);
router.get("/users/:id", userController.getOneUser);
router.post("/users/create", userController.createFunc);
router.put("/users/delete", userController.deleteUser);
router.get("/users?", userController.getAllUser);

module.exports = router;
