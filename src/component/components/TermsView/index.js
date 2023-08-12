import react, {useState} from 'react';
import axios from 'axios';
import './index.css';
import { Row, Col, Button, Form, Input, Checkbox } from 'antd';
import { AiFillCheckCircle, AiFillCalculator } from "react-icons/ai";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { MailOutlined ,SafetyOutlined,LockOutlined,TeamOutlined ,EyeTwoTone,EyeInvisibleOutlined} from '@ant-design/icons';
import {SERVER_URL} from '../../../constant/env'
import openNotification from "../notification";

const howwork = [
    {title : "Customer's Account", content : "You shall have an account of Company's Site to correctly use Company's Services. The procedure for granting the status of the Customer and personal account on Company's Site is described the FAQ section. The Customer shall be fully responsible for results and consequences of the activity under this account. The Customer shall be obliged to provide no information about the data required to access the account to the third persons. In case suspicious activity is detected in your account, and in case of authorisation data loss and/or if you suspect that your authorisation data have become known to the third persons, the Customer shall undertake to immediately inform Company's management about such cases, using a feedback form on Company's Site. Several Account: Any try to open more 1 account, all account will be disable instantly without a refund!"},
    {title : "Investment Policy", content : "The Customer shall be informed about and confirm s/he has fully understood and accepted without any loose and/or partial interpretation the following: Company's activity is carried out in the form of private transaction and is not covered by the Securities Act of 1933 (USA); Company's activity is carried out in the form of private transaction and is not covered by the Securities Exchange Act of 1934 (USA); Company's activity is carried out in the form of private transaction and is not covered by the Investment Company Act of 1940 (USA) and all relevant regulations and its amendments; The Company is not insured by the Federal Deposit Insurance Corporation; The Company is not a banking institution or a company dealing with securities; The Company provides no insurance services and is not an insurance organisation or company."},
    {title : "Disclaimer", content : "Under no circumstances the Company shall bear responsibility towards the Customer for any losses, related to Customer's activity, caused by inappropriate use of Company's official site or following misinterpretation of the information provided on Company's Site."},
    {title : "Final Provisions", content : "The Company shall be entitled to amend quality and/or quantity of the Services provided to the Customer; The Company shall be entitled to change, amend and update the present Rules in its own discretion, guided only by its own motives and incentives without prior notification of any Company's Customer. By further use of Company's Services the Customer shall agree to and accept the fact that by her/his actions S/He confirms being fully aware of changes, amendments and updates to the present Rules; The Customer shall be obliged to carry out individual monitoring of changes, amendments and updates to the present Rules, as well as to any other sections of Company's site; The Customer shall agree and confirm that any information contained on Company's Site together with changes, amendments and updates that might (but not have to) take place is purely awareness-raising and can't be considered as commercial offer an/or call to perform investment actions by the Customer; The Customer shall agree and confirm that all sections of Company's Site are automatically correlated with the present Rules and shall be executed by the Parties in the same order, as the present Rules in full; In case the Customer violates conditions of the present Rules, the Company shall reserve the right to block Customer's account unilaterally, and to unilaterally terminate the present Rules without prior notification."},
  
  ]
function TermsView() {
   
    return (
        
        <Row className='min-h-screen'>
            <Col span={24}>
                <Row>
                    <Col span={24} className='text-center mt-16 bg-yellow-300 p-4'>
                        <p className=' text-2xl md:text-3xl'>Terms of Service</p>
                    </Col>
                    <Col span={22} offset={1} className='bg-neutral-900 mt-8 text-white p-8'>
                        <p>
                            General Service Conditions (hereinafter Services, Rules) The present Rules are concluded in the form of a voluntary agreement between MetaTron (hereinafter the Company, We, Our and other words that are covered by the notion 'Company' semantically or contextually), providing access and services on the site https://metatron.biz (hereinafter the Site), and the user of the Site a participant of the Company's programme (hereinafter the Customer, Her/His, Her/Him and other words covered by the notion 'Customer' semantically or contextually), and regulate liabilities and responsibilities of the Company and the Customer (hereinafter the Parties, the Party and words covered by the notion 'Company' or 'Customer' semantically or contextually) in the framework of the present Rules.
                            <br/>
                            <br/>
                            These Rules are mandatory for the Parties, when using the Services. In case the present Rules are violated and/or suspicious activity causing violation of the Rules is detected, the Company shall be entitled to suspend and partially or fully block Customer's access to the account and to all
                        </p>
                    </Col>

                    {
                        howwork.map((item, idx)=>(
                            <Col span={22} offset={1} className='bg-neutral-900 mt-8 text-white p-8'>
                                <Row><a className='text-xl text-yellow-200 hover:text-yellow-100 my-4'>{item.title}</a></Row>
                            
                                <p>
                                    {item.content}
                                </p>
                            </Col>
                        ))
                    }
                    

                   
                </Row>
            
            </Col>
        </Row>
        
    
  );
}

export default TermsView;
