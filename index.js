import express from "express"
import mongoDbConnection from "./src/config/mongodbconnection.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import authRouter from "./src/routes/auth/auth_routes.js";
import AdminProductRouter from "./src/routes/admin/product_routes.js";
import dotenv from "dotenv"
dotenv.config();
const app = express();
const PORT  = process.env.PORT || 5000;
mongoDbConnection();

app.use(
    cors({
        origin:"http://localhost:5173",
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
app.get('/health',(req,res)=>{
    res.json({status:"ok"})
})
app.use('/api/auth',authRouter);
app.use('/api/admin/products',AdminProductRouter);
app.listen(PORT,()=>console.log(`Server is running on http://localhost:${PORT}`));


