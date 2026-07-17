import express from "express"
import dotenv from "dotenv"
import mongoDbConnection from "./config/mongodbconnection.js";
import cookieParser from "cookie-parser";
import cors from "cors"


const app = express();
dotenv.config();
const PORT  = process.env.PORT || 5000;
mongoDbConnection();

app.use(
    cors({
        origin:"http://localhost:5173/",
        methods: ['GET','POST','DELETE','PUT'],
        allowedHeaders:[
            "Content-Type",
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma'
        ],
        credentials:true
    })
);
app.use(cookieParser());
app.use(express.json());
app.listen(PORT,()=>console.log(`Server is running on http://localhost:${PORT}`));


