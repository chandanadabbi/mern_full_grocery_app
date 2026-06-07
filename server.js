const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDb = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");

dotenv.config();

const app = express();

connectDb();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Grocery API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});