import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
