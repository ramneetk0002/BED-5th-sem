const express=require("express")
const mongoose=require("mongoose")

const app=express()

const Users=require("./model/user")
const Blog=require("./model/blog")
const jwt=require("jsonwebtoken")

app.use(express.urlencoded({extended:true}))
app.use(express.json());
//middleware to verify token
function isLogin(req,res,next){
    let token=req.headers.authorization;
    if(!token){
        return res.json({
            success:false,
            message:"please login first"
        })
    }
   let decoded=jwt.verify(token,"lop");
    if(!decoded){
     return res.json({
          success:false,
          message:"invalid token"
     })
    }
    req.userId=decoded.userId;
    next();
}


//blogs
app.post('/blogs',async(req,res)=>{
    let title=req.body.title;
    let body=req.body.body;
  //  let userId=req.body.userId;
  let userId=req.userId;
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

app.post("/login",(req,res)=>{
    let {email,password}=req.body;
    let userEmail= Users.findOne({email:email});
    if(!userEmail){
        return res.json({
            success:false,
            message:"please sign up"
        })
    }
    if(userExists.password!=password){
        return res.json({
            success:false,
            message:"invalid password"
        })
    }
    let token=jwt.sign({"userId":userExists._id},"lop")
    res.json({
        success:true,
        message:"login successful",
        token:token
    })
})


mongoose.connect('mongodb://127.0.0.1:27017/g27db')
  .then(() => console.log('Connected!'));

app.listen(9999,()=>{
    console.log("server started")
})



















// const express=require("express")
// const mongoose=require("mongoose")
// const app=express()
// const Users=require("./model/user")
// app.use(express.urlencoded({extended:true}))
// app.use(express.json())


// //get single/specific user
// app.get("/users/:id",async(req,res)=>{
//     let id=req.params.id;
//         let user=await Users.findById(id);
//         res.json({
//             success:true,
//             message:"user fetched successfully",
//             data:user
//         })
// })

// //get all users
// app.get("/users",async(req,res)=>{
// let allUsers=await Users.find()
//     res.json({
//         success:true,
//         message:"user added successfully",
//         data:allUsers
//     })
// })

// //add user
// app.post("/users",async(req,res)=>{
//     let name=req.body.name;
//     let email=req.body.email;
//     let password=req.body.password;
//     let user={
//         name:name,
//         email:email,
//         password:password,
//         date:Date.now()
//     }
//     let newUser=new Users(user)
//     await newUser.save()
//     res.json({
//         success:true,
//         message:"User added successfully",
//         data:newUser
//     })

// })


// mongoose.connect('mongodb://127.0.0.1:27017/g27dB')
//   .then(() => console.log('Connected!'));

// app.listen(9999,()=>{
//     console.log("server started")
// })