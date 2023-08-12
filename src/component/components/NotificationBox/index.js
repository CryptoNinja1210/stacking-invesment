import react, { useEffect } from 'react';
import './index.css';
import { Row, Col, Button } from 'antd';
import { AiOutlineMessage} from "react-icons/ai";


function NotificationBox(props) {
    useEffect(()=>{
        console.log(props.message)
    },[])
  return (
    <Row className='mt-16'>
        <Col span={24} className='text-white p-8'>
            <Row className='border border-yellow-300 rounded-lg'>
                <Col  xs={{span:12}} md={{span:6}}>
                    <p className='rounded-lg bg-neutral-900 p-4 text-center'><AiOutlineMessage size={25} className='inline-block mr-2'/>Hello {props.userName}</p>
                </Col>
                <Col xs={{span:12}} md={{span:18}} className='p-2 flex items-center'>
                    <span>{props.message} </span>
                </Col>
            </Row>
        </Col>
    </Row>
  );
}

export default NotificationBox;
