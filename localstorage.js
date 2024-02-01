
const express = require("express");

const {LocalStorage} = require("node-localstorage");
const local = new LocalStorage("./hello")

const app=express();

app.use(express.json())

app.listen(3003,()=>{
    console.log("server is running");
})

app.post("/",(req,res)=>{

//    const {username , password} = req.body;



const data = JSON.parse(local.getItem("value"));


 data.push(req.body)

    local.setItem("value",JSON.stringify(data , null ,2))

    res.send("success");
})