const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');
const Razorpay = require("razorpay");
require("dotenv").config();
const path = require("path");
const crypto = require("crypto");

const app = express();

// CORS configuration

app.use(
  cors({
    origin: 'https://dev.flaviahut.com',
    credentials: true, // Allow credentials (cookies, etc.)
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"], // Allowed methods as an array
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"], // Allowed headers as an array
  })
);


// Allow preflight (OPTIONS) requests for CORS
app.options('*', cors());

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));

app.use("/api", router);


//use the client app
// app.use(express.static(path.join(__dirname,'/client/build')))

//render client for any path


const PORT = process.env.PORT || 8080;
// app.get('*',(req,res)=>res.sendFile(path.join(__dirname,'/client/build/index.html')))

//razorpay 
app.post("/order",async (req,res)=>{
   const razorpay = new Razorpay({
     key_id: process.env.RAZORPAY_KEY_ID,
     key_secret: process.env.RAZORPAY_SECRET,
   });

   const options =req.body;
   const order =await razorpay.orders.create(options);

   if(!order){
       return res.status(500).send("error")
   }
   res.json(order);
})

app.get("/hello",(req,res)=>{
res.send("hello")
})

app.post("/order/validate",async (req,res)=>{
  const {razorpay_order_id, razorpay_payment_id, razorpay_signature}= req.body;

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest=sha.digest("hex");
  if(digest !== razorpay_signature){
    return res.status(400).json({msg:"Transaction not legit!"});
  }
 res.json({
   msg: "Success",
   orderId: razorpay_order_id,
   paymentId: razorpay_payment_id,
 });
})

app.listen(PORT,async ()=>{
await connectDB();
console.log("DB connected working on port",PORT);
})

// Connect to database and start the server
module.exports = async (req, res) => {
  try {
    // Ensure database connection
    await connectDB();

    // Pass the request to the Express app
    app(req, res);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};
