class OrderBook {
    constructor(symbol) {
        this.symbol = symbol;
        this.bids = [];
        this.ask = [];
        this.currentPrice = null;
        this.trades = [];
    }

    _sort(side) {
        if (side === "BUY") {
            this.bids.sort((a, b) => {
                if (a.price !== b.price) return b.price - a.price;
                return a.timeStamp - b.timeStamp;
            });
        } else {
            this.ask.sort((a, b) => {
                if (a.price !== b.price) return a.price - b.price;
                return a.timeStamp - b.timeStamp;
            });
        }
    }

    placeOrder(price, quantity, type, side, userName) {
        let newOrder = {
            symbol: this.symbol,
            orderId: Math.floor(Math.random() * 1000000),
            side: side,
            type: type,
            price: price ? Number(price) : null,
            originalQty: quantity,
            executedQty: 0,
            remainingQty: quantity,
            user: userName,
            timeStamp: Date.now()
        };

        let trades = [];
        let trade;
        let order;

        if (newOrder.type === "LIMIT") {
            [order, trade] = this._LimitMatch(newOrder, trades);

            if (order.remainingQty > 0) {
                if (order.side === "BUY") this.bids.push(order);
                else this.ask.push(order);
                this._sort(order.side);
            }

            if (trade.length > 0) this.trades.push(...trade);

            return { book: this.getBookSnapshot(), trades: trade };
        } 
        else if (newOrder.type === "MARKET") {
            [order, trade] = this._MarketMatch(newOrder, trades);

            if (trade.length > 0) this.trades.push(...trade);

            return { book: this.getBookSnapshot(), trades: trade };
        } 
        else {
            return { error: "Invalid order type" };
        }
    }

    _LimitMatch(order, trade) {
        if (order.side === "BUY") {
            let askArr = this.ask;
            while (order.remainingQty > 0 && askArr.length > 0) {
                let top = askArr[0];
                if (top.price <= order.price) {
                    let qty = Math.min(top.remainingQty, order.remainingQty);
                    this.currentPrice = top.price;
                    trade.push([qty, top.price]);

                    order.executedQty += qty;
                    order.remainingQty -= qty;
                    top.executedQty += qty;
                    top.remainingQty -= qty;

                    if (top.remainingQty === 0) askArr.shift();
                } else break;
            }
            return [order, trade];
        } 
        else if (order.side === "SELL") {
            let bidArr = this.bids;
            while (order.remainingQty > 0 && bidArr.length > 0) {
                let top = bidArr[0];
                if (top.price >= order.price) {
                    let qty = Math.min(top.remainingQty, order.remainingQty);
                    this.currentPrice = top.price;
                    trade.push([qty, top.price]);

                    order.executedQty += qty;
                    order.remainingQty -= qty;
                    top.executedQty += qty;
                    top.remainingQty -= qty;

                    if (top.remainingQty === 0) bidArr.shift();
                } else break;
            }
            return [order, trade];
        } 
        else {
            return ["Invalid Order Side"];
        }
    }

    _MarketMatch(order, trade) {
        if (order.side === "BUY") {
            let askArr = this.ask;
            while (order.remainingQty > 0 && askArr.length > 0) {
                let top = askArr[0];
                let qty = Math.min(top.remainingQty, order.remainingQty);
                this.currentPrice = top.price;
                trade.push([qty, top.price]);

                order.executedQty += qty;
                order.remainingQty -= qty;
                top.executedQty += qty;
                top.remainingQty -= qty;

                if (top.remainingQty === 0) askArr.shift();
            }
            return [order, trade];
        } 
        else if (order.side === "SELL") {
            let bidArr = this.bids;
            while (order.remainingQty > 0 && bidArr.length > 0) {
                let top = bidArr[0];
                let qty = Math.min(top.remainingQty, order.remainingQty);
                this.currentPrice = top.price;
                trade.push([qty, top.price]);

                order.executedQty += qty;
                order.remainingQty -= qty;
                top.executedQty += qty;
                top.remainingQty -= qty;

                if (top.remainingQty === 0) bidArr.shift();
            }
            return [order, trade];
        } 
        else {
            return ["Invalid Order Side"];
        }
    }

    getPrice() {
        return this.currentPrice;
    }

    getBookSnapshot() {
        return {
            ask: this.ask.map(a => [a.price, a.remainingQty]),
            bids: this.bids.map(b => [b.price, b.remainingQty])
        };
    }

    getLatestTrade() {
        if (this.trades.length === 0) return "No trades have been executed yet.";
        let [quantity, price] = this.trades[this.trades.length - 1];
        return { quantity, price, currentPrice: this.currentPrice };
    }
}


// === TEST ===
let BTCUSDOrderBook = new OrderBook("BTC_USD");

console.log(BTCUSDOrderBook.placeOrder(100, 5, "LIMIT", "BUY", "Tanushwi"));
console.log(BTCUSDOrderBook.placeOrder(101, 10, "LIMIT", "BUY", "Ramneet"));
console.log(BTCUSDOrderBook.placeOrder(99, 5, "LIMIT", "BUY", "Yashika"));

console.log(BTCUSDOrderBook.placeOrder(102, 5, "LIMIT", "SELL", "Yashika"));
console.log(BTCUSDOrderBook.placeOrder(104, 10, "LIMIT", "SELL", "Ramneet"));

console.log(BTCUSDOrderBook.placeOrder(98, 5, "LIMIT", "SELL", "Tanushwi"));
console.log(BTCUSDOrderBook.placeOrder(null, 10, "MARKET", "BUY", "Tanushwi"));

console.log("Current Price:", BTCUSDOrderBook.getPrice());
console.log("Latest Trade:", BTCUSDOrderBook.getLatestTrade());

module.exports = OrderBook;