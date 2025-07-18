const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authenticate = require("../middlewares/authMiddleware");

router.get("/", authenticate, cartController.getCart);
router.post("/", authenticate, cartController.addToCart);
router.put("/:bikeId", authenticate, cartController.updateCartItem);
router.delete("/:bikeId", authenticate, cartController.removeCartItem);

module.exports = router;
