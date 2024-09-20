import express from "express";
require("dotenv").config();

const router = express.Router();

router.get('/get-client-id', (req, res) => {
    let clientId = process.env.CLIENT_ID


    return res.status(200).json({
        message: 'ok',
        data : clientId
    })
})

module.exports = router;
