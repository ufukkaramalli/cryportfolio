export function calculateUSD(marketData,payload){
    if(payload.asset === 'USDT' || payload.asset === 'USD'){
        return payload.value
    }else{
        let name = payload.asset+"USDT"
        let price = null
        marketData.find(element => {
            if(name === element.symbol){
                price = element.lastPrice
            }
        })
        let a = parseFloat(payload.value)*parseFloat(price)
        return a
    }
  }

  export function calculateTRY(marketData,payload){
    if(payload.asset === 'TRY' || payload.asset === 'TRYB'){
        return payload.value
    }else if(payload.asset === 'USDT' || payload.asset === 'USD'){
        let price = 0
        marketData.find(element => {
            if('USDTTRY' === element.symbol){
                price = element.lastPrice
                }
        })
        let total = parseFloat(payload.value)*parseFloat(price)
        return total
    }else{
        let price = 0
        marketData.find(element => {
            if('USDTTRY' === element.symbol){
                price = element.lastPrice
                }
        })
        let total = parseFloat(payload.value)*parseFloat(price)
        return total
    }
  }