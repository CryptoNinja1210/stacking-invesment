import react, { useRef, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import { GrMoney } from "react-icons/gr";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { FiClock } from "react-icons/fi";

function VideoView() {
  const videoForm = useRef();
  useEffect(()=>{
    videoForm.current.play();
  },[])
  return (
    <Row className=''>
        <Col span={24} className=''>
          {/* <img src="/assets/video/metatronbanner.gif" className='w-full' /> */}
          <video  muted loop className='w-full' ref={videoForm}>
            <source src="/assets/video/banner.mp4" type="video/mp4" />
          </video>
        </Col>
    </Row>
  );
}

export default VideoView;
