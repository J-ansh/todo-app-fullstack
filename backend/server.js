const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const todoRoutes = require("./routes/todoRoutes");
require ("dotenv").config()

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api", todoRoutes);

mongoose.connect(process.env.MONGO_URI).then(()=>console.log("MongoDB connected"))
.catch(err => console.log(err)) 

app.listen(PORT, ()=>{
    console.log(`app running on ${PORT}`)
})