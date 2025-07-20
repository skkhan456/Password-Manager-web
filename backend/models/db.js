const mongoose=require ("mongoose")
require('dotenv').config(); // Load .env file

const uri=process.env.MONGO_URI;

mongoose.connect(uri)
    .then(()=>{
        console.log("connected");
    }).catch((err)=>{
        console.log("not connected" ,err)
    })
