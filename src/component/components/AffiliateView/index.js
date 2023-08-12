import react, {useState} from 'react';
import axios from 'axios';
import './index.css';
import { Row, Col, Typography } from 'antd';
const { Paragraph } = Typography;

function AffiliateView(props) {
   
    return (
        
        <Row className='min-h-screen'>
            <Col span={24}>
                <Row>
                    <Col span={24} className='text-center mt-16 p-4'>
                        <p className=' text-3xl text-white'>Affiliate</p>
                    </Col>
                    <Col span={22} offset={1} className=' text-white p-4 rounded-lg bg-neutral-900 border-yellow-300 border'>
                        
                      <Row >
                          <Col span={24} className='pb-4'>
                            <p className='text-lg mb-8 ' >Meta Tron will reward members to those who refer the platform, even if they decide not to deposit themselves.</p>
                            <p>When a user signs up using your unique referral link below, you will receive 6% of their deposited amount. </p>
                            <p>For example, if you refer to someone who deposits $1000, you will get $60!</p>
                            <p>It pays to refer! So share MetaTron to as many people as you know!</p>

                          </Col>
                          <Col span={24} className='pt-4'>
                            <p className='text-yellow-200 mb-2'>Your referral link</p>
                            <Paragraph copyable className='text-white border border-white border-dotted p-4'>{`https://metatron.biz/${JSON.parse(localStorage.userInfo).id}/${JSON.parse(localStorage.userInfo).wallet}/${JSON.parse(localStorage.userInfo).base58}`}</Paragraph>
                          </Col>
                      </Row>
                    </Col>
                </Row>
            
            </Col>
        </Row>
        
    
  );
}

export default AffiliateView;
