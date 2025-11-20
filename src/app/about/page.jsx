import OurValues from "app/components/about/OurValues";
import StrategicGoals from "app/components/about/StrategicGoals";
import WhoWeAre from "app/components/about/WhoWeAre";
import CtaBeforeFooter from "app/components/common/CTABeforeFooter";
import PageHeader from "app/components/PageHeader";

export default function AboutPage() {
  return (
    <main>
      <PageHeader 
        title="Turning Ideas into Impact"
        highlight="Get to Know Us!"
        description="Welcome to Microters, where we specialize in turning ideas into impactful online experiences. Get to know us and discover how our 11+ years of digital expertise, transparent values, and client-centric approach are dedicated to making your success a reality."
      />
      <WhoWeAre/>
      <OurValues/>
      <StrategicGoals/>
      <CtaBeforeFooter/>
    </main>
  );
}