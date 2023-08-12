import react from 'react';
import { Row, Col, Button } from 'antd';
import { GrMoney } from "react-icons/gr";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { FiClock } from "react-icons/fi";
import Fade from 'react-reveal/Fade';

function Howwork() {
  return (
    <Row className='mt-16 '>
        <Col span={24} className='mt-16 text-center text-white'>
            <p className='text-white text-3xl'>How it Works</p>
            <Row className='mt-8 bg-neutral-900 text-xl py-8 flex justify-center p-4'>
                <Col className='text-left'>
                <Fade bottom >
                  <span >
                    <p>1 -> Choose a Plan, Stake a deposit</p>
                    <p>2 -> Receive 4% or 6% each day until the initial principle is returned</p>
                    <p>3 -> After this point your stake is RISK free</p>
                    <p>4 -> All profits going forwards are split 50/50</p>
                    <p>5 -> 50% is automatically reinvested back to your balance to enable compounding</p>
                    <p>6 -> 50% you can instantly withdraw</p>
                    <p>7 -> Deposit Once Earn MetaTron Forever</p>
                  </span>
                
                </Fade>
                </Col>
                
            </Row>
        </Col>
    </Row>
  );
}

export default Howwork;
