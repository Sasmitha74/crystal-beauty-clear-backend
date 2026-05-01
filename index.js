import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import jwt from "jsonwebtoken";
import productRouter from './routes/productRouter.js';
import dns from "node:dns";
dns.setServers(["1.1.1.1","8.8.8.8"]);
const app = express();

mongoose.connect("mongodb+srv://admin1:123@cluster0.jo4pql5.mongodb.net/?appName=Cluster0").then(
    ()=>{
        console.log("Connected to the database");
    }
).catch(
    ()=>{
        console.log("Connection failed");
    }
)




app.use(bodyParser.json());
app.use(
    (req,res,next)=>{
        const header = req.header("Authorization");
        if(header != null){
            const token = header.replace("Bearer ","")
            jwt.verify(token,"random456",(err , decoded)=>{
                console.log(decoded)
                if(decoded != null){
                    req.user = decoded
                }
            })
        }
        next()
    }
)



app.use("/api/user" , userRouter)
app.use("/api/product", productRouter)



app.listen(3000, 
    ()=>{
        console.log("Server is running on port 3000");
    }
)