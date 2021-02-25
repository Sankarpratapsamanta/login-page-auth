const express =require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors=require("cors");
const cookieParser=require('cookie-parser')
dotenv.config();
const app=express();

const userRoute=require("./router/userRouter");


app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:["http://localhost:3001"],
    credentials:true
}));




//Mongo Connect
mongoose.connect(process.env.MONGODB_CONNECTION ,{ useNewUrlParser: true , useUnifiedTopology: true}).then(()=>{
    console.log("Database Connected")
}).catch(err=>{
    console.log(err)
})


app.use(userRoute);



//set server

const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log('server started',{PORT})
})
