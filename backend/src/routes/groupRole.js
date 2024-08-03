import express from "express";
import groupRoleController from "../controllers/groupRoleController";

const router = express.Router();

router.post("/group-role/create", groupRoleController.createFunc);

module.exports = router;
