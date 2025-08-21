const express=require("express")
const mongoose=require("mongoose")

const app=express()

const Users=require("./model/user")
const Blog=require("./model/blog")

app.use(express.urlencoded({extended:true}))
app.use(express.json())

//blogs
app.post('/blogs',async(req,res)=>{
    let title=req.body.title;
    let body=req.body.body;
    let userId=req.body.userId;
    let blog={
        title:title,
        body:body,
        date:Date.now(),
        userId:userId
    }
    
    let newBlog=new Blog(blog)
    await newBlog.save()
    let user=await Users.findById(userId);
    user.blogs.push(newBlog._id)
    await user.save()

    res.json({
        success:true,
        message:"blog added successfully",
        data:newBlog
    })
})

app.delete("/blogs/:blogId",async(req,res)=>{
    let blogId=req.params.blogId;
    let userId=req.body.userId;
    let blogExists=await Blog.findById(blogId);
    if(!blogExists){
        return res.json({
            success:false,
            message:"Blog does not exist"
        })
    }
    if(blogExists.userId.toString() !== userId){
        return res.json({
            success:false,
            message:"Permission denied"
        })
    }
    await Blog.findByIdAndDelete(blogId);//hw: remove blogs column from user 
})

app.get("/blogs",async(req,res)=>{
    let allBlogs=await Blog.find()
    res.json({
        success:true,
        message:"data added successfully",
        data:allBlogs
    })
})

app.get("/blogs/:id",async(req,res)=>{
    let id=req.params.id;
    let blog=await Blog.findById(id);
    res.json({
        success:true,
        message:"blog fetched successfully",
        data:blog
    })
})

//users
app.get("/users/:id",async(req,res)=>{
    let id=req.params.id;
        let user=await Users.findById(id);
        res.json({
            success:true,
            message:"user fetched successfully",
            data:user
        })
})

app.get("/users",async(req,res)=>{
let allUsers=await Users.find()
    res.json({
        success:true,
        message:"user added successfully",
        data:allUsers
    })
})
app.post("/users",async(req,res)=>{
    let name=req.body.name;
    let email=req.body.email;
    let password=req.body.password;
    let user={
        name:name,
        email:email,
        password:password,
    }
    let newUser=new Users(user)
    await newUser.save()
    res.json({
        success:true,
        message:"User added successfully",
        data:newUser
    })

})


mongoose.connect('mongodb://127.0.0.1:27017/g27dB')
  .then(() => console.log('Connected!'));

app.listen(9999,()=>{
    console.log("server started")
})