import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import PricingTable from '../components/PricingTable';
import ToothbrushPromo from '../components/ToothbrushPromo';
import PartnerBenefits from '../components/PartnerBenefits';
import BenefitsSection from '../components/BenefitsSection';
import FaqAccordion from '../components/FaqAccordion';
import BlogSection from '../components/BlogSection';
import Footer from '../components/Footer';
import StickyNav from '../components/StickyNav';
import VideoShowcase from '../components/VideoShowcase';

export default function Home() {
  console.log('Home page component rendering');
  return (
    <main className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[10%] left-[15%] w-[40%] h-[30%] rounded-full bg-[#00e0cb]/5 blur-[150px] opacity-60" />
          <div className="absolute bottom-[20%] right-[5%] w-[35%] h-[50%] rounded-full bg-[#5cbbff]/5 blur-[150px] opacity-70" />
        </div>
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-[0.02]"></div>
      </div>
      
      {/* Sticky navigation */}
      <StickyNav />
      
      {/* Main content */}
      <div className="relative z-10">
        {/* Header & Hero section */}
        <div id="hero">
          <Header />
          <HeroSection />
        </div>
        
        {/* Plans and pricing section */}
        <div id="plans">
          <PricingTable />
        </div>
        
        {/* Featured Video Showcase */}
        <div id="video">
          <VideoShowcase />
        </div>
        
        {/* Toothbrush showcase section */}
        <div id="toothbrush">
          <ToothbrushPromo />
        </div>
        
        {/* Benefits sections with gradient spacers between */}
        <div id="benefits" className="relative">
          <BenefitsSection />
          <div className="h-24 bg-gradient-to-b from-white to-gray-50/50"></div>
        </div>
        
        <div className="relative bg-gray-50/50">
          <PartnerBenefits />
          <div className="h-24 bg-gradient-to-b from-gray-50/50 to-white"></div>
        </div>
        
        {/* FAQ Section */}
        <div id="faq" className="relative bg-white">
          <FaqAccordion />
        </div>
        
        {/* Blog Section */}
        <div id="blog" className="relative bg-gray-50/50">
          <BlogSection />
        </div>
        
        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
} 