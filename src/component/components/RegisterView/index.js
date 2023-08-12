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

function RegisterView() {
    const [form] = Form.useForm();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [verificationCode,setVerificationCode]=useState(0);
    const data = useContext(MyInfoContext);
    const [redirect, setRedirect] = useState(false);


    function hasErrors(fieldsError) {
        console.log("errer",fieldsError[0].errors.length)
        if(fieldsError[0].errors.length>0)
          return false;
        verifyEmail();
      // return Object.keys(fieldsError).some(field => fieldsError[field]);
    }
    const verifyEmail=()=>{
        return axios.post(SERVER_URL+"users/emailverify",{
          email: email,
        }).then(response=>{
          if(response.data.response){
            openNotification(1.5,'Success',response.data.message,true,null)
          }
          else{
            openNotification(4.5,'Fail!',"E-mail not verified!",false,null)       
          }
        });
      }
      const register=()=>{
        
        let connected = data.connectWallet();
        if(!connected)
        {
            openNotification(4.5,"Failed", "To enter please login to your TronLink Wallet first. To find out how, please check the How To Join page", false, null)
            return ;
        }

        console.log("tronweb", connected.defaultAddress.base58);
        form.validateFields()
         .then((values) => {
           console.log("validateFile")
           axios.post(SERVER_URL+"users/signup",{
             email:email,
             emailverify:verificationCode,
             password:password,
             firstname:firstName,
             lastname:lastName,
             wallet:connected.defaultAddress.hex,
             base58 : connected.defaultAddress.base58
           }).then(response=>{
               console.log(response.data.message);
             if(response.data.response){
                openNotification(1.5,'Success',"Account successfully created!",true,()=>setRedirect(true) );
                localStorage.setItem("userInfo", JSON.stringify(response.data.data.userInfo));
                localStorage.setItem("jwtToken", JSON.stringify(response.data.data.token));

             } 
             else{
                openNotification(4.5,'Fail!',response.data.message,false);
             }
           })


         })

    }
    return (
        <>
            {
                redirect?
                    <Navigate to="/main/" />
                :
                    <Row className='min-h-max'>
                        <Col xs={{span:24}} md={{span:22, offset:1}} className='mt-24 text-center bg-neutral-900 px-8 py-4'>
                            <p className='text-white text-3xl'>Sign up</p>
                            <Row className='mt-8 text-white'>
                                <Col xs={{span:22, offset:1}} md={{span:16, offset:4}}>
                                    <Form form={form}
                                        name="basic"
                                        initialValues={{ remember: true }}
                                        autoComplete="off"
                                        onValuesChange={()=>{}}
                                        validateTrigger = "onSubmit"

                                    >
                                        <Form.Item
                                            validateTrigger = "onBlur"
                                            name={[ 'email']}
                                            rules={[{type: 'email',message:'Invalid Email Address'},{ required: true, message: 'Please input your E-mail!' },{max:50,message:'Please input less than 50 characters'}]}>
                                        <Input  
                                            size="large"
                                            placeholder= {"E-mail address"} 
                                            prefix={<MailOutlined className="m-2"/> } 
                                            className=" rounded-lg  bg-gray-200 text-black "
                                            onChange={(e)=>setEmail(e.target.value)}/>
                                        </Form.Item>
                                        <Form.Item
                                            
                                            name="Verification"
                                            rules={[
                                                { required: true, message: 'Please input your E-mail Verification Code!' },
                                                {max:4,message:'Please input less than 4 characters'}]}>
                                        <Input
                                            size="large" 
                                            placeholder={'E-mail verification code'} 
                                            prefix={<SafetyOutlined className="m-2"/>}
                                            suffix={<a onClick={()=>hasErrors(form.getFieldsError())}  className="bg-gray-800 text-md  text-white  rounded-xl py-1 px-4">{"Send"}</a>} 
                                            className="rounded-lg  bg-gray-200"
                                            onChange={(e)=>setVerificationCode(e.target.value)}/>
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
                                                    return Promise.reject(new Error("The passwords that you entered do not match!"));
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

                                        <Form.Item
                                            name="firstname"
                                            rules={[{max:10}
                                            ]}>
                                            <Input
                                                size="large" 
                                                placeholder={"firstname"} 
                                                prefix={<TeamOutlined className="m-2"/>} 
                                                className="rounded-lg  bg-gray-200"
                                                onChange={(e)=>setFirstName(e.target.value)}/>
                                        </Form.Item>

                                        <Form.Item
                                            name="lastname"
                                            rules={[{max:10}
                                            ]}>
                                            <Input
                                                size="large" 
                                                placeholder={"lastname"} 
                                                prefix={<TeamOutlined className="m-2"/>} 
                                                className="rounded-lg  bg-gray-200"
                                                onChange={(e)=>setLastName(e.target.value)}/>
                                        </Form.Item>

                                        <Form.Item 
                                            name="check" 
                                            valuePropName="checked"
                                            rules={[
                                                {
                                                validator: (_, value) =>
                                                    value ? Promise.resolve() : Promise.reject(new Error("Should accept agreement")),
                                                },
                                            ]}>
                                            <Checkbox  className='text-white'>{"I have read and agree to MetaTron's Terms of Service"}</Checkbox>
                                        </Form.Item>
                                        {/*<span className={`${message.style} text-lg`}>{message.val==1?<FcOk className="inline mr-2"/>:message.val==0?<FcCancel className="inline mr-2"/>:null}{message.data}</span>*/}
                                        <Form.Item className="mt-2">
                                        <button  
                                            type="submit" 
                                            onClick={register} 
                                            className="w-full bg-yellow-300 text-lg font-bold text-black  rounded-lg py-2"
                                            >
                                            {"Create Account"}
                                        </button>
                                        </Form.Item>
                                    </Form>
                                    <div className="text-center">
                                        {"Already registered?"}<Link to="/login"  className="myAnchor text-md ml-2">{"Log In"}</Link>
                                    </div>
                                </Col>
                            </Row>
                    
                        
                        </Col>
                    </Row>
            }
        </>
    
  );
}

export default RegisterView;
