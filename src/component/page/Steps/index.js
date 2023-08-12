import './index.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import StepsView from '../../components/StepsView';
import CustomParticles from '../../components/CustomParticles';

function Steps() {
  return (
    <>
      <CustomParticles/>
      <Header />
      <StepsView/>
      <Footer/>
    </>
  );
}

export default Steps;
