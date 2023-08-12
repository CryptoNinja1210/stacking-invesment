import react from 'react';
import './index.css';
import { Row, Col, Popover } from 'antd';
import { FaAddressBook, FaPhoneAlt, FaTwitter, FaDiscord, FaTelegramPlane, } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function Footer() {

    const address = (
        <p>20-22 Wenlock Road, N1 7GU, London, UK</p>
    )
    const phone = (
        <p>VIP Clients Only</p>
    )
    const email = (
        <p>Support@metatron.biz</p>
    )
  return (
    <Row className='mt-32'>
        <Col span={24} className='px-2 bg-neutral-900'>
            <Row className='border-b border-gray-600 pb-2'>
                <Col xs={{span:24}} sm={{span:6}} className='text-center p-2 sm:text-left'>
                    <img src='/assets/img/picture1.png' className='inline-block w-1/2 sm:w-full md:w-2/3'/>
                </Col>
                <Col xs={{span:24}} sm={{span:12}} className='flex items-center justify-around p-2'>
                    <Popover content = {address}><a className="text-center flex flex-col sm:flex-row justify-center items-center"><FaAddressBook size={25} className='inline-block mr-2'/>address</a></Popover>
                    <Popover content = {phone}><a className="text-center flex flex-col sm:flex-row justify-center items-center"><FaPhoneAlt size={25} className='inline-block mr-2'/>phone</a></Popover>
                    <Popover content = {email}><a className="text-center flex flex-col sm:flex-row justify-center items-center"><MdEmail size={25} className='inline-block mr-2'/>email</a></Popover>
                </Col>
                <Col xs={{span:24}} sm={{span:6}} className='flex items-center justify-center sm:justify-end p-2'>
                    <a className="foot-button ml-3" target='_blank' href='https://t.me/metatron_official'><FaTelegramPlane size={24} className="footer-item"/></a>
                    <a className="foot-button ml-3"  href='/#'><FaTwitter size={24} className="footer-item"/></a>
                    <a className="foot-button ml-3"  href='/#'><FaDiscord size={24} className="footer-item"/></a>
                </Col>
            </Row>
            <Row className='mt-2 flex justify-between'>
                <a>© 2022. MetaTron. All Rights Reserved.</a>
                <a target='_blank' href='https://tronscan.org/#/contract/TRxnQSZD5MDXF1uefv815QhqecTiDuWdGi/transactions'>Contract Address</a>
            </Row>
        </Col>
    </Row>
  );
}

export default Footer;
