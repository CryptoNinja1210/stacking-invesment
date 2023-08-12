import { useState,useEffect } from 'react';
import { Button, Row, Col } from 'antd';
import {AiFillCloseCircle} from "react-icons/ai";
import './index.css'
function ConfirmModal(props) {

    useEffect(()=>{
        
    },[])

    return (
        <>
            {props.visible &&
                <Row className="modal fixed top-0 left-0 w-screen h-screen z-10 black-alpha-back flex justify-center items-center">
                    <Col xs={{span:22}} md={{span:10}} className="bg-neutral-900 rounded-lg shadow-2xl">
                    <Row className='bg-yellow-300 rounded-t-lg p-4 text-black'>
                        <Col span={20} className="text-xl">{props.title}</Col>
                        <Col span={4} className="text-right"><a onClick={()=>props.close()}><AiFillCloseCircle size={30} className="inline text-neutral-900"/></a></Col>
                    </Row>
                    <Row className='mt-8'>
                        <Col span={24} className="text-center text-white">
                            {props.children}
                        </Col>
                    </Row>
                    </Col >
                </Row>
            }
        </>
        

    );
}

export default ConfirmModal;
