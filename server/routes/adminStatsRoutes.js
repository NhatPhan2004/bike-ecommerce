const express = require("express");
const router = express.Router();
const { getAdminStats } = require("../controllers/adminStatsController");

router.get("/", getAdminStats);

module.exports = router;
