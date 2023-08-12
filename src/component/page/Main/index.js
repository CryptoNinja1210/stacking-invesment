import './index.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import NotificationBox from '../../components/NotificationBox';
import Balance from '../../components/Balance';
import AccountStatistic from '../../components/AccountStatistic';
import { Routes, Route, Link, Navigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import {MyInfoContext} from '../../Provider/myInfoProvider';
import {BlockchainContext} from '../../Provider/blockchainProvider';
import TransactionView from '../../components/TransactionView';
import BonusView from '../../components/BonusView';
import AffiliateView from '../../components/AffiliateView';
import ProfileView from '../../components/ProfileView';
import CustomParticles from '../../components/CustomParticles';
import Loading from '../../components/Loading';
import openNotification from '../../components/notification';





function Main() {
  const [goback, setGoback] = useState(false);
  const [userInfo, setUserInfo] = useState({})
  const [step, setStep] = useState(0);
  const data = useContext(MyInfoContext);
  const blockchainData = useContext(BlockchainContext);


  

  useEffect(()=>{
    
    if(!localStorage.getItem("userInfo") && !localStorage.getItem("jwtToken"))
      setGoback(true);
    else
      setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
    
    data.checkedWallet().then((result)=>{
      if(result == 0)
        openNotification(null,"Invalid wallet address", `Switch your TronLink account, your wallet address is ${JSON.parse(localStorage.getItem("userInfo")).base58}`, false, null);
      if(result == -1)
        openNotification(null,"TronLink not detected", `please connect TronLink`, false, null); 
    });

    data.setRefresh(true);
  },[])
  
  useEffect(()=>{
    if(data.error){
      openNotification(1.5,"Failed", "you are not permitted! please login again.", false, ()=>{
        localStorage.removeItem("userInfo");
        localStorage.removeItem("jwtToken");
        setGoback(true);
        data.setError(false);
      })   
    }  
  },[data.error])

  const refresh = ()=>{
    data.setRefresh(true);
    blockchainData.setRefresh(true);
  }
  return (
    <>
    {
      goback?
        <Navigate to='/'/>
      :
      data.loading?
        <Loading/>
      :
      <>
        <CustomParticles/>
        <Header/>
        <NavBar setStep = {setStep}/>
        
        
        {
          step == 0?
          <>
            <NotificationBox 
              userName = {`${userInfo.firstname} ${userInfo.lastname}`}
              message={data.myNotification[data.myNotification.length-1].message}/>
            <Balance 
              balance = {data.myBalance} 
              activeWithdraw = {data.myActiveBalance}
              myWalletBalance = {data.walletBalance}
              depositTRX = {data.depositTRX}
              depositUSDT = {data.depositUSDT}
              withdrawTRX = {data.withdrawTRX}
              withdrawUSDT = {data.withdrawUSDT}
              addNotification = {data.addNotification}
              addWithdraw = {data.addWithdraw}
              addDeposit = {data.addDeposit}
              addTransaction = {data.addTransaction}
              refresh = {refresh}
              tronPrice = {blockchainData.tronPrice}
              usdtPrice = {blockchainData.usdtPrice}
              checkedWallet = {data.checkedWallet}
              getRole = {data.getRole}
              depositTronByGuest = {data.depositTronByGuest}
              depositUsdtByGuest = {data.depositUsdtByGuest}
              addRefferal = {data.addRefferal}
              getInsuranceLock = {data.getInsuranceLock}
              getTransactionInfo = {data.getTransactionInfo}/>
            <AccountStatistic 
              balance = {data.myBalance} 
              profit = {data.myProfit} 
              activeWithdraw = {data.myActiveBalance}
              withdrawDate = {data.myWithdrawDate[data.myWithdrawDate.length-1]}
              depositDate = {data.myDepositDate[data.myDepositDate.length-1]}/>
          </>
          :step == 1?
          <TransactionView mytransactions = {data.myTransaction}/>
          :step == 2 ?
          <ProfileView setRefresh = {()=>{data.setRefresh(true);setStep(0)}}/>
          :step == 3 ?
          <AffiliateView />
          :<BonusView/>


        }
        
        <Footer/>
      </>
    }
      
    </>
  );
}

export default Main;
