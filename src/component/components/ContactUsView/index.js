import react, {useState, useContext} from 'react';
import './index.css';
import { Row, Col, Button, Form, Input, Checkbox } from 'antd';
import { AiFillCheckCircle, AiFillCalculator } from "react-icons/ai";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { MailOutlined ,SafetyOutlined,LockOutlined,TeamOutlined ,EyeTwoTone,EyeInvisibleOutlined} from '@ant-design/icons';
import openNotification from "../notification";
import {MyInfoContext} from '../../Provider/myInfoProvider';
import axios from 'axios';
import {SERVER_URL} from '../../../constant/env'


function ContactUsView() {
    const [form] = Form.useForm();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("support@metatron.biz");
    const [message, setMessage] = useState("");
    const data = useContext(MyInfoContext);

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
      };

    const submit=()=>{
        
        form.validateFields()
            .then((values) => {
                axios.post(SERVER_URL+"email",{
                    email:email,
                    name:name,
                    message:message
                    }).then(response=>{
                    if(response.data.Response){
                        
                        openNotification(1.5,'Successful','Your message is successfully sent', true,null);
                    }
                    else{
                        openNotification(4.5,'Failed','Your message is missed. Please try again!',false,null);
                    }
                })
        })
                            
      }
    return (
        <>
            {
                <Row className='min-h-screen'>
                    <Col span={24}>
                    <Row>
                        <Col xs={{span:24}} md={{span:22, offset:1}} className='mt-24 text-center bg-neutral-900 px-8 py-4'>
                            <p className='text-white text-3xl'>Contact Us</p>
                            <Row>
                                <Col span={24} className='p-4 text-white text-lg'>
                                To contact us, you can email us at <a className='underline'>support@metatron.biz</a><br/>
                                Alternatively, you can complete the form below or speak to an administrator on the Telegram group.<br/>
                                Please note most questions can be answered by going through the FAQ or the How To Join pages

                                </Col>
                            </Row>
                            <Row className='mt-8 text-white'>
                                <Col xs={{span:22, offset:1}} md={{span:16, offset:4}}>
                                <Form className='text-white' {...layout}  name="basic" initialValues={{ remember: true }} autoComplete="off" form={form} validateTrigger = "onBlur">

                                    <Form.Item name={[ 'name']} label="Full Name" rules={[{ required: true, message: 'Please input your full name!' }]}>
                                        
                                        <Input size="large" placeholder={"Full Name"} prefix={<TeamOutlined className="m-2"/>} className="rounded-lg  bg-gray-200" onChange={(e)=>setName(e.target.value)}/>
                                    </Form.Item>

                                    <Form.Item name={[ 'email']} label="Email Address" rules={[{type: 'email',message:'Please enter a correct email address'},{ required: true, message: 'Please input E-mail!' },{max:50,message:'Please input less than 50 characters'}]}>
                                        
                                        <Input size="large" placeholder={'E-mail address'} prefix={<MailOutlined className="m-2"/> } className=" rounded-lg bg-gray-200 text-black " value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                    </Form.Item>
                                    
                                    <Form.Item name={['message']} label="Message" rules={[{ required: true, message: 'Please input your message!' }]}>
                                        <Input.TextArea onChange={(e)=>setMessage(e.target.value)} />
                                    </Form.Item>
                        

                                
                                    {/*<span className={`${message.style} text-lg`}>{message.val==1?<FcOk className="inline mr-2"/>:message.val==0?<FcCancel className="inline mr-2"/>:null}{message.data}</span>*/}
                                    <Form.Item className="mt-2 " wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                                    <button  onClick={submit} type="submit" className="w-full bg-yellow-300 text-lg font-bold text-black  rounded-lg py-2">
                                    {"Submit"}
                                    </button>
                                    </Form.Item>
                                </Form>
                                </Col>
                            </Row>
                    
                        
                        </Col> 
                    </Row>
                    </Col>
                
                
                </Row>
            }
        </>
        
    
  );
}

export default ContactUsView;
