import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
import  userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoute.js';
import cors from 'cors';


mongoose
.connect('mongodb+srv://raghav:raghav@cluster0.cdhhrci.mongodb.net/assignment?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>
 {
 console.log("Connected to Mongo");
})
.catch((err)=>{
console.log(err);
});

const app =express();
app.use(cors());
app.use(express.json());
app.listen(3000, ()=>{
console.log('Server listening on port 3000!');
});

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);

app.use((err,req,res,next)=>{
const statusCode =err.statusCode || 500;
const message=err.message || 'Internal server error';
return res.status(statusCode).json({
success:false,
message,
statusCode,
});
});