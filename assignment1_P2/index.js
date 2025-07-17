const fs = require("fs");

let username = process.argv[2];
let productname = process.argv[3];

fs.readFile("products.txt", "utf-8", (err, pdata) => {
  if (err) return console.log(err);
  let products = JSON.parse(pdata);
  
  let product = null;
  for (let i = 0; i < products.length; i++) {
    if (products[i].name === productname) {
        product = products[i];
        break;
    }
  }

  if (!product || product.quantity <= 0) {
    console.log("Product is not available");
    return;
  }

  fs.readFile("users.txt", "utf-8", (err, udata) => {
    if (err) return console.log(err);
    const users = JSON.parse(udata);
   
    let user = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].name === username) {
            user = users[i];
            break;
        }
    }

    if (!user) {
      console.log("User not found");
      return;
    }

    if (user.balance < product.price) {
      console.log("Insufficient balance");
      return;
    }

    product.quantity-=1;
    user.balance-=product.price;

    fs.writeFile("products.txt", JSON.stringify(products, null, 2), (err) => {
      if (err) return console.log(err);

      fs.writeFile("users.txt", JSON.stringify(users, null, 2),(err) => {
        if (err) return console.log(err);

        let order = {
          user: user.name,
          product: product.name,
          amount: product.price,
        };

        fs.writeFile("orderHistory.txt",JSON.stringify(order),(err) => {
          if (err) return console.log(err);
          console.log("Order placed successfully!");
        });
      });
    });
  });
});