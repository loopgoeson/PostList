import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
import  userRoutes from './routes/userRoutes.js';

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
app.listen(3000, ()=>{
console.log('Server listening on port 3000!');
});

app.use('/api/user',userRoutes);