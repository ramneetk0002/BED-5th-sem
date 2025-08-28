const mongoose=require("mongoose")
const Schema=mongoose.Schema
const addUSer=new Schema({
    name:String,
    email:String,
    password:String,
    blogs:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Blogs"
        }
    ]
});
module.exports=mongoose.model('Users',addUSer)


// const mongoose=require("mongoose")
// const Schema=mongoose.Schema
// const addUSer=new Schema({
//     name:String,
//     email:String,
//     password:String,
//     date:Date,
//      blogs:[
//         {
//           type: mongoose.Types.ObjectId,
//           ref:Blog
//         }
//       ]
   
// })
// module.exports=mongoose.model('Users',addUSer)