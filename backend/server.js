import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./config/DB.js";
import { v2 as cloudinary } from "cloudinary";
import HandleError from "./MiddleWare/error.js";

dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT || 5000;

// Database connection
connectDB();

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to Uncaught Exception");
  process.exit(1);
});

app.get("/", (req, res) => {
  res.send("Server working ✅");
});

//console.log(name); //To check uncaughtException

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`); //Incase any errror to stop the server and msg it
  console.log("Shutting down the server due to Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
