import CtaBeforeFooter from "app/components/common/CTABeforeFooter";
import PageHeader from "app/components/PageHeader";
import AppointmentScheduler from "app/components/send-proposal/AppointmentScheduler";
import LogoTicker from "app/components/send-proposal/LogoTicker";
import ProposalSection from "app/components/send-proposal/Proposal";

export default function AboutPage() {
  return (
    <main>
      <PageHeader 
        title="Your Vision, Our Expertise!"
        highlight="Request a Free Proposal"
        description="Transform your digital dreams into reality with our tailored expertise. Let’s collaborate to elevate your online presence – start with a free proposal today!"
      />
      <ProposalSection/>
      <LogoTicker/>
      <AppointmentScheduler/>
      <CtaBeforeFooter/>
    </main>
  );
}