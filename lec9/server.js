const express = require("express");
const app =express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Server created");
})

app.post("/data",(req,res)=>{
    const recieveData=req.body;
    res.json({
        name:"ramneet",
        address:"banur",
     })
})

app.listen(3000,()=>{
    console.log("Server started");
})