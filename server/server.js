require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

const postRoutes = require("./routes/postRoutes");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const contactRoutes = require("./routes/contactRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const adminStatsRoutes = require("./routes/adminStatsRoutes");
const adminRoutes = require("./routes/adminRoutes");
const orderRoutes = require("./routes/adminOrderRoutes");
const PORT = process.env.PORT || 5000;
const adminCustomerRoutes = require("./routes/adminCustomerRoutes");

const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  "/uploads/images",
  express.static(path.join(__dirname, "uploads/images"))
);

app.use("/api/posts", postRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api", contactRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/auth/admin", adminAuthRoutes);
app.use("/api/admin/stats", adminStatsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/orders", orderRoutes);
app.use("/api/admin/customers", adminCustomerRoutes);
app.use(
  "/uploads/images",
  express.static(path.join(__dirname, "uploads/images"))
);

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
