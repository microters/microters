import CtaSection from "./components/common/CTA";
import AboutSection from "./components/home/About";
import AchievementsSection from "./components/home/Achievements";
import Brands from "./components/home/Brands";
import ClientsLogosSection from "./components/home/ClientLogos";
import ContactFormSection from "./components/home/ContactForm";
import ContributionsSection from "./components/home/Contributions";
import HeroBanner from "./components/home/HeroBanner";
import ProjectsSection from "./components/home/Projects";
import ServicesSection from "./components/home/Services";
import VenturesContent from "./components/home/VenturesContent";
import VerticalAccordion from "./components/home/VerticalAccordion";

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
    </div>
  );
}
