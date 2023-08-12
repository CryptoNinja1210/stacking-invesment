import react, { useState } from 'react';
import './index.css';
import { Row, Col, Button } from 'antd';
import { AiFillCheckCircle, AiFillCalculator } from "react-icons/ai";

const users = [
    {name:'goosep', deposit:'$24235.72'},
    {name:'goosep', deposit:'$24235.72'},
    {name:'goosep', deposit:'$24235.72'},
    {name:'goosep', deposit:'$24235.72'},
    {name:'goosep', deposit:'$24235.72'},
    {name:'goosep', deposit:'$24235.72'}
]

function Plan(props) {

  const [amount, setAmount] = useState(0);
  const [daily, setDaily] = useState(0);
  const [weekly, setWeekly] = useState(0);
  const [monthly, setMonthly] = useState(0);
  const [yearly, setYearly] = useState(0);

  const calulatePlan = (value)=>{
    let oldDeposit = Number(value);
    let deposit = Number(value);
    let profit = 0;
    for(let i=0; i<365; i++){

      if(profit >= oldDeposit){
        if(deposit >= 5000){
          profit += deposit * 3 / 100;
          deposit += deposit * 3 / 100;
        }  
        else
        {
          profit += deposit * 2 / 100;
          deposit += deposit * 2 / 100;
        }
          
      }
      else{
        if(deposit >= 5000){
          profit += deposit * 6 / 100;
        }  
        else
        {
          profit += deposit * 4 / 100;
        }

      }

      if(i==0)
        setDaily(profit.toFixed(5));
      if(i==6)
        setWeekly(profit.toFixed(5));
      if(i==30)
        setMonthly(profit.toFixed(5));
      if(i==364)
        setYearly(profit.toFixed(5));

    }

  }

  const checkNumber = value => {
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      return true;
    }
    return false;
  }

  const amountChange = (e)=>{
    if(checkNumber(e.target.value)){
      setAmount(e.target.value);
      calulatePlan(e.target.value);
    }
      
  }
  return (
    <Row ref={props.plan}>
        <Col span={24} className='mt-24 text-center'>
            <p className='text-white text-3xl'>PLANS</p>
            <Row className='mt-8 mx-4' >
                <Col xs={{span:24}} md={{span:12}} offset={0} className='bg-neutral-900 rounded-t-lg p-2'>
                    <Row className='flex justify-center items-center  border-b-2 border-gray-300 py-2'>
                      <img src="/assets/img/coinset1.png" className='w-1/5 '/>
                      <span className='text-yellow-300 text-xl mt-2 mx-4 font-bold'>PLAN1</span>
                    </Row>
                    <Row className='mt-2 px-4'>
                        <Col span={5} className='block '>
                          <p className='p-4 bg-yellow-300 rounded-lg text-xl font-bold'>4 %</p>
                        </Col>
                        <Col span={10} className='flex items-center justify-center text-white text-lg'>
                          <p>Deposit Once<br/> Earn Meta Tron Forever</p>
                        </Col>
                        <Col span={9} className='flex items-center  text-left text-white'>
                          <Row>
                            <Col span={24}>
                            <AiFillCheckCircle size={15} className='inline-block text-yellow-300 mr-1'/>
                            <span>Min Deposit</span>
                            <span className='ml-4 text-yellow-300'>$20</span><br/>
                            <AiFillCheckCircle size={15} className='inline-block text-yellow-300 mr-1'/>
                            <span>Max Deposit</span>
                            <span className='ml-4 text-yellow-300'>$4999</span>
                            </Col>
                            
                          </Row>
                        </Col>
                    </Row>
                </Col>

                <Col xs={{span:24}} md={{span:12}} offset={0} className='bg-neutral-900 rounded-t-lg p-2'>
                    <Row className='flex justify-center items-center  border-b-2 border-gray-300 py-2'>
                      <img src="/assets/img/coinset2.png" className='w-1/5 '/>
                      <span className='text-yellow-300 text-xl mt-2 mx-4 font-bold'>PLAN2</span>
                    </Row>
                    <Row className='mt-2 px-4'>
                        <Col span={5} className='block '>
                          <p className='p-4 bg-yellow-300 rounded-lg text-xl font-bold'>6 %</p>
                        </Col>
                        <Col span={10} className='flex items-center justify-center text-white text-lg'>
                          <p>Deposit Once<br/> Earn Meta Tron Forever</p>
                        </Col>
                        <Col span={9} className='flex items-center  text-left text-white'>
                          <Row>
                            <Col span={24}>
                            <AiFillCheckCircle size={15} className='inline-block text-yellow-300 mr-1'/>
                            <span>Min Deposit</span>
                            <span className='ml-4 text-yellow-300'>$5000</span><br/>
                            <AiFillCheckCircle size={15} className='inline-block text-yellow-300 mr-1'/>
                            <span>Max Deposit</span>
                            <span className='ml-4 text-yellow-300'>infinite</span>
                            </Col>
                            
                          </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>


            <Row className='mx-4 items-center bg-neutral-900 mt-8'>
                <Col xs={{span:8}} md={{span:4}}>
                  <p className='p-1 md:p-4 bg-yellow-300'><AiFillCalculator size={35} className='inline-block'/> CALCULATE PROFIT</p>
                </Col>
                <Col xs={{span:15, offset:1}} md={{span:4, offset:1}} className=''>
                  <input type='text' value = {amount} onChange={amountChange} placeholder='Enter Amount' className='text-white p-2 text-lg h-full w-full bg-transparent outline rounded-lg border  border-yellow-300 focus:border-white'/>
                </Col>
                <Col xs={{span:24}} md={{span:15}} className='flex flex-wrap items-center justify-around'>
                  
                    <Col xs={{span:12}} md={{span:5}} className='mt-2  bg-yellow-300 px-4 py-1 rounded-lg mx-2'>
                      <p>Daily Profit</p>
                      <p className=' font-bold'>{daily}</p>
                    </Col>

                    <Col xs={{span:12}} md={{span:5}} className='mt-2  bg-yellow-300 px-4 py-1 rounded-lg mx-2'>
                      <p>Weekly Profit</p>
                      <p className=' font-bold'>{weekly}</p>
                    </Col>

                    <Col xs={{span:12}} md={{span:5}} className='mt-2  bg-yellow-300 px-4 py-1 rounded-lg mx-2'>
                      <p>Monthly Profit</p>
                      <p className=' font-bold'>{monthly}</p>
                    </Col>

                    <Col xs={{span:12}} md={{span:5}} className='mt-2 bg-yellow-300 px-4 py-1 rounded-lg mx-2'>
                      <p>Yearly Profit</p>
                      <p className=' font-bold'>{yearly}</p>
                    </Col>
                 
                </Col>
            </Row>
        </Col>
    </Row>
  );
}

export default Plan;
