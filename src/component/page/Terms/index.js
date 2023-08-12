import './index.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TermsView from '../../components/TermsView';
import CustomParticles from '../../components/CustomParticles';
function Terms() {
  return (
    <>
      <CustomParticles/>
      <Header />
      <TermsView/>
      <Footer/>
    </>
  );
}

export default Terms;
