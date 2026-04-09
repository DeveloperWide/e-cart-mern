import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

connectDB();

// ROUTE
app.get("/", (req, res) => {
  res.send("API is working");
});

// PORT
const PORT = (process.env.PORT = 5000);
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
