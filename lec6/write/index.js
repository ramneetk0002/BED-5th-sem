const fs= require("fs");


fs.writeFile("../demo.txt","hello g27", function(err){
if(err) return console.log(err);
console.log("sucess")
//console.log(data)
})

fs.writeFile("../b.txt","new file created", function(err){
if(err) return console.log(err);
console.log("done")
//console.log(data)
})

fs.writeFile("../demo.txt","new file created", function(err){
if(err) return console.log(err);
console.log("done")
//console.log(data)
})