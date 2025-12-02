const OrderBook=require('../service/orderbook');
const db=new OrderBook("BTCUSD");
module.exports.postPlaceOrder=async (req,res)=>{
    //user,quantity,type,price,side,symbol
    let {type,side,price,quantity,username}=req.body;
    //basic validation
    
    let response=db.placeOrder(price,quantity,type,side,username);
    console.log(response);
    res.json(response);
}
//