import axios from "axios"
class Ezil {
    constructor(eth,zil){
        this.eth_wallet = eth
        this.zil_wallet = zil
    }
    async getBalances(){
        try {
            return axios.get("https://billing.ezil.me/balances/"+this.eth_wallet+"."+this.zil_wallet)
        } catch (error) {
            console.log(error)
        }
        
    }
    async getHashrate(){
        try {
            return axios.get("https://stats.ezil.me/current_stats/"+this.eth_wallet+"."+this.zil_wallet+"/reported")
        } catch (error) {
            console.log(error)
        }
        
    }
}
const _Ezil = Ezil
export { _Ezil as Ezil }