import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from "./routers/uploadRouter.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// eslint-disable-next-line no-undef
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/amazona", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.get("/", (req, res) => {
  res.send("Server is ready.");
});
app.get("/api/config/paypal", (req, res) => {
  // eslint-disable-next-line no-undef
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

const __dirname = path.resolve();
app.use('/productimages', express.static(path.join(__dirname, '/uploads/products')));

app.use("/api/uploads", uploadRouter);
app.use("/api/orders", orderRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
  next();
});

// eslint-disable-next-line no-undef
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
