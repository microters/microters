import AboutSection from "./components/home/About";
import Brands from "./components/home/Brands";
import HeroBanner from "./components/home/HeroBanner";
import VenturesContent from "./components/home/VenturesContent";

export default function Home() {
  return (
    <div>
      <HeroBanner/>
      <AboutSection/>
      <Brands/>
      <VenturesContent/>
    </div>
  );
}
