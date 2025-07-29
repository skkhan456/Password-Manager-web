const express=require('express');
const bodyparser=require('body-parser');
const env=require('dotenv').config();
const {MongoClient}=require('mongodb');
const cors=require('cors');
const Authrouters=require("./routers/Authrouters")
require("./models/db");

const app=express();

app.use(cors());
app.use(bodyparser.json());


let uri=process.env.MONGO_URI1;
let client=new MongoClient(uri);
client.connect();

let dbName=process.env.DB_NAME;

let port=4000;

app.use('/auth',Authrouters)

// get the all password stored
app.get('/',async (req,res)=>{
    const db=client.db(dbName);
    const collection=db.collection('passwords');
    const finalresult=await collection.find({}).toArray();
    res.json(finalresult);
    res.send("hello world);
})

// stroed the password
app.post('/',async (req,res)=>{
    let data=req.body;
    const db=client.db(dbName);
    const collection=db.collection('passwords');
    const finalresult=await collection.insertOne(data);
    
    res.json({success:true,result:finalresult});
    
})


app.delete('/',async (req,res)=>{
    let data=req.body;
    const db=client.db(dbName);
    const collection=db.collection('passwords');
    const finalresult=await collection.deleteOne(data);
    
    res.json({success:true,result:finalresult});
})

app.listen(port);
