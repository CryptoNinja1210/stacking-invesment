import react, {useState} from 'react';
import { Row, Col, Button, Form, Input, Checkbox } from 'antd';
import { BsArrowUpCircle, BsArrowDownCircle } from "react-icons/bs";
import Fade from 'react-reveal/Fade';
function FQAsElement(props) {
    const [show, setShow] = useState(false);
    return (
        
        
            
            <Col span={22} offset={1} className='bg-neutral-900 mt-8 text-white p-8'>
                <Row className='mb-4 cursor-pointer flex justify-between items-center'onClick = {()=>setShow(!show)}>
                    
                    <Col span={21}>
                        <a className='text-base md:text-xl text-yellow-200 hover:text-yellow-100 my-4 '>{props.title}</a>
                    </Col>
                    <Col span={2} offset={1} className='text-right'>
                        {
                            show ?
                                <BsArrowUpCircle  size = {30} className='inline text-yellow-200'/>
                            : 
                                <BsArrowDownCircle  size = {30} className='inline text-yellow-200'/>
                        }
                    </Col>
                    
                    
                </Row>
                
                {
                    show &&
                    <Fade >
                        {props.content}
                    </Fade>
                }
            </Col>

     
        
    
  );
}

export default FQAsElement;
