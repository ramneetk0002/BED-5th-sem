const fs=require("fs")


let users =[
    {
        id:1,
        name:"ramneet",
        age:"20"
    },
    {
        id:2,
        name:"yashika",
        age:"19"
    },
]

fs.writeFile("../users.txt",JSON.stringify(users), function(err){
    if(err) return console.log(err);
    console.log("users written")
})