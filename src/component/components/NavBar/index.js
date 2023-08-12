import react from 'react';
import './index.css';
import { Row, Col, Button } from 'antd';
import { AiFillCheckCircle, AiFillCalculator } from "react-icons/ai";


function Plan(props) {
  return (
    <Row>
        <Col span={24} className=' text-center text-white'>
            <Row>
                <Col span={6}>
                    <p className='p-2 bg-yellow-300 text-black'>Dashboard</p>
                </Col>
                <Col span={3}>
                    <p onClick = {()=>props.setStep(0)} className='cursor-pointer p-2 bg-neutral-900 bg-neutral-800 border-r border-yellow-300 hover:bg-neutral-800'>Deposit</p>
                </Col>
                <Col span={3}>
                    <p onClick = {()=>props.setStep(0)} className='cursor-pointer p-2 bg-neutral-900 bg-neutral-800 border-r border-yellow-300 hover:bg-neutral-800'>Withdraw</p>
                </Col>
                <Col span={3}>
                    <p onClick = {()=>props.setStep(2)} className='cursor-pointer p-2 bg-neutral-900 bg-neutral-800 border-r border-yellow-300 hover:bg-neutral-800'>Profile</p>
                </Col>
                <Col span={3}>
                    <p onClick = {()=>props.setStep(1)} className='cursor-pointer p-2 bg-neutral-900 bg-neutral-800 border-r border-yellow-300 hover:bg-neutral-800'>Transactions</p>
                </Col>
                <Col span={3}>
                    <p onClick = {()=>props.setStep(3)} className='cursor-pointer p-2 bg-neutral-900 bg-neutral-800 border-r border-yellow-300 hover:bg-neutral-800'>Affiliate</p> 
                </Col>
                <Col span={3}>
                    <p onClick = {()=>props.setStep(4)} className='cursor-pointer p-2 bg-neutral-900 bg-neutral-800  hover:bg-neutral-800'>Bonus</p>  
                </Col>
            </Row>
        </Col>
    </Row>
  );
}

export default Plan;
