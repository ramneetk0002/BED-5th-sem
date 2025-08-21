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



//ref se models connect hone hai usme doosre model ka naam bhejte hai