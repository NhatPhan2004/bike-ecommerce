// server/routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.post("/create_payment_url", paymentController.createPaymentUrl);
router.get("/vnpay_return", paymentController.vnpayReturn);
router.get("/invoice/:orderId", paymentController.getInvoice);
router.get("/invoice/pdf/:orderId", paymentController.getInvoicePdf);

module.exports = router;
