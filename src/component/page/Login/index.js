import './index.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LoginView from '../../components/LoginView';
import CustomParticles from '../../components/CustomParticles';
import { useEffect } from 'react';

function Login() {

  useEffect(()=>{

  },[])


  return (
    <>
      <CustomParticles/>
      <Header/>
        <LoginView />
      <Footer/>
    </>
  );
}

export default Login;
