import CtaSection from "./components/common/CTA";
import CtaBeforeFooter from "./components/common/CTABeforeFooter";
import AboutSection from "./components/common/About";
import AchievementsSection from "./components/home/Achievements";
import Brands from "./components/home/Brands";
import ClientsLogosSection from "./components/home/ClientLogos";
import ContactFormSection from "./components/home/ContactForm";
import ContributionsSection from "./components/home/Contributions";
import HeroBanner from "./components/common/HeroBanner";
import ProjectsSection from "./components/home/Projects";
import ServicesSection from "./components/home/Services";
import VenturesContent from "./components/home/VenturesContent";
import VerticalAccordion from "./components/home/VerticalAccordion";
import TestimonialsSection from "./components/common/Testimonials";

export default function Home() {
  return (
    <div>
      <HeroBanner/>
      <AboutSection/>
      <Brands/>
      <VenturesContent/>
      <AchievementsSection/>
      <ServicesSection/>
      <ClientsLogosSection/>
      <ProjectsSection/>
      <VerticalAccordion/>
      <ContactFormSection/>
      <ContributionsSection/>
      <CtaSection/>
      <TestimonialsSection/>
      <CtaBeforeFooter/>
    </div>
  );
}
