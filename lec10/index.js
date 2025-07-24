const express=require('express');
const app=express();
app.use(express.static(__dirname+"/public"))//static content folder bhejne k kaam aata h
app.use(express.urlencoded({extended:true}));//to parse form data

// app.get("/",(req,res)=>{
//     res.sendFile(__dirname+"/index.html");
// })

// app.get("/about.html",(req,res)=>{
//     res.sendFile(__dirname+"/about.html");
// })

app.post("/adduser",(req,res)=>{
    console.log(req.body);
    let username=req.body.username;
    let password=req.body.password;
    res.json({
        username,
        password
    })
})

app.listen(5555,()=>{
    console.log("server started");
})