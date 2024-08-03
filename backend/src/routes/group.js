import express from "express";
import groupController from '../controllers/groupController'

const router = express.Router();

router.get('/groups',groupController.getAllGroup)

module.exports = router;
