import './index.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import RegisterView from '../../components/RegisterView';
import CustomParticles from '../../components/CustomParticles';
function Register() {
  return (
    <>
      <CustomParticles/>
      <Header />
        <RegisterView/>
      <Footer/>
    </>
  );
}

export default Register;
