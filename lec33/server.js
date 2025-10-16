const express=require("express");
const app=express();
const { createClient }=require("redis");

let client;

async function connect(){
    client = await createClient();
    await client.connect();
    client.on("error", function(err){
        console.log(err);
    });
    return client;
}


async function cachedData(){
    await client.set("user",JSON.stringify([{
        name:"Ramneet",
        age:19
    }]));
}

// connect()
// .then((client)=>{
//     cachedData()
//     .then(()=>{
//         console.log("Data cached successfully");
//         app.listen(3000,()=>{
//             console.log("Server is running on port 3000");
//         });
//     });
// });

async function readData(){
    await client.connect();
    let user=await client.get("user:100");
    return user;
}

connect()
.then((client)=>{
    readData()
    .then(()=>{
        console.log("Data read successfully");
        app.listen(3000,()=>{
            console.log("Server is running on port 3000");
        });
    })
})