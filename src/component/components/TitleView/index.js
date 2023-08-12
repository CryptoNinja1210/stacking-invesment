import react from 'react';
import './index.css';
import {Row, Col} from 'antd';
import Bounce from 'react-reveal/Bounce';
import { Link} from "react-router-dom";
import {YellowButton, WhiteButton} from '../Buttons';
function TitleView() {
  return (
    <Row>
        <Col span={24} className=' p-4'>
          <Row className='flex items-center'>
            <Col xs={{span:22, offset:1}} md={{span:11, offset:1}} className=''>
              <Bounce left>
                <p className='text-2xl lg:text-4xl text-white font-bold'>Welcome to MetaTron</p>             
                <p className='text-lg lg:text-xl mt-2  text-white mb-4'>Deposit Once – Earn MetaTron Forever</p>
              </Bounce>
              <Bounce>
                <p className='   text-gray-400 mb-2'>MetaTron is a genuine long-term staking website whereby all members can take advantage of our pool of investment strategies. To keep it simple, we have one mission. You deposit only once, and you can benefit for a lifetime using our auto-invest compounding feature.</p>
                <p className='hidden lg:block   text-gray-400 mb-4'>MetaTron Insurance Lock means that the platform is sustainable and will be in operation for many years to come.</p>
              </Bounce>
              <Bounce right>
                <Link to = "/register" className='text-black '><YellowButton className=' mx-1 rounded-lg text-base px-6 py-1.5 bg-yellow-400 hover:bg-yellow-500' >Register Now</YellowButton></Link>
              </Bounce>
            </Col>
            <Col xs={{span:0}} md={{span:12, offset:0}} className=''>
              <Col xs={{span:22, offset:1}} md={{span:18, offset:3}} lg={{span:10, offset:7}} >
                  <img src='/assets/img/picture2.png' className='w-full'/>
              </Col>
              
            </Col>
          </Row>
        </Col>
    </Row>
  );
}

export default TitleView;
