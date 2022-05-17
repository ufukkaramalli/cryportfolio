module.exports = (marketData, payload) => {
    if (payload.asset === 'USDT' || payload.asset === 'USD') {
        return payload.value
    } else {
        let name = payload.asset + "USDT"
        let price = null
        marketData.find(element => {
            if (name === element.symbol) {
                price = element.lastPrice
            }
        })
        let a = parseFloat(payload.value) * parseFloat(price)
        return a
    }
}