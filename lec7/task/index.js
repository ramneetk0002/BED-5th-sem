const fs=require("fs");
const {read}=require("../IO/io.js")
const {write}=require("../IO/io.js")
 
// fs.readFile("../users.txt","utf-8",function(err,data1){
//     if(err) return console.log(err);
//     let users1=JSON.parse(data1);
//     //console.log(users1);

//     fs.readFile("../users2.txt","utf-8",function(err,data2){
//         if(err) return console.log(err);
//             let users2=JSON.parse(data2);
//             //console.log(users2);
            
//             let alluser=users1.concat(users2);
//             fs.writeFile("../allusers.txt",JSON.stringify(alluser),function(err){ //stringify convert everything into string
//             if(err) return console.log(err);
//             console.log(alluser);
//             console.log("users written");
//         })
        
//     })
// })

async function task(file1, file2, file3){
    let user1=await read(file1);
    console.log(user1)
    let user2=await read(file2);
    
    let allusers=user1.concat(user2);
    let mes=await write(file3,JSON.stringify(allusers));
    console.log(mes)
}
task("../users.txt","../users2.txt","./allusers.txt")