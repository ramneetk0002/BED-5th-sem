let p = new Promise((resolve,reject)=>{
    let age=18;
    if(age>18) return resolve("you are eligible to vote")
        reject("not eligible")
})
p
.then((data)=>{
    console.log(data)
})
.catch((err)=>{
    console.log(err)
})

console.log("hi");
function add(a,b){
    console.log(a+b)
}
add(2,3)
console.log("emd")