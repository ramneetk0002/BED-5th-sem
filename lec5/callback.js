let account_balance = 200000;
let products = [
    {
        name: "samsung",
        amount: 70000,
        quantity: 10
    },
    {
        name: "Iphone 16",
        amount: 100000,
        quantity: 1
    }
];

function buyProduct(product_name) {
    return new Promise((resolve, reject) => {
        let product = products.find((p) => p.name === product_name);

        if (!product) {
            return reject("Product is not available");
        } else {
            return resolve(product.amount);
        }
    });
}

// buyProduct("Iphone 16")
//     .then((data) => {
//        return deductAmount(data)
//     })
//     .then((message) => {
//         console.log(message);
//         console.log(account_balance)
//     })
//     .catch((err)=>{
//         console.log(err);
//     })



    function deductAmount(amount){
return new Promise((resolve, reject)=>{
if(amount > account_balance) {
     return reject("Not enough balance to purchase the product");   
}else{
    account_balance -= amount;
    return resolve("Your product is purchased");    
}
})
}

async function myfun(){
    try{
 let amount = await buyProduct("Iphone 16");
let message = await deductAmount(amount);
console.log(message);
    } catch(error){
   console.log(error)
    }
  
}
console.log(myfun())

console.log("start");
console.log("end");