import react, { useCallback, useEffect } from 'react';
import './index.css';
import { Row, Col, Button } from 'antd';
import { HiUserGroup } from "react-icons/hi";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { GiCoins } from "react-icons/gi";
import { RiHandCoinFill } from "react-icons/ri";
import Fade from 'react-reveal/Fade';

function LiveData(props) {
    useEffect(()=>{
        console.log("length",props.withdraw.length)
    },[])

    const clock = useCallback(()=>{
        const releaseDate = new Date('2/14/2022');
        const nowDate = Date.now();
        const diffTime = Math.abs(nowDate - releaseDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays; 
    },[])
  return (
    <Row>
        <Col span={24} className='mt-24 text-center text-xs md:text-base'>
            <p className='text-white text-3xl'>LIVE STATISTICS</p>
            <Row className='mt-8'>
                
                <Col xs={{span:12}} md={{span:6}} className='text-white bg-neutral-900 py-2  bg-neutral-800'>
                    <IoCalendarNumberSharp size={40} className='inline-block text-yellow-300'/>
                    <p>ONLINE DAYS : {clock()}</p>
                </Col>
                <Col xs={{span:12}} md={{span:6}} className='text-white bg-neutral-900 py-2 bg-neutral-800'>
                    <HiUserGroup size={40} className='inline-block text-yellow-300'/>
                    <p>TOTAL ACCOUNTS : {props.totalInvestors}</p>
                </Col>
                <Col xs={{span:12}} md={{span:6}} className='text-white bg-neutral-900 py-2 bg-neutral-800' >
                    <GiCoins size={40} className='inline-block text-yellow-300'/>
                    <p>TOTAL DEPOSITS : {`$${Number(props.totalBalance).toFixed(5)}`}</p>
                </Col>
                <Col xs={{span:12}} md={{span:6}} className='text-white bg-neutral-900 py-2 bg-neutral-800'>
                    <RiHandCoinFill size={40} className='inline-block text-yellow-300'/>
                    <p>TOTAL WITHDRAWALS : {`$${Number(props.totalWithdrawns).toFixed(5)}`}</p>
                </Col>
            </Row>
            <Row className='mt-4'>
                
                <Col xs={{span:12}} md={{span:6}}className='p-4 text-white '>
                    <Row >
                        <Col span={24} className=' bg-neutral-900'>
                            <p className='text-center bg-yellow-300 p-4 text-black rounded-t-lg'>TOP INVESTORS</p>
                            {
                                props.balance.map((item,idx)=>(
                                    idx < 6&&
                                    <Fade key={idx}>
                                        <Row className='p-4 border-b-2 border-gray-500' >   
                                            <Col span={12}className='text-left'>{item.name}</Col>
                                            <Col span={12}className='text-right'>{`$${Number(item.balance).toFixed(5)}`}</Col>
                                        </Row>
                                    </Fade>
                                ))
                            }
                        </Col>
                        
                    </Row>
                </Col>

                <Col xs={{span:12}} md={{span:6}} className='p-4 text-white '>
                    <Row >
                        <Col span={24} className=' bg-neutral-900'>
                        
                            <p className='text-center bg-yellow-300 p-4 text-black rounded-t-lg'>TOP REFERRALS</p>
                            {
                                props.refferal.map((item,idx)=>(
                                    idx < 6&&
                                    <Fade key={idx}>
                                        <Row className='p-4 border-b-2 border-gray-500' >   
                                            <Col span={8}className='text-left'>{item.firstname}</Col>
                                            <Col span={8}className='text-center'>{item.referral}</Col>
                                            <Col span={8}className='text-right'>{`$${Number(item.referralamount).toFixed(5)}`}</Col>
                                        </Row>
                                    </Fade> 
                                ))
                            }  
                        </Col>
                        
                    </Row>
                </Col>

                <Col xs={{span:12}} md={{span:6}} className='p-4 text-white '>
                    <Row >
                        <Col span={24} className=' bg-neutral-900'>
                        
                            <p className='text-center bg-yellow-300 p-4 text-black rounded-t-lg'>LAST DEPOSITS</p>
                            {
                                props.deposit.map((item,idx)=>(
                                    idx < 6&&
                                    <Fade key={idx}>
                                        <Row className='p-4 border-b-2 border-gray-500 ' >
                                            <Col span={8} className='text-left'>
                                                <span>{item.name}</span>
                                            </Col>
                                            <Col span={8} className='text-center'>
                                                <span>{`$${Number(item.amount).toFixed(5)}`}</span>
                                            </Col>
                                            <Col span={8} className='text-right'>
                                                <span>{item.date}</span>
                                            </Col>
                                        </Row>
                                    </Fade>
                                ))
                            }
                        </Col>
                        
                    </Row>
                </Col>

                <Col xs={{span:12}} md={{span:6}} className='p-4 text-white '>
                    <Row >
                        <Col span={24} className=' bg-neutral-900'>
                        
                            <p className='text-center bg-yellow-300 p-4 text-black rounded-t-lg'>LAST WITHDRAWAL</p>
                            {
                                props.withdraw.map((item,idx)=>(
                                    idx < 6&&
                                    <Fade key={idx}>
                                        <Row className='p-4 border-b-2 border-gray-500 ' >   
                                            <Col span={8} className='text-left'>
                                                <span>{item.name}</span>
                                            </Col>
                                            <Col span={8} className='text-center'>
                                                <span>{`$${Number(item.amount).toFixed(5)}`}</span>
                                            </Col>
                                            <Col span={8} className='text-right'>
                                                <span>{item.date}</span>
                                            </Col>
                                        </Row>
                                    </Fade>
                                ))
                            } 
                        </Col>
                        
                    </Row>
                </Col>

            </Row>
        </Col>
    </Row>
  );
}

export default LiveData;
