import react, {useState} from 'react';
import axios from 'axios';
import './index.css';
import { Row, Col, Button, Form, Input, Checkbox } from 'antd';
import { AiFillCheckCircle, AiFillCalculator } from "react-icons/ai";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { MailOutlined ,SafetyOutlined,LockOutlined,TeamOutlined ,EyeTwoTone,EyeInvisibleOutlined} from '@ant-design/icons';
import {SERVER_URL} from '../../../constant/env'
import openNotification from "../notification";
function ForgetPasswrodView() {
    const [form] = Form.useForm();
    const [email, setEmail] = useState("");
    const [redirect, setRedirect] = useState(false);

    const confirm=()=>{
    
        form.validateFields()
            .then((values) => {
                axios.post(SERVER_URL+"users/forgotpassword",{
                email:email
                }).then(response=>{
                if(response.data.response){
                    
                    // setMessage({style:'text-green-500',val:true,data:"Successful! Welcome to our site."});
                    openNotification(3.5,'Successful',response.data.message, true,()=>setRedirect(true));
                }
                else{
                    openNotification(3.5,'Failed',response.data.message,false,null);
                }
            })
        })
                            
      }

    return (
        <>
            {
                redirect?
                    <Navigate to="/login" />
                :

                <Row className='min-h-screen'>
                    <Col span={24}>
                    <Row>
                        <Col xs={{span:24}} md={{span:22, offset:1}} className='mt-24 text-center bg-neutral-900 px-8 py-4'>
                            <p className='text-white text-3xl'>Forgot Password?</p>
                            <Row className='mt-8 text-white'>
                                <Col xs={{span:22, offset:1}} md={{span:16, offset:4}}>
                                <Form
                                    name="basic"
                                    initialValues={{ remember: true }}
                                    autoComplete="off"
                                    form={form}
                                    validateTrigger = "onBlur"
                                >
                                    <Form.Item
                                    validateTrigger = "onBlur"
                                    name={[ 'email']}
                                    rules={[{type: 'email',message:'Invalid Email Address'},{ required: true, message: 'Please input your E-mail!' },{max:50,message:'Please input less than 50 characters'}]}
                                    >
                                    <Input  
                                    size="large" 
                                    placeholder={"E-mail address"} 
                                    prefix={<MailOutlined className="m-2"/> } 
                                    className=" rounded-lg  bg-gray-200 text-black "
                                    onChange={(e)=>setEmail(e.target.value)}/>
                                    </Form.Item>
                                    
                                    
                            

                                
                                    {/*<span className={`${message.style} text-lg`}>{message.val==1?<FcOk className="inline mr-2"/>:message.val==0?<FcCancel className="inline mr-2"/>:null}{message.data}</span>*/}
                                    <Form.Item className="mt-2">
                                    <button  onClick={confirm} type="submit" className="w-full bg-yellow-300 text-lg font-bold text-black  rounded-lg py-2">
                                        {"Confirm"}
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

export default ForgetPasswrodView;
