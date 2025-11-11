import AboutSection from "./components/home/About";
import AchievementsSection from "./components/home/Achievements";
import Brands from "./components/home/Brands";
import HeroBanner from "./components/home/HeroBanner";
import ServicesSection from "./components/home/Services";
import VenturesContent from "./components/home/VenturesContent";

export default function Home() {
  return (
    <div>
      <HeroBanner/>
      <AboutSection/>
      <Brands/>
      <VenturesContent/>
      <AchievementsSection/>
      <ServicesSection/>
    </div>
  );
}
