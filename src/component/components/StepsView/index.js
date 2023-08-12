import react, {useState, useRef, useEffect} from 'react';
import { Link} from "react-router-dom";
import './index.css';
import { Row, Col} from 'antd';
import { useParams, Navigate } from "react-router-dom";
import { BsArrowUpCircle, BsArrowDownCircle } from "react-icons/bs";

function StepsView() {
    const routeParams = useParams();
    const form1 = useRef();
    const form2 = useRef();
    const form3 = useRef();
    useEffect(()=>{
        const id = routeParams.id;
        console.log(id);
        if(id === '0')
            form1.current.scrollIntoView({ behavior: 'smooth' });
        if(id === '1')
            form2.current.scrollIntoView({ behavior: 'smooth' });
        if(id === '2')
            form3.current.scrollIntoView({ behavior: 'smooth' });
    },[])
    return (
        
        <Row className='min-h-screen'>
            <Col span={24}>
                <Row>
                    <Col span={24} className='text-center mt-16 bg-yellow-300 p-4'>
                        <p className='text-2xl md:text-3xl'>How to Join?</p>
                    </Col>

                    <Col ref = {form1} span={22} offset={1} className='bg-neutral-900 mt-8 text-white p-8'>
                        <Row className='mb-4 cursor-pointer flex justify-between items-center'>
                            
                            <Col span={21}>
                                <a className='text-base md:text-xl text-yellow-200 hover:text-yellow-100 my-4 '>Step1</a>
                            </Col>
                            <Col span={2} offset={1} className='text-right'>
                                
                            </Col>
                            
                            
                        </Row>
                        
                            TronLink Pro is a digital wallet where you can hold and store Tron or USDT.<br/>
                            As MetaTron is a Smart Contract on the Tron blockchain, to join, you have to use the Tron or USDT (TRC20) crypto currency. The first step is to create a wallet where you can hold and store Tron. This wallet is unique to you and will be the location where you will send and receive Tron from MetaTron. <br/>  
                            TronLink Pro is safe and secure and is recommended for use by the Tron Foundation.<br/>
                            TronLink Pro is available as a desktop extension as well as a mobile application. This means that it can be used on a PC, Laptop, as well as a mobile device (Android or iOS).<br/>
                            In order to use it on a PC or laptop, you have to use the Google Chrome Internet browser.<br/>

                        <Row>
                            <Col span={23} offset={1} >
                                1. Click on the following link and download the Chrome extension.
                                <Row className='p-4'>
                                    <a target='_blank' href='https://chrome.google.com/webstore/detail/tronlink%EF%BC%88%E6%B3%A2%E5%AE%9D%E9%92%B1%E5%8C%85%EF%BC%89/ibnejdfjmmkpcnlpebklmnkoeoihofec'>download Chrome Extension</a>
                                </Row>
                                2. Once Installed, on the top right of your Google Chrome browser, click on the “Extensions” icon and pin the TronLink Pro application so that it always appears as a shortcut on your browser.
                                <Row className='p-4'>
                                    <img src='/assets/img/cantlogin.jpg'/>
                                </Row>
                                3. Next click on the icon and create a new account.
                                <Row className='p-4'>
                                    <span className="font-bold">Important</span>: Please take a note of the password as this cannot be recovered if forgotten
                                </Row>
                                4. Next click on Create Wallet.
                                <Row className='p-4'>
                                    <Col span={24}>
                                        <p>Enter a Wallet Name. This can be anything that you like i.e., MetaTron</p>
                                        <img src='/assets/img/cantlogin2.jpg' className='block'/>
                                    </Col>
                                </Row>
                                5. You will then be presented with your mnemonic phrase. Please take a note of this phrase and write it down. 
                                <Row className='p-4'>
                                    <Col span={24}>
                                        <span className="font-bold">Important</span>:  In order to recover your wallet in the future you will need this mnemonic phrase so please store it somewhere safe. <span className="font-bold">Do not lose the 12 words</span><br/> 
                                        <img src='/assets/img/cantlogin3.jpg' className='block'/>
                                    </Col>
                                </Row>
                                6. Once you press continue, you will be prompted to re-enter the phrase in the same order as you see it on the screen.
                                <Row className='p-4'>
                                    <Col span={24}>
                                        <img src='/assets/img/cantlogin4.jpg'/><br/>
                                        Once entered correctly, you can press confirm and then your wallet is created<br/>
                                        <span className="font-bold">Important</span>: It is good practice to keep a record of your wallet ID and your private key in case you need to recover your account in the future.
                                    </Col>   
                                </Row>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <p className = 'text-base md:text-xl'>MOBILE</p>
                                TronLink Pro also have a mobile application. Once you download the app from Google Play Store or the Apple App Store, the process to create a wallet is the same. Follow the instructions and take note of the mnemonic phrase and private key<br/>
                                To login in via your mobile, you have to use the TronLink Pro mobile app. <br/>
                                Download the app via Google Play Store or the Apple App Store. Once logged in, click on DApps and enter the URL<a href='_blank' href='www.metatron.biz'>www.metatron.biz</a>  <br/>
                                Your wallet will now be linked to your account, and you will be able to login successfully.
                            </Col>
                           
                        </Row>
                    </Col>
                    <Col ref = {form2} span={22} offset={1} className='bg-neutral-900 mt-8 text-white p-8'>
                        <Row className='mb-4 cursor-pointer flex justify-between items-center'>
                            
                            <Col span={21}>
                                <a className='text-base md:text-xl text-yellow-200 hover:text-yellow-100 my-4 '>Step2</a>
                            </Col>
                            <Col span={2} offset={1} className='text-right'>
                            
                            </Col>
                        </Row>
                        <Col span={24}>
                            There are many places where you buy Tron or USDT (TRC20) using fiat currency such as Binance or Coinbase. <br/>
                            Once funded, you can simply transfer from your Binance or Coinbase wallet to your TronLink Pro wallet.<br/>
                            Important: When transferring USDT to your TronLink Pro wallet, make sure you select the TRC20 network.<br/>
                        </Col>
                    </Col>

                    <Col ref = {form3} span={22} offset={1} className='bg-neutral-900 mt-8 text-white p-8'>
                        <Row className='mb-4 cursor-pointer flex justify-between items-center'>
                            
                            <Col span={21}>
                                <a className='text-base md:text-xl text-yellow-200 hover:text-yellow-100 my-4 '>Step3</a>
                            </Col>
                            <Col span={2} offset={1} className='text-right'>
                            
                            </Col>
                        </Row>
                        <Col span={24}>
                            1. Click on register. During the registration process you will need to enter a code. Press Send and you will receive an email with the code number.<br/>
                            2. Make sure you are logged into the TronLink Pro Chrome extension. You need to log in to TronLink Pro to access the dashboard. 
                        </Col>
                    </Col>
                     
                </Row>
            
            </Col>
        </Row>
        
    
  );
}

export default StepsView;
