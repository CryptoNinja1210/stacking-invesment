import react from 'react';
import { Row, Col, Button } from 'antd';
import { GrMoney } from "react-icons/gr";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { FiClock } from "react-icons/fi";
import Fade from 'react-reveal/Fade';

function HelpService() {
  return (
    <Row className='mt-16 p-4'>
        <Col span={24} className='mt-16 text-center text-white'>
            <p className='text-white text-3xl'>Key Features</p>
            <Row className=''>
                <Col xs={{span:20, offset:2}} md={{span:6, offset:0}}  className='mt-8 bg-neutral-900 bg-neutral-800 p-4'>
                
                    <img src='/assets/img/step2.png' className='w-1/2 inline-block'/>
                    <p className='mt-2 text-xl'>Affiliates</p>
                    <Fade bottom>
                    <span>Meta Tron will reward members to those who refer the platform, even if you decide not to stake. Once you register, you will be provided with a unique referral link.</span>
                    </Fade>
                </Col>
                <Col xs={{span:20, offset:2}} md={{span:6, offset:0}} className='mt-8 bg-neutral-900 bg-neutral-800 p-4'>
                
                    <img src='/assets/img/step3.png' className='w-1/2 inline-block'/>
                    <p className='mt-2 text-xl'>Insurance Lock</p>
                    <Fade bottom>
                    <span>Should there be a period where the market is not favourable and there are not enough funds in the community fund to pay all members, the Insurance Lock feature ensures that the platform is fair to all members.  </span>
                    </Fade>
                </Col>
                <Col xs={{span:20, offset:2}} md={{span:6, offset:0}} className='mt-8 bg-neutral-900 bg-neutral-800 p-4'>
                
                    <img src='/assets/img/step5.png' className='w-1/2 inline-block'/>
                    <p className='mt-2 text-xl'>Auto-Reinvest Rule</p>
                    <Fade bottom>
                    <span>The aim of this staking platform is to be in operation for more than 5 years. The Auto-Reinvest features enables this to happen and makes it fair to all Meta Tron users. </span>
                    </Fade>
                    
                </Col>
                <Col xs={{span:20, offset:2}} md={{span:6, offset:0}} className='mt-8 bg-neutral-900 bg-neutral-800 p-4'>
                   
                    <img src='/assets/img/step4.png' className='w-1/2 inline-block'/>
                    
                    <p className='mt-2 text-xl'>Platform Withdraw Fee</p>
                    <Fade bottom>
                    <span>A 5% platform fee will be re-distributed and used for Global Reward, Charity, Marketing, Admin Fee.</span>
                    </Fade>
                </Col>
            </Row>
        </Col>
    </Row>
  );
}

export default HelpService;
