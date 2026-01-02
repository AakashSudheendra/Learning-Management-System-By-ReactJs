import express from 'express';
import dotenv from 'dotenv';
import connectDB from './DataBase/db.js';
import userRoute from './routes/user.route.js';
import cookieParser from 'cookie-parser';
import cors from "cors"
import courceRoute from './routes/cource.route.js'
import mediaRoute from './routes/media.route.js';

dotenv.config({});
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

//default middleware

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


//api handlers
app.use("/api/v1/media",mediaRoute)
app.use("/api/v1/user",userRoute)
app.use("/api/v1/cource",courceRoute)


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})