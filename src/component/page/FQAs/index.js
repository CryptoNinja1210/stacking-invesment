import './index.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FQAsView from '../../components/FQAsView';
import CustomParticles from '../../components/CustomParticles';

function FQAs() {
  return (
    <>
      <CustomParticles/>
      <Header />
      <FQAsView/>
      <Footer/>
    </>
  );
}

export default FQAs;
