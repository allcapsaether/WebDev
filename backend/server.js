import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import productRoutes from "./routes/productRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
    res.send("Root page!");
});

app.get("/test", (req, res) => {
    res.send("Test page!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});