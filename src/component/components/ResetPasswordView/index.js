import react, {useState, useEffect} from 'react';
import axios from 'axios';
import './index.css';
import { Row, Col, Button, Form, Input, Checkbox } from 'antd';
import { useParams, Navigate } from "react-router-dom";
import { MailOutlined ,SafetyOutlined,LockOutlined,TeamOutlined ,EyeTwoTone,EyeInvisibleOutlined} from '@ant-design/icons';
import setAuthToken from '../../../utils/setAuthToken';
import {SERVER_URL} from '../../../constant/env'
import openNotification from "../notification";
function ResetPasswordView() {
    const routeParams = useParams();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("password");
    const [token,setToken] = useState("");
    const [form] = Form.useForm();
    const [redirect, setRedirect] = useState(false);
    
    useEffect(()=>{
        let url = routeParams.jxt;
        localStorage.setItem("jwtToken", JSON.stringify(url));
        setToken(url)
      },[])

    const reset=()=>{
        return form.validateFields()
                .then((values) => {
                  setAuthToken(localStorage.jwtToken);
                  axios.patch(SERVER_URL+"users/resetpassword",{
                    email:email,
                    password:password,
                  }).then(response=>{
                    if(response.data.response){
                      
                      openNotification(4.5,'Successful','Welcome to our site.', true,setRedirect(true));
                    }
                    else{
                      openNotification(4.5,'Login Failed',response.data.message,false);
                      // setMessage({style:'text-red-500',val:false,data:"Login failed! "})
                    }
                    
                  })
    
    
                })
                .catch((errorInfo) => {});           
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

                                    name={[ 'email']}
                                    rules={[{type: 'email',message:'Please enter a correct email address'},{ required: true, message: 'Please input your E-mail!' },{max:50,message:'Please input less than 50 characters'}]}
                                    >
                                    <Input 
                                    size="large" 
                                    placeholder={"E-mail address"} 
                                    prefix={<MailOutlined className="m-2"/> } 
                                    className=" rounded-lg  bg-gray-200 text-black "
                                    onChange={(e)=>setEmail(e.target.value)}/>
                                    </Form.Item>
                                    
                                    <Form.Item
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

                                    <Form.Item
                                    validateTrigger = "onChange"
                                    name="confirm"
                                    dependencies={['password']}
                                    rules={[
                                        { required: true, message: 'incorrect password!' },
                                        ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The passwords that you entered do not match!'));
                                        },
                                        }),
                                    ]}
                                    >
                                    <Input.Password
                                    size="large"  
                                    placeholder={"confirm password"} 
                                    prefix={<LockOutlined className="m-2"/>} 
                                    className="rounded-lg  bg-gray-200"/>
                                    </Form.Item>
                                    {/*<span className={`${message.style} text-lg`}>{message.val==1?<FcOk className="inline mr-2"/>:message.val==0?<FcCancel className="inline mr-2"/>:null}{message.data}</span>*/}
                                    <Form.Item className="mt-2">
                                    <button  onClick={reset} type="submit" className="w-full bg-yellow-300 text-lg font-bold text-black  rounded-lg py-2">
                                    {"Reset"}
                                    </button>
                                    </Form.Item>
                                </Form>

                                <div className="text-center flex justify-between">
                                    {/*<Link href="#" className="myAnchor text-md ml-2">Forgot password?</Link>
                                    <Link to="/register" className="myAnchor text-md ml-2">Register now</Link>*/}
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

export default ResetPasswordView;
