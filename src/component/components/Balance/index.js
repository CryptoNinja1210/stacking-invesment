import react, { useState, useEffect } from 'react';
import './index.css';
import { Row, Col, Button } from 'antd';
import {YellowButton, WhiteButton, InActiveButton} from '../Buttons';
import ConfrimModal from '../../components/ConfirmModal';
import openNotification from "../notification";

function Balance(props) {
    const [modalShow, setModalShow] = useState(false);
    const [selToken, setSelToken] = useState(0);
    const [tokenAction, setTokenAction] = useState(0);
    const [amount , setAmount] = useState(0);
    const [sendState, setSendState] = useState(0);

    useEffect(()=>{
        if(sendState >= 2){
            props.refresh();
            setSendState(0);
        }
    },[sendState])
    const DepositTRX = ()=>{
        setSelToken(0);
        setTokenAction(0);
        setModalShow(true);
    }
    const DepositUSDT = ()=>{
        setSelToken(1);
        setTokenAction(0);
        setModalShow(true);
    }
    const WithdrawTRX = ()=>{
        setSelToken(0);
        setTokenAction(1);
        setModalShow(true);
    }
    const WithdrawUSDT = ()=>{
        setSelToken(1);
        setTokenAction(1);
        setModalShow(true);
    }
    const checkNumber = value => {
        const reg = /^-?\d*(\.\d*)?$/;
        if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
          return true;
        }
        return false;
      }
    const onSendAmountChange = (e)=>{
        if(checkNumber(e.target.value))
            setAmount(e.target.value);
    }
    const getMyWalletAddress = () => {
        if(localStorage.getItem('userInfo'))
            return JSON.parse(localStorage.getItem("userInfo")).base58;
        return null;
    }
    const getAffiliateWalletAddress = () => {
        if(localStorage.getItem('affiliate'))
            return JSON.parse(localStorage.getItem("affiliate")).base58;
        return null;
    }

  return (
    <Row>
        <Col span={24} className='mt-16 text-center text-white'>
            <p className='text-3xl '>Balance</p>
            <Row className='flex justify-center items-center '>
                <Col xs={{span:20}} md={{span:10}} className='mt-8 border border-white bg-neutral-900 mx-6 rounded-lg'>
                    <p className='p-2 text-black text-lg bg-yellow-300 rounded-t-lg'>TRON (TRX)</p>
                    <p className='mt-8 text-white text-lg '>{`1 TRX = $${props.tronPrice.price1}`}</p>
                    <p className='mt-2 text-white text-lg '> Available to Withdraw : {`${(props.activeWithdraw / props.tronPrice.price1).toFixed(5)} TRX`}</p>
                    <p className='mt-2 text-white  '> Available to Withdraw (with USD): {`$${props.activeWithdraw}`}</p>
                    <Row className='my-8'>
                        <Col span={10} offset={1}>
                            <YellowButton onClick = {DepositTRX}>Deposit</YellowButton>
                        </Col>
                        <Col span={10} offset={2}>
                            <WhiteButton onClick = {WithdrawTRX}>Withdraw</WhiteButton>
                        </Col>
                    </Row>
                </Col>
                <Col xs={{span:20}} md={{span:10}} className='mt-8 border border-white bg-neutral-900 mx-6 rounded-lg'>
                    <p className='p-2 text-black text-lg bg-yellow-300 rounded-t-lg'>Tether (USDT)</p>
                    <p className='mt-8 text-white text-lg '>{`1 USDT = $${props.usdtPrice.price1}`}</p>
                    <p className='mt-2 text-white text-lg '> Available to Withdraw : {`${(props.activeWithdraw / props.usdtPrice.price1).toFixed(5)} USDT`}</p>
                    <p className='mt-2 text-white  '> Available to Withdraw (with USD): {`$${props.activeWithdraw}`}</p>
                    <Row className='my-8'>
                        <Col span={10} offset={1}>
                            <YellowButton onClick = {DepositUSDT}>Deposit</YellowButton>
                        </Col>
                        <Col span={10} offset={2}>
                            {/* <WhiteButton onClick = {WithdrawUSDT}>Withdraw</WhiteButton> */}
                            <InActiveButton>Withdraw</InActiveButton>
                        </Col>
                    </Row>
                </Col>
            </Row>
            
            
        </Col>


        <ConfrimModal title = {`${tokenAction == 0 ? 'DEPOSIT' : 'WITHDRAW'} ${selToken == 0 ? 'TRX' : 'USDT'}`} visible = {modalShow} close = {()=>setModalShow(false)}>
            <Row>
                <Col span={22} offset={1}>
                    {`Available amount ${tokenAction == 0 ? (selToken == 0 ? props.myWalletBalance[0] : props.myWalletBalance[1]) : (selToken == 0 ? (props.activeWithdraw / props.tronPrice.price1).toFixed(5) : (props.activeWithdraw / props.usdtPrice.price1).toFixed(5))}`}
                    <p>"Please ensure you have enough Energy & Bandwidth for the transaction"</p>
                </Col>
                <Col span={22} offset={1}>
                    <input value={amount} placeholder={"enter amount here"}  className="text-black text-lg text-center w-full mt-8 border-gray-200 border-2 p-2"onChange={onSendAmountChange} /> 
                </Col>
            </Row>
            <Row className='my-8'>
                <Col span={10} offset={1}>
                    <YellowButton onClick = {async()=>{
                        let result = false ;
                        if(tokenAction == 0 && selToken == 0){
                            if(amount * props.tronPrice.price1 < 21){
                                openNotification(4.5,"Invalid amount", 'You are supposed to deposit at least $20', false, null); 
                                return;
                            }
                            if(amount >= props.myWalletBalance[0]){
                                openNotification(4.5,"Invalid amount", "You don't have enough money.", false, null); 
                                return;
                            }

                            if(JSON.parse(localStorage.getItem('affiliate'))?.wallet && Number(props.balance) <= 0 ){
                                console.log("affiliate");
                                result = await props.depositTronByGuest(amount, getAffiliateWalletAddress()); ////
                                if(!result)
                                    return;
                                props.addTransaction({message : "Deposit TRX", transaction : result});
                                props.getTransactionInfo(result).then((trx)=>{
                                    console.log("result", result);
                                    if(trx){
                                        props.addRefferal(amount * 6 /100 * props.tronPrice.price1);
                                        props.addNotification(`You deposited ${amount} TRX`).then(()=>setSendState(prev=>prev+1)); 
                                        props.addDeposit(amount * props.tronPrice.price1).then(()=>setSendState(prev=>prev+1));
                                        
                                        localStorage.removeItem('affiliate');
                                    }
                                    else{
                                        openNotification(4.5,"Deposit Failed", `Your attempt is failed due to some issues, Check transaction information.`, false, null); 
                                    }
                                    
                                })
                                
                            }
                            else       
                            {
                                console.log("normal");
                                let compareWallet = await props.checkedWallet();
                                if(compareWallet == 0){
                                    openNotification(4.5,"Invalid wallet address", `Switch your Tronlink account, your wallet address is ${JSON.parse(localStorage.getItem("userInfo")).base58}`, false, null); 
                                    return;
                                }
                                
                                result = await props.depositTRX(amount);
                                if(!result)
                                    return;
                                props.addTransaction({message : "Deposit TRX", transaction : result});
                                props.getTransactionInfo(result).then((trx)=>{
                                    console.log("result", trx);
                                    if(trx){
                                        props.addNotification(`You deposited ${amount} TRX`).then(()=>setSendState(prev=>prev+1));
                                        props.addDeposit(amount * props.tronPrice.price1).then(()=>setSendState(prev=>prev+1));
                                    }
                                    else{
                                        openNotification(4.5,"Deposit Failed", `Your attempt is failed due to some issues, Check transaction information.`, false, null); 
                                    }
                                            
                                })
                            }
                            
                            
                            
                             
                        }   
                        if(tokenAction == 0 && selToken == 1){
                            if(amount * props.usdtPrice.price1 < 21){
                                openNotification(4.5,"Invalid amount", 'You are supposed to deposit at least $20', false, null); 
                                return;
                            }
                            if(amount > props.myWalletBalance[1]){
                                openNotification(4.5,"Invalid amount", "You don't have enough money.", false, null); 
                                return;
                            }
                            if(JSON.parse(localStorage.getItem('affiliate'))?.wallet && Number(props.balance) <= 0){
                                result = await props.depositUsdtByGuest(amount, getAffiliateWalletAddress()); ////
                                if(!result)
                                    return;
                                props.addTransaction({message : "Deposit USDT", transaction : result})
                                props.getTransactionInfo(result).then((trx)=>{
                                    console.log("result", trx);
                                    if(trx){
                                        props.addRefferal(amount * 6 /100 * props.usdtPrice.price1);
                                        props.addNotification(`You deposited ${amount} USDT`).then(()=>setSendState(prev=>prev+1));
                                        props.addDeposit(amount * props.usdtPrice.price1).then(()=>setSendState(prev=>prev+1));
                                        localStorage.removeItem('affiliate');
                                    }
                                    else{
                                        openNotification(4.5,"Deposit Failed", `Your attempt is failed due to some issues, Check transaction information.`, false, null); 
                                    }
                                            
                                })
                                
                            }             
                            else{
                                let compareWallet = await props.checkedWallet();
                                if(compareWallet == 0){
                                    openNotification(4.5,"Invalid wallet address", `Switch your Tronlink account, your wallet address is ${JSON.parse(localStorage.getItem("userInfo")).base58}`, false, null); 
                                    return;
                                }
                                result = await props.depositUSDT(amount);
                                if(!result)
                                    return;
                                props.addTransaction({message : "Deposit USDT", transaction : result})
                                props.getTransactionInfo(result).then((trx)=>{
                                    console.log("result", trx);
                                    if(trx){
                                        props.addNotification(`You deposited ${amount} USDT`).then(()=>setSendState(prev=>prev+1));
                                        props.addDeposit(amount * props.usdtPrice.price1).then(()=>setSendState(prev=>prev+1));
                                    }
                                    else{
                                        openNotification(4.5,"Deposit Failed", `Your attempt is failed due to some issues, Check transaction information.`, false, null); 
                                    }
                                            
                                })
                                

                            }
                        }
                            
                        if(tokenAction == 1 && selToken == 0){
                            let insuranceLock = await props.getInsuranceLock();
                            if(!insuranceLock){
                                openNotification(4.5,"Insurance Lock", `Insurance Lock has been enabled. This means you will not be able to withdraw funds until further notice. More information on the Insurance Lock can be found on the FAQ page`, false, null)
                                return;
                            }
                            if(amount > props.activeWithdraw / props.tronPrice.price1){
                                openNotification(4.5,"Invalid amount", `You are not allowed to withdraw ${amount} TRX`, false, null); 
                                return;
                            }
                            result = await props.withdrawTRX(amount);
                            if(!result)
                                return;
                            props.addTransaction({message : "Withdraw TRX", transaction : result}).then(()=>setSendState(prev=>prev+1))
                            props.getTransactionInfo(result).then((trx)=>{
                                console.log("result", trx);
                                if(trx){
                                    props.addNotification(`You withdrew ${amount} TRX`).then(()=>setSendState(prev=>prev+1));
                                    props.addWithdraw((amount * props.tronPrice.price1).toFixed(5)).then(()=>setSendState(prev=>prev+1));
                                }
                                else{
                                    openNotification(4.5,"Withdraw Failed", `Your attempt is failed due to some issues, Check transaction information.`, false, null); 
                                }
                                        
                            })
                            
                        }
                            
                        if(tokenAction == 1 && selToken == 1){
                            let insuranceLock = await props.getInsuranceLock();
                            if(!insuranceLock){
                                openNotification(4.5,"Insurance Lock", `Insurance Lock has been enabled. This means you will not be able to withdraw funds until further notice. More information on the Insurance Lock can be found on the FAQ page`, false, null)
                                return;
                            }
                            if(amount > props.activeWithdraw / props.usdtPrice.price1){
                                openNotification(4.5,"Invalid amount", `You are not allowed to withdraw ${amount} USDT`, false, null); 
                                return;
                            }
                            result = await props.withdrawUSDT(amount);
                            if(!result)
                                return;
                            props.addTransaction({message : "Withdraw USDT", transaction : result}).then(()=>setSendState(prev=>prev+1))
                            props.getTransactionInfo(result).then((trx)=>{
                                console.log("result", trx);
                                if(trx){
                                    props.addNotification(`You withdrew ${amount} USDT`).then(()=>setSendState(prev=>prev+1));
                                    props.addWithdraw((amount * props.usdtPrice.price1).toFixed(5)).then(()=>setSendState(prev=>prev+1));
                                }
                                else{
                                    openNotification(4.5,"Withdraw Failed", `Your attempt is failed due to some issues, Check transaction information.`, false, null); 
                                }
                                        
                            })
                            
                            
                        }
                               
                        setModalShow(false);  
                        
                    }
                    
                    
                    }>Confirm</YellowButton>
                </Col>
                <Col span={10} offset={2}>
                    <WhiteButton onClick = {()=>setModalShow(false)}>Cancel</WhiteButton>
                </Col>
            </Row>
        </ConfrimModal>      
    </Row>
  );
}

export default Balance;
