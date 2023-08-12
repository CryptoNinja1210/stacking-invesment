import react, {useState} from 'react';
import axios from 'axios';
import './index.css';
import { Row, Col, Button, Form, Input, Checkbox } from 'antd';
import { AiFillCheckCircle, AiFillCalculator } from "react-icons/ai";

function TransactionView(props) {
   
    return (
        
        <Row className='min-h-screen'>
            <Col span={24}>
                <Row>
                    <Col span={24} className='text-center mt-16 p-4'>
                        <p className=' text-3xl text-white'>Transactions</p>
                    </Col>
                    <Col span={22} offset={1} className='text-center text-white p-4 rounded-lg bg-neutral-900 border-yellow-300 border'>
                        <Row className='border-b border-gray-500 pb-2'>
                            <Col span={4} >
                                <p >By</p>
                            </Col>
                            <Col span={8}>
                                <p >Action</p>
                            </Col>
                            <Col span={12}>
                                <p >Transactions</p>
                            </Col>
                        </Row>
                        {
                            props.mytransactions ? 
                            props.mytransactions.map((item, idx)=>(
                                <Row key={idx} className='mt-2'>
                                    <Col span={4} >
                                        <p >You</p>
                                    </Col>
                                    <Col span={8}>
                                        <p >{item.message}</p>
                                    </Col>
                                    <Col span={12}>
                                        <a target='_blank' href={`https://nile.tronscan.org/#/transaction/${item.transaction}`}>{item.transaction}</a>
                                    </Col>
                                </Row> 
                            ))
                            :
                            "none transactions"
                        }
                    </Col>
                </Row>
            
            </Col>
        </Row>
        
    
  );
}

export default TransactionView;
