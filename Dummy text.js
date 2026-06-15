import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Working 🔥");
});

app.listen(3000, "127.0.0.1", () => {
  console.log("Server running on 3000");
});



