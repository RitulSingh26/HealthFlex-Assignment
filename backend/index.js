import express from 'express';
import mongoose from 'mongoose';
import router from './routes/userRoutes.js';
import tweetRouter from './routes/tweetRoutes.js';


const app =express();
app.use(express.json());

app.use("/api/users",router);
app.use("/api",tweetRouter);

const DB='mongodb://localhost:27017'
mongoose.connect(DB)
.then(app.listen(5000))
.then(()=>console.log("connected to server"))
.catch((err)=>console.log(err));

 