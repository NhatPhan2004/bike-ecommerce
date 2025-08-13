// routes/adminAuthRoutes.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware");

router.post("/login", adminController.adminLogin);
router.post("/register", adminController.adminRegister);
router.post("/forgot-password", adminController.forgotPassword);
router.post(
  "/change-password",
  adminAuthMiddleware,
  adminController.adminChangePassword
);

router.get("/profile", adminAuthMiddleware, adminController.getAdminProfile);

module.exports = router;
