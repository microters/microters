import CtaBeforeFooter from "app/components/common/CTABeforeFooter";
import FAQSection from "app/components/common/FAQ";
import ContactSection from "app/components/contact/ContactSection";
import MapSection from "app/components/contact/Map";
import PageHeader from "app/components/PageHeader";

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        title="Let’s Connect!"
        highlight="Transforming Visions into Reality"
        description="Join forces with our expert team to bring your digital aspirations to life. Reach out today and take the first step towards realizing your vision."
      />
      <ContactSection/>
      <MapSection/>
      <FAQSection/>
      <CtaBeforeFooter/>
    </main>
  );
}