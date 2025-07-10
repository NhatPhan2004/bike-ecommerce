const express = require("express");
const cors = require("cors");
const path = require("path");

const postRoutes = require("./routes/postRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("❌ Not allowed by CORS: " + origin));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.use(
  "/uploads/images",
  express.static(path.join(__dirname, "uploads/images"))
);

app.use("/api/posts", postRoutes);
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
