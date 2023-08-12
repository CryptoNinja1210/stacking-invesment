import react from 'react';
import { Link} from "react-router-dom";
import './index.css';
import { Row, Col, Menu, Dropdown } from 'antd';
import { FaGripLines, FaCalculator, FaPhoneAlt, FaBookOpen, FaQuestionCircle } from "react-icons/fa";
import {YellowButton, WhiteButton} from '../Buttons';

function Header(props) {

    const menu = (
        <Menu className='pr-4'>
          <Menu.Item key="1"><Link to="/" onClick={props.gotoplan}><FaCalculator size={18} className='inline mr-2'/>{props.gotoplan ? 'Plans' : 'Home'}</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/terms"><FaBookOpen size={18} className='inline mr-2'/>Terms</Link></Menu.Item>
          <Menu.Item key="4"><Link to="/fqas"><FaQuestionCircle size={18} className='inline mr-2'/>FAQ's</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/contactus"><FaPhoneAlt size={18} className='inline mr-2'/>Contact Us</Link></Menu.Item>
        </Menu>
      );
    const logout = ()=>{
        window.location.href = '/';
        localStorage.removeItem("userInfo");
        localStorage.removeItem("jwtToken");
    }
  return (
    <Row>
        <Col span={24} className='p-4'>
            <Row className='flex items-center'>
                <Col xs={{span:6}} md={{span:4}}>
                    <Link to="/" ><img src='/assets/img/picture1.png' className='inline-block w-full'/></Link>
                </Col>
                <Col xs={{span:0}} md={{span:12}} className='hidden md:flex justify-center text-lg'>
                    <Link to = '/' className="mx-4 " onClick={props.gotoplan}>{props.gotoplan ? 'Plans' : 'Home'}</Link>
                    <Link to = '/terms' className="mx-4 "> Terms</Link>
                    <Link to = '/fqas' className="mx-4 ">FAQ's</Link>
                    <Link to = '/contactus' className="mx-4 ">Contact Us</Link>
                    <Link to = '/steps/-1' className="mx-4 ">How to Join</Link>

                </Col>
                <Col xs={{span:3, offset:1}} md={{span:0}}>
                    <Dropdown
                        overlay={menu}
                        trigger={['click']}
                    >
                    <a ><FaGripLines size={32} style={{marginRight:'8px'}}/></a>
                    </Dropdown>
                </Col>
                <Col xs={{span:14}} md={{span:8}} className='text-right'>
                    {
                        (JSON.parse(localStorage.getItem('userInfo'))?.role == 'General' || JSON.parse(localStorage.getItem('userInfo'))?.role == 'Admin')?
                        <>
                            <YellowButton onClick = {logout}>Logout</YellowButton>
                            <Link to='/main'><WhiteButton >Account</WhiteButton></Link>
                        </>
                        
                        :
                        <>
                            <Link to='/login'><YellowButton  >Login</YellowButton></Link>
                            <Link to='/register'><WhiteButton >SignUp</WhiteButton></Link>
                        </>
                        
                    }
                    
                </Col>
            </Row>
        </Col>
    </Row>
  );
}

export default Header;
