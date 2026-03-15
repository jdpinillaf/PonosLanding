import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Problema from '@/components/Problema';
import Servicios from '@/components/Servicios';
import DemoVideos from '@/components/DemoVideos';
import ImpactStats from '@/components/ImpactStats';
import ROITable from '@/components/ROITable';
import ComoFunciona from '@/components/ComoFunciona';
import TrustSecurity from '@/components/TrustSecurity';
import Integrations from '@/components/Integrations';
import AIGrows from '@/components/AIGrows';
import CasosExito from '@/components/CasosExito';
import Founder from '@/components/Founder';
import CTAFinal from '@/components/CTAFinal';
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
        <ImpactStats />
        <ROITable />
        <ComoFunciona />
        <TrustSecurity />
        <Integrations />
        <AIGrows />
        <CasosExito />
        <Founder />
        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}
