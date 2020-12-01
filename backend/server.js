import express from "express";
import data from "./data.js";

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Server is ready.");
});

app.get("/api/products", (req, res) => {
    res.send(data.products);
});

app.get("/api/product/:id", (req, res) => {
    const product = data.products.find(product => product._id === req.params.id);
    if (!product) {
        res.status(404).send({ message: "Product Not Found." });
    }
    res.send(product);
});

app.listen(port, () => {
    console.log("Server is running on port " + port);
});