import React, { useState, useEffect,useCallback } from 'react';
import axios from 'axios';
import {
  getTronWeb,
  connectedWallet,
  walletCompare,
  getMyBalance, 
  getMyProfit, 
  getMyActiveWithdraw, 
  getMyWalletTRX, 
  getMyWalletUSDT,
  getInsuranceLock,
  depositTRX,
  depositUSDT,
  withdrawTRX,
  withdrawUSDT,
  depositTronByGuest,
  depositUsdtByGuest,
  getTransactionInfo} from '../../utils/tronBlockchain';
import setAuthToken from '../../utils/setAuthToken';
import {SERVER_URL} from '../../constant/env';

const MyInfoContextTemplate = {
    myNotification : [],
    myWithdrawDate : [],
    myDepositDate : [],
    myTransaction : [],
    myBalance : 0,
    myProfit : 0,
    myActiveBalance : 0,
    walletBalance : [0,0],
    refresh : Boolean,
    loading : Boolean,
    error : Boolean,
    checkedWallet : () => {},
    setRefresh : (value)=>{},
    setError : (value) => {},
    depositTRX : (amount) => {},
    depositUSDT : (amount) => {},
    withdrawTRX : (amount) => {},
    withdrawUSDT : (amount) => {},
    addNotification : (message) => {},
    connectWallet : () => {},
    addWithdraw : (value) => {},
    addDeposit : (value) => {},
    addTransaction : () => {},
    depositTronByGuest : (amount, address) => {},
    depositUsdtByGuest : (amount, address) => {},
    addRefferal : (amount) => {},
    getInsuranceLock : () => {},
    getTransactionInfo : (trx) => {}
}
const MyInfoContext = React.createContext(MyInfoContextTemplate);

const initNotification = [{
  "id": 0,
  "userid": 0,
  "message": "Welcome!"
}]
const initWithdrawDate = [{
  
    "id": 0,
    "userid": 0,
    "date": "00/00/00 00:00:00"

}]
function MyInfoProvider(props) {
  const [myNotification, setNotification] = useState(initNotification);
  const [myWithdrawDate, setWithdrawDate] = useState(initWithdrawDate);
  const [myDepositDate, setDepositDate] = useState(initWithdrawDate);
  const [myTransaction, setTransaction] = useState(initWithdrawDate);
  const [myBalance, setBalance] = useState(0);
  const [myProfit, setProfit] = useState(0);
  const [myActiveBalance, setActiveBalance] = useState(0);
  const [walletBalance, setWalletBalance] = useState([0,0]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [downloadState, setDownLoadState] = useState(0);

  window.addEventListener('message', (res) => {
    if (res.data.message && res.data.message.action == "accountsChanged") {
      if (window.tronWeb && !loading) {
          setRefresh(true);
      }
      
    }
    if (res.data.message && res.data.message.action == "setNode") {
      if (window.tronWeb && !loading) {
          setRefresh(true);
      }
      
    }
  });

  const getMyNofification = async ()=>{
    
    setAuthToken(localStorage.jwtToken);
    let user = JSON.parse(localStorage.userInfo);
      axios.get(SERVER_URL+`notification/my/${user.id}`).then(result=>{
        
        if(result.data.response){
          if(result.data.data)        
            setNotification(result.data.data);
        } 
        else{
          setError(true);
        }
      })
      .catch(error=>{
        setError(true);
      });
    
  }
  const getWithdrawDate = async ()=>{
    
    setAuthToken(localStorage.jwtToken);
    let user = JSON.parse(localStorage.userInfo);
    axios.get(SERVER_URL+`withdrawinfo/my/${user.id}`).then(result=>{
      if(result.data.response){
        if(result.data.data)     
          setWithdrawDate(result.data.data);
      } 
      else{
        setError(true);
      }
    })
    .catch(error=>{
      setError(true);
    });;
            
                
  }
  const getDepositDate = async ()=>{
    
    setAuthToken(localStorage.jwtToken);
    let user = JSON.parse(localStorage.userInfo);
    axios.get(SERVER_URL+`depositinfo/my/${user.id}`).then(result=>{
      if(result.data.response){
        if(result.data.data)        
          setDepositDate(result.data.data);
      } 
      else{
        setError(true);
      }
    })
    .catch(error=>{
      setError(true);
    });;            
  }

  const getTransaction = async ()=>{
    
    setAuthToken(localStorage.jwtToken);
    let user = JSON.parse(localStorage.userInfo);
    axios.get(SERVER_URL+`transaction/my/${user.id}`).then(result=>{
      if(result.data.response){
        if(result.data.data)      
          setTransaction(result.data.data);
      } 
      else{
        setError(true);
      }
    })
    .catch(error=>{
      setError(true);
    });;           
  }

  const addNotification = (message)=>{
    
    setAuthToken(localStorage.jwtToken);
    let user = JSON.parse(localStorage.userInfo);
    return axios.post(SERVER_URL+`notification/create/${user.id}`, {
            userid : user.id,
            message : message})
              .then(response=>{
                  if(response.data.response){
                    
                  } 
                  else{

                  }
                })
  }

  const addWithdraw = (value)=>{
    
    setAuthToken(localStorage.jwtToken);
    let user = JSON.parse(localStorage.userInfo);
    return axios.post(SERVER_URL+`withdrawinfo/create/${user.id}`, {
            userid : user.id,
            amount : value})
              .then(response=>{
                  if(response.data.response){
                    
                  } 
                  else{
                    
                  }
                })
  }


  const addRefferal = (amount) => {
    setAuthToken(localStorage.jwtToken);
    let user = JSON.parse(localStorage.userInfo);
    let referral = JSON.parse(localStorage.affiliate);
    return axios.post(SERVER_URL+`referral/create/${user.id}`, {
            referralid : referral.referralid,
            amount : amount})
              .then(response=>{
                  if(response.data.response){
                    
                  } 
                  else{
                    
                  }
                })
  }

  const addDeposit = (value)=>{
    console.log("testing",value);
    
    setAuthToken(localStorage.jwtToken);
    let user = JSON.parse(localStorage.userInfo);
    return axios.post(SERVER_URL+`depositinfo/create/${user.id}`, {
            userid : user.id,
            amount : value})
              .then(response=>{
                  if(response.data.response){
                    
                  } 
                  else{
                    
                  }
                })
  }

  const addTransaction = (data)=>{
    
    setAuthToken(localStorage.jwtToken);
    let user = JSON.parse(localStorage.userInfo);
    return axios.post(SERVER_URL+`transaction/create/${user.id}`, {
            userid : user.id,
            message : data.message,
            transaction : data.transaction})
              .then(response=>{
                  if(response.data.response){
                    getTransaction();
                  } 
                  else{
                    
                  }
                })
  }
  
  useEffect(()=>{
    if(refresh)
      initeData();
  },[refresh])

  const connectWallet = ()=>{
    let currentWeb = getTronWeb();
    let connected = connectedWallet(currentWeb);

    if(!connected)
      return false;
    else
      return connected;
     
  }

  const delay = (time) => {
    return new Promise(resolve => setTimeout(resolve, time));
  }
  const checkedWallet = async()=>{
    await delay(1000);
    let currentWeb = getTronWeb();
    console.log(currentWeb)
    if(!currentWeb)
      return -1;
    console.log("compare wallet", window.tronWeb.defaultAddress.hex, JSON.parse(localStorage.userInfo).wallet)
    if(walletCompare(window.tronWeb.defaultAddress.hex, JSON.parse(localStorage.userInfo).wallet))
      return 1;
    else
      return 0;
  }

  const getRole = ()=>{
    if(localStorage.getItem("userInfo"))
      return JSON.parse(localStorage.getItem("userInfo")).role;
    else
      return 'none';
  }
  const initeData = async()=>{

    setLoading(true);
    if(localStorage.jwtToken){
      /////////////////////get my notification or else retrun false////////////////
      getMyNofification();
      
      ////////////////////get my withdraw info or else return false/////////////////
      getWithdrawDate();
      
    //////////////////////get deposit info or else return false///////////////////
      getDepositDate();
      
    //////////////////////get my transaction info or else return false/////////////

      getTransaction();
      
    }
    else
      setError(true);
    

    getMyBalance().then(balance=>{
      console.log("balance", balance);
      if(balance)
      setBalance(parseInt(balance)/1000000);
      setDownLoadState(prev=>prev+1);
    });

    getMyProfit().then(profit=>{
      
      if(profit)
      setProfit(parseInt(profit)/1000000);
      setDownLoadState(prev=>prev+1);
    });
    

    getMyActiveWithdraw().then(activeWithdraw=>{
      if(activeWithdraw)
      setActiveBalance(parseInt(activeWithdraw)/1000000);
      setDownLoadState(prev=>prev+1);
    });

    let TRXbalance = await getMyWalletTRX();
    let USDTbalance = await getMyWalletUSDT();
    setWalletBalance([TRXbalance, USDTbalance]);
    setDownLoadState(prev=>prev+1);

    setRefresh(false);
    
  }

  useEffect(()=>{
    if(downloadState == 4){
      setLoading(false);
      setDownLoadState(0);
    }
  },[downloadState])
  return(
          <MyInfoContext.Provider value={{
            myNotification,
            myWithdrawDate,
            myDepositDate,
            myTransaction,
            myBalance,
            myProfit,
            myActiveBalance,
            walletBalance,
            refresh,
            loading,
            error,
            getRole,
            checkedWallet,
            setError,
            setRefresh,
            depositTRX,
            depositUSDT,
            withdrawTRX,
            withdrawUSDT,
            connectWallet,
            addNotification,
            addWithdraw,
            addDeposit,
            addTransaction,
            depositTronByGuest,
            depositUsdtByGuest,
            addRefferal,
            getInsuranceLock,
            getTransactionInfo
          }}>
            {props.children}
          </MyInfoContext.Provider>

    )
}

export {MyInfoContext};
export default MyInfoProvider;
