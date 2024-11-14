import express from "express";
import commentController from '../controllers/commentController'
const router = express.Router();

router.get('/average-rating', commentController.getAverageRating)
router.get('/get-all', commentController.getAllFunc)
router.get('/create', commentController.createFunc)

module.exports = router;
