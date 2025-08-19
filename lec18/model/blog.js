const mongoose=require("mongoose")
const Schema=mongoose.Schema
const BlogPost=new Schema({
    title:String,
    body:String,
    date:Date,
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"Users"
    }
});
module.exports=mongoose.model('Blogs', BlogPost)


// const mongoose=require("mongoose");
// const Schema = mongoose.Schema;
// const BlogPost = new Schema({
//   title: String,
//   body: String,
//   date: Date,
//   userId:{
//          type:mongoose.Types.ObjectId,
//          ref:"Users"
//      }
// });
// module.exports=mongoose.model('Blogs', BlogPost)