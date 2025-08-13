const express = require("express");
const router = express.Router();
const adminStatsController = require("../controllers/adminStatsController");

router.get("/", adminStatsController.getAdminStats);

module.exports = router;
