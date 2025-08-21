const Blog=require("../model/blog.js")
const Users=require("../model/user.js")
module.exports.getOneUser=async(req,res)=>{
    let id=req.params.id;
        let user=await Users.findById(id);
        res.json({
            success:true,
            message:"user fetched successfully",
            data:user
        })
}

module.exports.getAllUsers=async(req,res)=>{
    let allUsers=await Users.find()
        res.json({
            success:true,
            message:"user added successfully",
            data:allUsers
        })
}

module.exports.postAddUser=async(req,res)=>{
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

}