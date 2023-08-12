import './index.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ContactUsView from '../../components/ContactUsView';
import CustomParticles from '../../components/CustomParticles';
import { useEffect } from 'react';

function ContactUs() {

  useEffect(()=>{

  },[])


  return (
    <>
      <CustomParticles/>
      <Header />
        <ContactUsView />
      <Footer/>
    </>
  );
}

export default ContactUs;
