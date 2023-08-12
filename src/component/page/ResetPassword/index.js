import './index.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ResetPasswordView from '../../components/ResetPasswordView';
import CustomParticles from '../../components/CustomParticles';
function ResetPassword() {
  return (
    <>
      <CustomParticles/>
      <Header />
        <ResetPasswordView />
      <Footer/>
    </>
  );
}

export default ResetPassword;
