const fs=require("fs");

// fs.readFile("../users.txt", "utf-8", function(err, data){
//     if(err) return console.log(err);
//     //console.log([0])

//    // data ko vapis obj me convert krne k liye
//    let users = JSON.parse(data)
//    console.log(users)
// })

// fs.readFile("../users2.txt", "utf-8", function(err, data){
//     if(err) return console.log(err);
    
//    let users = JSON.parse(data)
//    console.log(users)
// })

const {read} = require("../IO/io.js");

async function readusers(){
    let users = await read("../users.txt")
    let users2=await read("../users2.txt");
    console.log(users)
    console.log(users2)
} 

readusers();