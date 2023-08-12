import react from 'react';
import { Row, Col, Button } from 'antd';
import {YellowButton, WhiteButton} from '../Buttons';
import { GrMoney } from "react-icons/gr";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { FiClock } from "react-icons/fi";

function AccountStatistic(props) {
  return (
    <Row>
        <Col span={24} className='mt-16 text-center text-white'>
            <p className='text-3xl '>Account Statistic</p>
            <Row className=''>
                <Col xs={{span:20, offset:1}} md={{span:10, offset:1}}className='mt-8'>
                    <Row>
                        <Col span={4} className='text-black p-2 bg-yellow-300 text-center'>
                            <GrMoney size={30} className='inline-block'/>
                        </Col>
                        <Col span={20} className='flex items-center justify-between bg-neutral-900 p-2'>
                            <span>Total Earned</span>
                            <span>{`$${Number(props.profit).toFixed(5)}`}</span>
                        </Col>
                    </Row>
                    <Row className='mt-8'>
                        <Col span={4} className='text-black p-2 bg-yellow-300 text-center'>
                            <GiPayMoney size={30} className='inline-block'/>
                        </Col>
                        <Col span={20} className='flex items-center justify-between bg-neutral-900 p-2'>
                            <span>Total Deposit</span>
                            <span>{`$${Number(props.balance).toFixed(5)}`}</span>
                        </Col>
                    </Row>
                    <Row className='mt-8'>
                        <Col span={4} className='text-black p-2 bg-yellow-300 text-center'>
                            <GiReceiveMoney size={30} className='inline-block'/>
                        </Col>
                        <Col span={20} className='flex items-center justify-between bg-neutral-900 p-2'>
                            <span>Total Withdrawn</span>
                            <span>{`$${Number(props.profit - props.activeWithdraw).toFixed(5)}`}</span>
                        </Col>
                    </Row>
                </Col>
                <Col xs={{span:20, offset:1}} md={{span:10, offset:2}}  className='mt-8'>
                    <Row>
                        <Col span={4} className='text-black p-2 bg-yellow-300 text-center'>
                            <GrMoney size={30} className='inline-block'/>
                        </Col>
                        <Col span={20} className='flex items-center justify-between bg-neutral-900 p-2'>
                            <span>Available to Withdraw</span>
                            <span>{`$${Number(props.activeWithdraw).toFixed(5)}`}</span>
                        </Col>
                    </Row>
                    <Row className='mt-8'>
                        <Col span={4} className='text-black p-2 bg-yellow-300 text-center'>
                            <FiClock size={30} className='inline-block'/>
                        </Col>
                        <Col span={20} className='flex items-center justify-between bg-neutral-900 p-2'>
                            <Col span={8} className='text-left'>
                                <span>Last Deposit</span>
                            </Col>
                            <Col span={8} className='text-center'>
                                <span>{`$${props.depositDate.amount?Number(props.depositDate.amount).toFixed(5):0}`}</span>  
                            </Col>
                            <Col span={8} className='text-right'>
                                <span>{props.depositDate.date}</span>
                            </Col>
                        </Col>
                    </Row>
                    <Row className='mt-8'>
                        <Col span={4} className='text-black p-2 bg-yellow-300 text-center'>
                            <FiClock size={30} className='inline-block'/>
                        </Col>
                        <Col span={20} className='flex items-center justify-between bg-neutral-900 p-2'>

                            <Col span={8} className='text-left'>
                                <span>Last Withdrawal</span>
                            </Col>
                            <Col span={8} className='text-center'>
                                <span>{`$${props.withdrawDate.amount?Number(props.withdrawDate.amount).toFixed(5):0}`}</span>
                            </Col>
                            <Col span={8} className='text-right'>
                                <span>{props.withdrawDate.date}</span>
                            </Col>
                        </Col>
                    </Row>
                </Col>
               
            </Row>
            
            
        </Col>
    </Row>
  );
}

export default AccountStatistic;
