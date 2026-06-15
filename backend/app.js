// const express = require("express");
// const app = express();
// module.exports=app;

// We change the type to module in package.json

import express from "express";
import HandleError from "./MiddleWare/error.js";
import product from "./routes/productRoutes.js";
import user from "./routes/userRoutes.js";
import order from "./routes/orderRoutes.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

const app = express();

console.log("APP FILE LOADED ✅");

app.use((req, res, next) => {
  console.log("REQUEST HIT:", req.method, req.url);
  next();
});

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

app.get("/test", (req, res) => res.json({ ok: true }));

//Route
app.use("/api/v1", product); //=>mongo db la irukura collection name product ah use panni irukkom
app.use("/api/v1", user); //=>mongo db la irukura collection name user ah use panni irukkom
app.use("/api/v1", order); //=>mongo db la irukura collection name order ah use panni irukkom

// ❗ Error middleware MUST be LAST
app.use(HandleError);
export default app;
