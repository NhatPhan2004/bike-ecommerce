const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const productController = require("../controllers/productController");

const uploadPath = path.join(__dirname, "../uploads/images");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

// Routes
router.get("/brands", productController.getAllBrands);
router.get("/loaixes", productController.getAllLoaixes);

router.get("/admin", productController.getProductsForAdmin);

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", upload.single("hinhanh"), productController.addProduct);
router.put("/:id", upload.single("hinhanh"), productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
