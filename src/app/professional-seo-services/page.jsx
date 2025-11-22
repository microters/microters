import AboutSection from "app/components/common/About";
import HeroBanner from "app/components/common/HeroBanner";
import THUMBNAIL_URL from "@assets/images/microters-company.png";
import IndustrySpecializations from "app/components/common/IndustrySpecializations";
import WhyChooseSection from "app/components/common/WhyChooseUs";
import { seoWhyChooseData } from "app/data/whyChooseData";
import { seoProfessionalData } from "app/data/services/servicesData";
import ServiceGridSection from "app/components/common/ServiceGrid";
import ClientsLogosSection from "app/components/home/ClientLogos";
import AchievedSection from "app/components/common/Achieved";
import WhiteHatSEO from "app/components/WhiteHatSEO";
import UniqueBlendSection from "app/components/common/UniqueBlendSection";
import CtaSection from "app/components/common/CTA";
import ContactFormSection from "app/components/home/ContactForm";
import CtaBeforeFooter from "app/components/common/CTABeforeFooter";
import FAQSection from "app/components/common/FAQ";

export default function Home() {
  return (
    <div>
      <HeroBanner
        isInnerPage={true}
        title={
          <>
            Professional{" "}
            <span style={{ color: "var(--color-primary)" }}>SEO Services for</span>
            <br />
            Data-driven Growth & Results
          </>
        }
        description="Scale your business to the maximum with industry experts and professional SEO services. Improve your online visibility, outshine competitors, and get more conversions – using data-driven, white-hat SEO Strategies."
      />
      <AboutSection
        title={<>A Data-driven Approach to <strong className="font-extrabold">Professional SEO</strong></>}
        subtitle={null}
        description={[
            "SEO has always been guided by data, and that’s why you need a data-driven approach to uncover your business potential.",
            "The data we have now is far more advanced. Thanks to big data, you have more insights into your customer behaviors than you know. We channel this data using powerful analytics platforms like Google Analytics and Google Search Console to craft SEO strategies that deliver measurable results.",
            "With this data-driven approach we effectively understand the search intent to target the right traffic for your business. This way we improve SEO performance, and increase ROI in real-time."
        ]}
        youtubeId="6UUYK4ZvB9I"
        thumbnail={THUMBNAIL_URL}
    />
    <IndustrySpecializations/>
    <WhyChooseSection
        title={seoWhyChooseData.title}
        description={seoWhyChooseData.description}
        features={seoWhyChooseData.features}
      />
      <ServiceGridSection 
        title={seoProfessionalData.title}
        description={seoProfessionalData.description}
        services={seoProfessionalData.items}
      />
      <ClientsLogosSection/>
      <AchievedSection/>
      <WhiteHatSEO/>
      <UniqueBlendSection
        title={
          <>
            What Makes Us Unique? <br />
            <strong>Our Blend of New and Traditional SEO</strong>
          </>
        }
        subtitle="What we’re good at is integrating AI and machine learning to our traditional SEO efforts. The result? Maximum visibility and more conversion!"
        description={[
          "We use AI’s insights and SEO’s reach, creating a highly-personalized strategy only for your business. AI analysis helps us What kind of content and keywords works for your target audience and SEO helps us reach those people at the right time.",
          <>
            There’s more, in addition to traditional SEO tools, we take data from Google Analytics 4 (GA4) to create a full-proof strategy that only leads to one thing-<strong>conversion.</strong>
          </>
        ]}
      />
         <CtaSection
            title={<>Ready to Embrace <strong>the Power of Data-driven SEO?</strong></>}
            description={null}
            buttonText="Contact Us"
            buttonLink="/contact"
        />
        <div className="py-16 md:py-20">
            <ContactFormSection/>
        </div>
         <CtaSection
            title={<>Start Your Journey to Success with Professional SEO Services</>}
            description="Let’s rank your website and increase online sales with proven strategies. You can rest assured, we’ll be with you every step of the way."
            buttonText="Request A Free Proposal"
            buttonLink="/send-a-proposal"
        />
        <FAQSection/>
        <CtaBeforeFooter/>
    </div>
  );
}
