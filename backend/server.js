const express = require("express");

const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
require("dotenv").config();
connectDB();


app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", require("./routes/userRoutes"));

const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);

const addressRoutes = require("./routes/addressRoutes");
app.use("/api/addresses", addressRoutes);

app.use("/api/cart", require("./routes/cartRoutes"));

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});