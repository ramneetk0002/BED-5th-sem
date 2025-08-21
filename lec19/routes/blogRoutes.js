const express=require("express")
const Blog=require("../model/blog.js")
const Users=require("../model/user.js")
let{postAddBlog,getAllBlogs,getOneBlog,deleteOneBlog}=require("../controller/blogController.js")
const router=express.Router(); //small-->app

router.post("/",postAddBlog)
router.delete("/:n=blogId",deleteOneBlog)
router.get("/",getAllBlogs)
router.get("/:id",getOneBlog)

module.exports=router