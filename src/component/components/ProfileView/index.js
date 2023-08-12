import react, {useEffect, useState} from 'react';
import axios from 'axios';
import './index.css';
import { Row, Col, Button, Form, Input, Checkbox } from 'antd';
import { AiFillCheckCircle, AiFillCalculator } from "react-icons/ai";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { MailOutlined ,SafetyOutlined,LockOutlined,TeamOutlined ,EyeTwoTone,EyeInvisibleOutlined} from '@ant-design/icons';
import {SERVER_URL} from '../../../constant/env'
import openNotification from "../notification";
import setAuthToken from '../../../utils/setAuthToken';
function ProfileView(props) {
    const [form] = Form.useForm();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [oldpassword, setOldPassword] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");

    useEffect(()=>{
        let userInfo = JSON.parse(localStorage.getItem('userInfo')) ;
        console.log(userInfo.email);
        setEmail(userInfo.email);
        setFirstName(userInfo.firstname);
        setLastName(userInfo.lastname);
        form.setFieldsValue({email:userInfo.email,firstname:userInfo.firstname, lastname:userInfo.lastname})
    },[])
    function hasErrors(fieldsError) {
        console.log("errer",fieldsError[0].errors.length)
        if(fieldsError[0].errors.length>0)
          return false;
      // return Object.keys(fieldsError).some(field => fieldsError[field]);
    }
    
      const update=()=>{
    
        form.validateFields()
         .then((values) => {
            setAuthToken(localStorage.jwtToken);
            let user = JSON.parse(localStorage.userInfo);
            axios.patch(SERVER_URL+`users/update/${user.id}`,{
                id:user.id,
                currentpassword:oldpassword,
                password:password,
                firstname:firstname,
                lastname:lastname,
                email:email
            }).then(response=>{
                if(response.data.response){
                    openNotification(4.5,'Success',"Account successfully created!",true, ()=>{props.setRefresh();});
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
            <Row className='min-h-max'>
            <Col span={20} offset={2} className='mt-24 text-center bg-neutral-900 px-8 py-4'>
                <p className='text-white text-3xl'>Profile</p>
                <Row className='mt-8 text-white'>
                    <Col span={16} offset={4}>
                        <Form form={form}
                            name="basic"
                            initialValues={{ remember: true }}
                            autoComplete="off"
                            onValuesChange={()=>{}}
                            validateTrigger = "onSubmit"
    
                        >
                            <Form.Item
                                validateTrigger = "onBlur"
                                name= 'email'
                                rules={[{type: 'email'}]}>
                            <Input  
                                size="large"
                                placeholder= {"E-mail address"} 
                                prefix={<MailOutlined className="m-2"/> } 
                                className=" rounded-lg  bg-gray-200 text-black"
                               />
                            
                            </Form.Item>
    
                            <Form.Item
                            validateTrigger = "onBlur"
                            name="oldpassword"
                            rules={[
                                { required: true, message: 'Please input your password!' },
                                {min:8,message:'Please input more than 8 characters'}]}
                            >
                            <Input.Password
                                size="large" 
                                placeholder={"enter password here"} 
                                prefix={<LockOutlined className="m-2"/> }
                                className="rounded-lg  bg-gray-200"
                                onChange={(e)=>setOldPassword(e.target.value)}/>
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
                                    value={firstname}
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
                                    value={lastname}
                                    onChange={(e)=>setLastName(e.target.value)}/>
                            </Form.Item>
    
                            {/*<span className={`${message.style} text-lg`}>{message.val==1?<FcOk className="inline mr-2"/>:message.val==0?<FcCancel className="inline mr-2"/>:null}{message.data}</span>*/}
                            <Form.Item className="mt-2">
                            <button  
                                type="submit" 
                                onClick={update} 
                                className="w-full bg-yellow-300 text-lg font-bold text-black  rounded-lg py-2"
                                >
                                {"Update Account"}
                            </button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
           
               
            </Col>
        </Row>
                
        }
        </>
    
  );
}

export default ProfileView;
