const express = require("express");

const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
connectDB();


app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);


const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});