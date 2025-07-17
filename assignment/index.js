//Write data in file demo.txt,input will be passed using terminal

const fs=require('fs');
let file=process.argv.splice(2).join(" ");

fs.writeFile("./demo.txt",file,function(err){
    if(err) return console.log(err);
    console.log("success!!");
})