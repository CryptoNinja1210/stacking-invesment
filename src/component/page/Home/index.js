import './index.css';
import { Routes, Route, Link, Navigate, useParams } from "react-router-dom";
import Header from '../../components/Header';
import VideoView from '../../components/VideoView';
import TitleView from '../../components/TitleView';
import CoinSet from '../../components/CoinSet';
import LiveData from '../../components/LiveData';
import Plan from '../../components/Plan';
import Footer from '../../components/Footer';
import HelpService from '../../components/HelpServices';
import Howwork from '../../components/Howwork';
import CustomParticles from '../../components/CustomParticles';
import { useContext, useEffect, useState, useRef} from 'react';
import {BlockchainContext} from '../../Provider/blockchainProvider';
import Loading from '../../components/Loading';
import {walletCompare} from '../../../utils/tronBlockchain';

const initInvestor = {
  name : 'none',
  amount : 0
}
const initData = {
  name : 'none',
  amount : 0,
  date : '00/00/00 00:00:00'
}
const initReferral = {
  firstname : 'none',
  referral : 0,
  referralamount : 0
}
function Home() {
  const data = useContext(BlockchainContext);
  const [withdraw, setWithdraw] = useState([initData]);
  const [deposit, setDeposit] = useState([initData]);
  const [balance, setBalance] = useState([initInvestor]);
  const [refferal, setRefferal] = useState([initReferral]);
  const [totalInvestors, setTotalInvestors] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalWithdrawns, setTotalWithdrawns] = useState(0);
  const [loading, setLoading] = useState(true);
  const routerParams = useParams();

  const plan = useRef();
  const gotoplan = ()=>plan.current.scrollIntoView({ behavior: 'smooth' });

  useEffect(()=>{
    
    if(routerParams.wallet){
      localStorage.removeItem("affiliate");
      localStorage.setItem("affiliate", JSON.stringify({wallet : routerParams.wallet, referralid : routerParams.userid, base58 : routerParams.base58}))
    }
  },[])
  useEffect(()=>{

    setLoading(data.loading);
    if(data.loading)
      return;
    if(data.allInvestors.length)
      setTotalInvestors(data.allInvestors.length);

      ////////lastest Withdraw/////////////
    if(data.allWithdraw.length > 0)
    {
      let oldWithdraw = [];
      data.allWithdraw.map(index=>{
        let name = data.allInvestors.filter(item=>item.id === index.userid)[0].firstname;
        oldWithdraw.push({
          name : name,
          date : index.date,
          amount : index.amount
        })
      })
      setWithdraw(oldWithdraw);
    }
    /////////latest Deposit//////////////
    if(data.allDeposit.length > 0)
    {
      let oldDeposit = [];
      data.allDeposit.map(index=>{
        let name = data.allInvestors.filter(item=>item.id === index.userid)[0].firstname;
        oldDeposit.push({
          name : name,
          date : index.date,
          amount : index.amount
        })
      })
      setDeposit(oldDeposit);
    }

    if(data.wallets.length > 0){
      let investorInfo = [];
      let oldTotalBalance = 0;
      let oldTotalWithdrawns = 0;
      for(let i=0; i<data.wallets.length; i++){
        oldTotalBalance += data.allBalances[i];
        oldTotalWithdrawns +=data.allProfits[i] - data.allActiveWithDraw[i];
        let walletOwner = data.allInvestors.filter(item=>walletCompare(item.wallet, data.wallets[i]));
        investorInfo.push({
          name : walletOwner.length > 0 ? walletOwner[0].firstname : 'unknown',
          balance : data.allBalances[i],
          profit : data.allProfits[i],
        })
      }
      
      setTotalBalance(oldTotalBalance);
      setTotalWithdrawns(oldTotalWithdrawns);
      
      ///////////sortByBalance////////////////
      console.log(investorInfo);
      if(investorInfo.length > 0){
        let sortFn1 = (obj1 , obj2) => { return obj2.balance - obj1.balance; }
        let sortedArray1 = investorInfo.sort(sortFn1);
        setBalance(sortedArray1.slice(0,10));
      }
      

      ///////////sortByProfit////////////////
      if(data.allReferral.length > 0){
        let sortFn2 = (obj1 , obj2) => { return obj2.referral - obj1.referral; }
        let sortedArray2 = data.allReferral.sort(sortFn2);
        console.log("referrals", sortedArray2);
        setRefferal(sortedArray2.slice(0,10));
      }
      
      
    }
  },[data.loading])

  return (
    <>
    {
      loading?
        <Loading/>
      :
        <>
          <CustomParticles/>
          <Header gotoplan = {gotoplan} />
          <VideoView/>
          <TitleView/>
          <Howwork/>
          <HelpService/>
          <CoinSet tron = {data.tronPrice} usdt = {data.usdtPrice}/>
          <LiveData 
            withdraw = {withdraw} 
            deposit = {deposit} 
            balance= {balance}
            refferal = {refferal}
            totalInvestors = {totalInvestors}
            totalBalance = {totalBalance}
            totalWithdrawns = {totalWithdrawns}/>
          <Plan plan = {plan}/>
          
          
          <Footer/>
        </>
    }
      
    </>
  );
}

export default Home;
