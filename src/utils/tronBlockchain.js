import {Config, devConfig} from '../constant/blockchain';
const TronWeb = require('tronweb');
const config = Config;

const privateKey = '01';
        const tronWeb = new TronWeb({
            privateKey: privateKey,
            fullHost: config.fullHost
        });

export function getTronWeb() {
    
      return window.tronWeb;
  }
export function connectedWallet(currentWeb){
    if(currentWeb?.ready){
        return currentWeb;
    }
    else
        return false;
}
export const walletCompare = (wallet1, wallet2) => {
    if(wallet1.toString().substr(2).toLowerCase() === wallet2.toString().substr(2).toLowerCase())
        return true;
    else
        return false;
}
export const getAllWallets = async()=>{
    try{
        let contract = await tronWeb.contract().at(config.contract);
        let balances = await contract.methods.getInvestors().call();
        return balances;

    }catch(errer){
        console.log(errer);
        return [];

    }
}
export const getAllBalanceOf = async()=>{
 
    try{
        let contract = await tronWeb.contract().at(config.contract);
        let balances = await contract.methods.getAllBalanceOf().call();
        return balances;

    }catch(errer){
        console.log(errer);
        return [];

    }

}
export const getAllProfit = async()=>{////////////

    try{
        let contract = await tronWeb.contract().at(config.contract);
        let balances = await contract.methods.getAllProfit().call();
        return balances;

    }catch(errer){
        return [];

    }
}
export const getAllActiveWithDraw = async()=>{////////////

    try{
        let contract = await tronWeb.contract().at(config.contract);
        let balances = await contract.methods.getAllActiveWithDraw().call();
        return balances;

    }catch(errer){
        return [];

    }
}
export const getMyBalance = async()=>{
    
    
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        let contract = await window.tronWeb
            .contract()
            .at(config.contract);
            
        let profits = await contract.getBalanceOf().call();
        return profits;
    }
    return null;
}
export const getMyProfit = async()=>{
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        let contract = await window.tronWeb
            .contract()
            .at(config.contract);
        let profits = await contract.getProfit().call();
        return profits;
    }
    return null;
}
export const getMyActiveWithdraw = async()=>{
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        let contract = await window.tronWeb
            .contract()
            .at(config.contract);
        let profits = await contract.getActiveWithdraw().call();
        return profits;
    }
    return null;
}

export const getMyWalletTRX = async()=>{
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        let profits = await window.tronWeb.trx.getBalance(window.tronWeb.defaultAddress.base58);
        return profits/1000000;
    }
    return null;
}

export const getMyWalletUSDT = async()=>{
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        let contract = await window.tronWeb
            .contract()
            .at(config.usdtAddress);
        let profits = await contract.balanceOf(window.tronWeb.defaultAddress.base58).call();
        return profits/1000000;
    }
    return null;
}
export const getInsuranceLock = async ()=>{
    try{
        let contract = await tronWeb.contract().at(config.contract);
        let balances = await contract.methods.getInsuranceLock().call();
        return balances;

    }catch(errer){
        return false;

    }
}
export const depositTRX = async(amount)=>{
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        try{
            let transaction;
            let contract = await window.tronWeb
                .contract()
                .at(config.contract);
            let tx = await contract.depositTron().send({
                callValue: amount*1000000})
                .then(res => transaction = res)
            return tx;
        }
        catch(err){
            console.log("error", err);
            return false;
        }
        
    }
    return false;
}

export const depositTronByGuest = async(amount, address)=>{
    console.log("guest", amount, address);
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        try{
            let transaction;
            let contract = await window.tronWeb
                .contract()
                .at(config.contract);
            let result = await contract.methods.depositTronByGuest(address).send({callValue: amount*1000000})
            .then(output=>transaction = output)
            .catch(err => transaction = false);

            return result;
        }catch(error){
            return false;
        }
    }
    return false;
}

export const depositUSDT = async(amount)=>{
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        try{
            let usdtContract = await window.tronWeb.contract().at(config.usdtAddress);
            let approve = await usdtContract.approve(config.contract, amount * 1000000).send();
            if(!approve){
                return false;
            }
            let transaction;
            let contract = await window.tronWeb
                .contract()
                .at(config.contract);
            let result = await contract.methods.depositUsdt(amount * 1000000).send()
            .then(output=>transaction = output)
            .catch(err => transaction = false);
            return result;
        }
        catch(error){
            return false;
        }
       
    }
    return false;
}

export const depositUsdtByGuest = async(amount, address)=>{
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        try{
            let usdtContract = await window.tronWeb.contract().at(config.usdtAddress);
            let approve = await usdtContract.approve(config.contract, amount * 1000000).send();
            if(!approve){
                return false;
            }
            let transaction;
            let contract = await window.tronWeb
                .contract()
                .at(config.contract);
            let result = await contract.methods.depositUsdtByGuest(amount * 1000000, address).send()
            .then(output=>transaction = output)
            .catch(err => transaction = false);
            return result;
        }
        catch(error){
            return false;
        }
        
    }
    return false;
}
export const withdrawTRX = async(amount)=>{
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        let transaction;
        let contract = await window.tronWeb
            .contract()
            .at(config.contract);
        let result = await contract.methods.withdrawTron(amount * 1000000).send()
        .then(output=>transaction = output)
        .catch(err => transaction = false);
        console.log("withdraw upadte", result);
        return result;
    }
    return false;
}

export const withdrawUSDT = async(amount)=>{
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        let transaction;
        let contract = await window.tronWeb
            .contract()
            .at(config.contract);
        let result = await contract.methods.withdrawUsdt(amount * 1000000).send()
        .then(output=>transaction = output)
        .catch(err => transaction = false);
        return result;
    }
    return false;
}

export const getTransactionInfo = async (trx) => {
    try{
        while(1){
            let transaction = await tronWeb.trx.getUnconfirmedTransactionInfo(trx);
            if(transaction.receipt)
                if(transaction.receipt.result == 'SUCCESS')
                    return true;
                else
                    return false;
        }
        return false;
    }
    catch(error){
        return false;
    }
    
    
}
