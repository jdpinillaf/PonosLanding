import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Problema from '@/components/Problema';
import Servicios from '@/components/Servicios';
import DemoVideos from '@/components/DemoVideos';
import ComoFunciona from '@/components/ComoFunciona';
import CasosExito from '@/components/CasosExito';
import CTAFinal from '@/components/CTAFinal';
import Agendar from '@/components/Agendar';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problema />
        <Servicios />
        <DemoVideos />
        <ComoFunciona />
        <CasosExito />
        <CTAFinal />
        <Agendar />
      </main>
      <Footer />
    </>
  );
}
