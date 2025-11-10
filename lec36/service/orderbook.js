class OrderBook {
    constructor(symbol) {
        this.symbol = symbol;
        this.bids = [];
        this.ask = [];
        this.currentPrice = null;
        this.trades = [];
    }

    _sort(side) {
        if (side == "BUY") {
            this.bids.sort((a, b) => {
                if (a.price != b.price) {
                    return b.price - a.price;  //sort according to price
                }
                return a.timeStamp - b.timeStamp;   //sort according to time
            })  //lexiographically
        } else {
            this.ask.sort((a, b) => {
                if (a.price != b.price) {
                    return a.price - b.price;  //sort according to price
                }
                return a.timeStamp - b.timeStamp;   //sort according to time
            })  //lexiographically
        }
    }

    placeOrder(price, quantity, type, side, userName) {
        let newOrder = {
            symbol: this.symbol,
            orderId: Math.floor(Math.random() * 1000000),
            side: side,
            type: type,
            price: price || null,
            originalQty: quantity,
            executedQty: 0,
            remainingQty: quantity,
            user: userName,
            timeStamp: Date.now()
        }

        let trades = [];
        let trade;  //declared before usage
        let order;  //to store order after matching

        if (newOrder.type == "LIMIT") {
            //limit order handling
            [order, trade] = this._LimitMatch(newOrder, trades);
            if (order.remainingQty > 0) {
                if (order.side == "BUY") {
                    this.bids.push(order);
                } else {
                    this.ask.push(order);
                }
                this._sort(order.side);
            }
        } else {
            //market order handling
            [order, trade] = this._MarketMatch(newOrder, trades);
            if (order.remainingQty > 0) {
                console.log("order complete " + newOrder.executedQty + ", Order cancel " + newOrder.remainingQty);
            } else {
                console.log("order completed " + newOrder.executedQty);
            }
        }

        //save trades in global trades list
        if (trade && trade.length > 0) {
            this.trades.push(...trade);
        }
    }

    _LimitMatch(order, trade) {
        if (order.side == "BUY") {
            //115 buy 10, 110,111,115
            let askArr = this.ask;
            while (order.remainingQty > 0 && askArr.length > 0) {
                let top = askArr[0];
                if (top.price <= order.price) {
                    let buyQuantity = Math.min(top.remainingQty, order.remainingQty);
                     this.currentPrice = top.price;
                     trade.push([buyQuantity, top.price]);
                    //update --> order
                    order.executedQty += buyQuantity;
                    order.remainingQty -= buyQuantity;

                    top.executedQty += buyQuantity;
                    top.remainingQty -= buyQuantity;

                    if (top.remainingQty == 0) {
                        askArr.shift();
                    }
                } else {
                    break;
                }
            }
            return [order, trade];
        } else if (order.side == "SELL") {
            let bidArr = this.bids;
            while (order.remainingQty > 0 && bidArr.length > 0) {
                let top = bidArr[0];
                if (top.price >= order.price) {
                    let buyQuantity = Math.min(top.remainingQty, order.remainingQty);
                    this.currentPrice = top.price;
                    trade.push([buyQuantity, top.price]);
                    //update --> order
                    order.executedQty += buyQuantity;
                    order.remainingQty -= buyQuantity;

                    top.executedQty += buyQuantity;
                    top.remainingQty -= buyQuantity;

                    if (top.remainingQty == 0) {
                        bidArr.shift();
                    }
                } else {
                    break;
                }
            }
            return [order, trade];
        } else {
            return "Invalid Order Side";
        }
    }

    _MarketMatch(order, trade) {
      if (order.side == "BUY") {
            let askArr = this.ask;
            while (order.remainingQty > 0 && askArr.length > 0) {
                let top = askArr[0];
                // no price check in market order
                let buyQuantity = Math.min(top.remainingQty, order.remainingQty);
                this.currentPrice = top.price;
                trade.push([buyQuantity, top.price]);
                //update --> order
                order.executedQty += buyQuantity;
                order.remainingQty -= buyQuantity;

                top.executedQty += buyQuantity;
                top.remainingQty -= buyQuantity;

                if (top.remainingQty == 0) {
                    askArr.shift();
                }
            }
            return [order, trade];
        } else if (order.side == "SELL") {
            let bidArr = this.bids;
            while (order.remainingQty > 0 && bidArr.length > 0) {
                let top = bidArr[0];
                // no price check in market order
                let sellQuantity = Math.min(top.remainingQty, order.remainingQty);
                this.currentPrice = top.price;
                trade.push([sellQuantity, top.price]);
                //update --> order
                order.executedQty += sellQuantity;
                order.remainingQty -= sellQuantity;

                top.executedQty += sellQuantity;
                top.remainingQty -= sellQuantity;

                if (top.remainingQty == 0) {
                    bidArr.shift();
                }
            }
            return [order, trade];
        } else {
            return "Invalid Order Side";
        }
    }

    getPrice() {
        return this.currentPrice;
    }

    getBookSnapshot() {
        return {
            "ask": this.ask.map((a) => [a.price, a.remainingQty]),
            "bids": this.bids.map((b) => [b.price, b.remainingQty])
        }
    }
    getLatestTrade() {
    if (this.trades.length === 0) {
        return "No trades have been executed yet.";
    }
    // Return the most recent trade (last entry)
    let [quantity, price] = this.trades[this.trades.length - 1];
    return { quantity, price, currentPrice: this.currentPrice };
}

}


let BTCUSDOrderBook = new OrderBook("BTC_USD");
// BTCUSDOrderBook.bids.push({price:"100",quantity:10,type:"LIMIT",user:"Tanushwi"})
// BTCUSDOrderBook.bids.push({price:"101",quantity:10,type:"LIMIT",user:"Yashika"})
// BTCUSDOrderBook.bids.push({price:"99",quantity:10,type:"LIMIT",user:"Ramneet"})
// //console.log(BTCUSDOrderBook);
// BTCUSDOrderBook._sort("BUY");
// console.log(BTCUSDOrderBook.bids);
// BTCUSDOrderBook.ask.push({price:"105",quantity:5,type:"LIMIT",user:"Tanushwi"})
// BTCUSDOrderBook.ask.push({price:"101",quantity:8,type:"LIMIT",user:"Yashika"})
// BTCUSDOrderBook.ask.push({price:"110",quantity:10,type:"LIMIT",user:"Ramneet"})
// BTCUSDOrderBook._sort("SELL");
// console.log(BTCUSDOrderBook.ask);

BTCUSDOrderBook.placeOrder("100", 5, "LIMIT", "BUY", "Tanushwi");
BTCUSDOrderBook.placeOrder("101", 10, "LIMIT", "BUY", "Ramneet");
BTCUSDOrderBook.placeOrder("99", 5, "LIMIT", "BUY", "Yashika");
console.log(BTCUSDOrderBook.getBookSnapshot());
//console.log(BTCUSDOrderBook);
BTCUSDOrderBook.placeOrder("102", 5, "LIMIT", "SELL", "Yashika");
BTCUSDOrderBook.placeOrder("104", 10, "LIMIT", "SELL", "Ramneet");
console.log(BTCUSDOrderBook.getBookSnapshot());
console.log(BTCUSDOrderBook.getLatestTrade());
//console.log(BTCUSDOrderBook);
BTCUSDOrderBook.placeOrder("98", 5, "LIMIT", "SELL", "Tanushwi");
BTCUSDOrderBook.placeOrder(null,10,"MARKET","BUY","Tanushwi")
console.log(BTCUSDOrderBook.getPrice());
console.log(BTCUSDOrderBook.getBookSnapshot());
console.log(BTCUSDOrderBook.getLatestTrade());
 //console.log(BTCUSDOrderBook);

//if a function start with underscore ( _ ) it is used to tell that it is a private function but it doesnot make it actually private