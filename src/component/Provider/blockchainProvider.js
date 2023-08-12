import React, { useState, useEffect,useCallback } from 'react';
import axios from 'axios';
import {getAllWallets, getAllBalanceOf, getAllProfit, getAllActiveWithDraw} from '../../utils/tronBlockchain';
import {SERVER_URL} from '../../constant/env';
import openNotification from "../components/notification";

const BlockchainContextTemplate = {
    allInvestors : [],
    allBalances : [],
    allProfits : [],
    allWithdraw : [],
    allDeposit : [],
    allReferral : [],
    wallets : [],
    allActiveWithDraw : [],
    refresh : Boolean,
    loading : Boolean,
    tronPrice : {},
    usdtPrice : {},
    setRefresh : (value)=>{},
}
const BlockchainContext = React.createContext(BlockchainContextTemplate);
const initTrxPrice = {
  name : "Tron",
  symbol : "TRX",
  price1 : 0.05,
  high1 : 1.2,
  price2 : 0.00000155,
  high2 : 1.90356,
  price3 : 0.00002289,
  high3 : 3.84371,
}

const initUSDTPrice = {
  name : "USDT",
  symbol : "USDT",
  price1 : 1,
  high1 : 0.2,
  price2 : 0.00002726,
  high2 : 3.29057,
  price3 : 0.00040312,
  high3 : 5.34979,
}

function BlockchainProvider(props) {
  const [allInvestors, setInvestors] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [allBalances, setBalances] = useState([]);
  const [allProfits, setProfits] = useState([]);
  const [allActiveWithDraw, setdAllActiveWithDraw] = useState([]);
  const [allWithdraw, setWithdraw] = useState([]);
  const [allDeposit, setDeposit] = useState([]);
  const [allReferral, setReferral] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tronPrice, setTronPrice] = useState(initTrxPrice);
  const [usdtPrice, setUsdtPrice] = useState(initUSDTPrice);
  const [downloadState, setDownloadState] = useState(0);

 
  const getTokenPrice = (tokenId, setToken)=>{
    return axios.get(`https://api.coingecko.com/api/v3/coins/${tokenId}?tickers=false&community_data=false&developer_data=false&sparkline=false`)
            .then(response=>{
              let body = response.data;
                let oldToken = {
                  name : body.name,
                  symbol : body.symbol,
                  price1 : body.market_data.current_price.usd,
                  high1 : body.market_data.price_change_percentage_24h_in_currency.usd,
                  price2 : body.market_data.current_price.btc,
                  high2 : body.market_data.price_change_percentage_24h_in_currency.btc,
                  price3 : body.market_data.current_price.eth,
                  high3 : body.market_data.price_change_percentage_24h_in_currency.eth,
                }
                setToken(oldToken);
              })
  }
  const getAllWithdrawInfo = ()=>{
    return axios.get(SERVER_URL+"withdrawinfo/latest")
            .then(response=>{
                if(response.data.response){
                  
                    setWithdraw(response.data.data.users);
                } 
                else{
                  openNotification(4.5,'Fail!',response.data.message,false,null)
                }
              })
  }
  const getAllUsers = ()=>{
    return axios.get(SERVER_URL+"users")
            .then(response=>{
                if(response.data.response){
                  
                  setInvestors(response.data.data);
                } 
                else{
                  openNotification(4.5,'Fail!',response.data.message,false,null)
                }
              })
  }
  const getAllDepositInfo = ()=>{
    return axios.get(SERVER_URL+"depositinfo/latest")
            .then(response=>{
                if(response.data.response){
                    setDeposit(response.data.data.users);
                }
                else{
                openNotification(4.5,'Fail!',response.data.message,false,null)
                }
            });
  }
  const getAllReferral = ()=>{
    return axios.get(SERVER_URL+"referral/latest")
            .then(response=>{
                if(response.data.response){
                  setReferral(response.data.data);
                }
                else{
                openNotification(4.5,'Fail!',response.data.message,false,null)
                }
            });
  }
  useEffect(()=>{
    initeData();
  },[refresh,window.tronWeb])

  const initeData = async()=>{
    getTokenPrice('tron', setTronPrice);
    getTokenPrice('tether', setUsdtPrice);
    getAllUsers();
    getAllWithdrawInfo();
    getAllDepositInfo();
    getAllReferral();

    getAllBalanceOf().then((allBalance)=>{
      let oldAllBalance = allBalance.map(item=>parseInt(item)/1000000);
      setBalances(oldAllBalance);
      setDownloadState(prev=>prev+1);
    });
    getAllWallets().then((allWallets)=>{
      setWallets(allWallets);
      setDownloadState(prev=>prev+1);
    });
    getAllActiveWithDraw().then((allActiveWithDraw)=>{
      let oldAllActiveWithDraw = allActiveWithDraw.map(item=>parseInt(item)/1000000);
      setdAllActiveWithDraw(oldAllActiveWithDraw);
      setDownloadState(prev=>prev+1);
    });
    getAllProfit().then((allProfit)=>{
      let oldAllProfit = allProfit.map(item=>parseInt(item)/1000000);
      setProfits(oldAllProfit);
      setDownloadState(prev=>prev+1);
    });
    // let oldAllBalance = allBalance.map(item=>parseInt(item)/1000000);
    // let oldAllActiveWithDraw = allActiveWithDraw.map(item=>parseInt(item)/1000000);
    // let oldAllProfit = allProfit.map(item=>parseInt(item)/1000000);

    // setBalances(oldAllBalance);
    // setdAllActiveWithDraw(oldAllActiveWithDraw);
    // setWallets(allWallets);
    // setProfits(oldAllProfit);
    setRefresh(false);
    
  }
  useEffect(()=>{
    if(downloadState == 4){
      setLoading(false);
      setDownloadState(0);
    }
  },[downloadState])
  return(
          <BlockchainContext.Provider value={{
            allInvestors,
            wallets,
            allBalances,
            allProfits,
            allWithdraw,
            allDeposit,
            allActiveWithDraw,
            allReferral,
            refresh,
            setRefresh,
            loading,
            tronPrice,
            usdtPrice,
          }}>
            {props.children}
          </BlockchainContext.Provider>

    )
}

export {BlockchainContext};
export default BlockchainProvider;
