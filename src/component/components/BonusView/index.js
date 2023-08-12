import react, {useState} from 'react';
import axios from 'axios';
import './index.css';
import { Row, Col, Button, Form, Input, Checkbox } from 'antd';
import { AiFillCheckCircle, AiFillCalculator } from "react-icons/ai";

function BonusView(props) {
   
    return (
        
        <Row className='min-h-screen'>
            <Col span={24}>
                <Row>
                    <Col span={24} className='text-center mt-16 p-4'>
                        <p className=' text-3xl text-white'>Bonus</p>
                    </Col>
                    <Col span={22} offset={1} className=' text-white p-4 rounded-lg bg-neutral-900 border-yellow-300 border'>
                        
                      <Row >
                          <Col span={24} className='border-b border-gray-500 pb-8'>
                            <p className='text-lg mb-2 ' >A 5% platform fee will be applied each time a user makes a withdrawal</p>
                            <p>The 5% will be re-distributed and used for the following:</p>
                          </Col>
                          <Col span={22} offset={1} className='my-8'>
                              <p><span className='text-yellow-300'>Global Reward</span> – 1% a month will get re-distributed back to all active members as a reward.</p>
                              <p><span className='text-yellow-300'>Charity</span>  – Meta Tron will give back to good charitable causes. Please contact us if you have charities in mind.</p>
                              <p><span className='text-yellow-300'>Marketing</span> – a portion of the platform fee will be spent on marketing to obtain new members.</p>
                              <p><span className='text-yellow-300'>Admin Fee</span>  – for the smooth running of the website.</p>
                          
                          </Col>
                          <Col span={24} className='border-t border-gray-500 pt-8'>
                            <p>The GLOBAL REWARD feature is coming SOON! Please stay tuned for updates!</p>
                          </Col>
                      </Row>
                    </Col>
                </Row>
            
            </Col>
        </Row>
        
    
  );
}

export default BonusView;
