import './index.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ForgetPasswrodView from '../../components/ForgetPasswrodView';
import CustomParticles from '../../components/CustomParticles';
function ForgetPassword() {
  return (
    <>
      <CustomParticles/>
      <Header />
        <ForgetPasswrodView />
      <Footer/>
    </>
  );
}

export default ForgetPassword;
