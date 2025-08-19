const express=require("express");
const mongoose =require ('mongoose');
const app=express();
const Blog=require("./model/blog")
app.use(express.urlencoded({extended:true}));
app.use(express.json());
//create
app.post("/blogs",async(req,res)=>{
    let title=req.body.title;
    let body=req.body.body;
    let blog={
        title:title,
        body:body,
        date:Date.now()
    }
    let newBlog= new Blog(blog)
    await newBlog.save()
    res.json({
        success:true,
        message:"blog added successfully",
        data:newBlog
    })
})


//read
//read all data
//read single data
app.get("/blogs",async(req,res)=>{
    let allblogs=await Blog.find()
    res.json({
        success:true,
        message:"all blogs",
        data:allblogs
    })
})
app.get("/bolgs/:id",async(req,res)=>{
    let id=req.params.id;
    let blog=await Blog.findById(id)  
    res.json({
        success:true,
        message:"single blog",
        data:blog
    })    
})

mongoose.connect('mongodb://127.0.0.1:27017/G27DBs')
  .then(() => console.log('Connected!'));
  app.listen(2557,()=>{
    console.log("server started");
  })