const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDb = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const cartRoutes = require("./routes/cartRoutes");

dotenv.config();

const app = express();

connectDb();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/cart", cartRoutes);

app.get("/", (req, res) => {
  res.send("Grocery API Running");
});

const PORT = process.env.PORT || 5000;

app.use((err, req, res, next) => {
  console.error("ERROR:", err);

  res.status(500).json({
    success: false,
    message: err.message,
    stack: err.stack,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
