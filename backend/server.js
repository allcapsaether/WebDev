import dotenv from "dotenv";
dotenv.config();

import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import path from "path";

import productRoutes from "./routes/productRoutes.js";
import { sql } from "./config/db.js";
import { aj } from "./lib/arcjet.js"

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(express.json());
app.use(cors());    
app.use(helmet({
    contentSecurityPolicy: false,
}));  
app.use(morgan("dev"));

app.use(async (req,res,next) => {
    try{
        const decision = await aj.protect(req, {
            requested: 1
        })
    
        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                res.status(429).json({success: false, message: "Too many requests. Please try again later."});
            }
            else if(decision.reason.isBot()){
                res.status(403).json({success: false, message: "Access denied. Bot detected."});
            }
            else {
                res.status(403).json({success: false, message: "Forbidden."});
            }
            return
        }

        next()

    }   catch (error) {
        console.log("arcjet error", error);
        next(error);
    }
    
});

app.use("/api/products", productRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("/{*placeholder}", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

async function initDB() {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                image VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;

        console.log("Database initialized successfully.");
    } catch (error){
        console.log("Error connecting to the database:", error);
    }


};

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});