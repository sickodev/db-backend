const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion } = require("mongodb");

const Model = require("./model/model");

const app = express();
dotenv.config();

app.use(express.json());

const uri = process.env.DATABASE_URL;

mongoose.connect(uri);
const db = mongoose.connection;

db.on("error", (error) => {
    console.log(error);
});

db.once("connected", () => {
    console.log("Connected to DB");
});

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/", async (req, res) => {
    const data = new Model({
        name: req.body.name,
        email: req.body.email,
        uid: req.body.uid,
    });
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
