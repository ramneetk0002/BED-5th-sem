const fs=require('fs');
console.log(fs);
console.log("start");

setImmediate(()=>{
    console.log("set immediate")
})

setTimeout(()=>{
    console.log("set timeout")
},0)

fs.readFile("demo.txt","utf-8",(err,data)=>{
    console.log("file read")
    console.log(data);
    setTimeout(()=>{
        console.log("timer 2");
    })
    setImmediate(()=>{
        console.log("immediate 2");
    })
})

function someTask()
{
    return new Promise((resolve,reject)=>{
        resolve("promise")
    })
}
someTask().then((data)=>{
    console.log(data)
})
.catch((err)=>{//callback register
    console.log(err);
})
process .nextTick(()=>{
    console.log("next tick")
})
console.log("end");