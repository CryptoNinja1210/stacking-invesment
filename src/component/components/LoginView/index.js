import react, {useState, useContext} from 'react';
import axios from 'axios';
import './index.css';
import { Row, Col, Button, Form, Input, Checkbox } from 'antd';
import { AiFillCheckCircle, AiFillCalculator } from "react-icons/ai";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { MailOutlined ,SafetyOutlined,LockOutlined,TeamOutlined ,EyeTwoTone,EyeInvisibleOutlined} from '@ant-design/icons';
import {SERVER_URL} from '../../../constant/env'
import openNotification from "../notification";
import {MyInfoContext} from '../../Provider/myInfoProvider';

function LoginView() {
    const [form] = Form.useForm();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [redirect, setRedirect] = useState(false);
    const data = useContext(MyInfoContext);

    const login=()=>{
        let connected = data.connectWallet();
        if(!connected)
        {
            openNotification(4.5,"Failed", "To enter please login to your TronLink Wallet first. To find out how, please check the How To Join page", false, null)

            return ;
        }
        
        form.validateFields()
            .then((values) => {
                axios.post(SERVER_URL+"users/login",{
                email:email,
                password:password
                }).then(response=>{
                if(response.data.response){
                    
                    // setMessage({style:'text-green-500',val:true,data:"Successful! Welcome to our site."});
                    localStorage.setItem("userInfo", JSON.stringify(response.data.data.userInfo));
                    localStorage.setItem("jwtToken", JSON.stringify(response.data.data.token));

                    
                    openNotification(1.5,'Successful','Welcome to MetaTron.', true,()=>setRedirect(true));
                }
                else{
                    openNotification(4.5,'Login Failed',response.data.message,false,);
                }
            })
        })
                            
      }
    return (
        <>
            {
                redirect?
                    <Navigate to="/main" />
                :

                <Row className='min-h-screen'>
                    <Col span={24}>
                    <Row>
                        <Col xs={{span:24}} md={{span:22, offset:1}} className='mt-24 text-center bg-neutral-900 px-8 py-4'>
                            <p className='text-white text-3xl'>Login</p>
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
                                        name={[ 'email']}
                                        rules={[{type: 'email',message:'Please enter a correct email address'},{ required: true, message: 'Please input your E-mail!' },{max:50,message:'Please input less than 50 characters'}]}>
                                        <Input 
                                            size="large" 
                                            placeholder={'E-mail address'} 
                                            prefix={<MailOutlined className="m-2"/> } 
                                            className=" rounded-lg bg-gray-200 text-black "
                                            onChange={(e)=>setEmail(e.target.value)}/>
                                        </Form.Item>
                                    
                                    <Form.Item
                                        validateTrigger = "onBlur"
                                        name="password"
                                        rules={[
                                            { required: true, message: 'Please input your password!' },
                                            {min:8,message:'Please input more than 8 characters'}]}
                                        >
                                        <Input.Password 
                                            size="large" 
                                            placeholder={"enter password here"} 
                                            prefix={<LockOutlined className="m-2"/> }
                                            className="rounded-lg  bg-gray-200"
                                            onChange={(e)=>setPassword(e.target.value)}/>
                                    </Form.Item>

                                
                                    {/*<span className={`${message.style} text-lg`}>{message.val==1?<FcOk className="inline mr-2"/>:message.val==0?<FcCancel className="inline mr-2"/>:null}{message.data}</span>*/}
                                    <Form.Item className="mt-2">
                                    <button  onClick={login} type="submit" className="w-full bg-yellow-300 text-lg font-bold text-black  rounded-lg py-2">
                                    {"Log In"}
                                    </button>
                                    </Form.Item>
                                </Form>

                                <div className="text-center flex justify-between">
                                    <Link to="/forgotpassword" className="myAnchor text-md ml-2">{"Forgot password?"}</Link>
                                    <Link to="/register" className="myAnchor text-md ml-2">{"Register now"}</Link>
                                </div>
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

export default LoginView;
