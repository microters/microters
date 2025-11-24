import AboutSection from "app/components/common/About";
import HeroBanner from "app/components/common/HeroBanner";
import THUMBNAIL_URL from "@assets/images/microters-company.png";
import IndustrySpecializations from "app/components/common/IndustrySpecializations";
import WhyChooseSection from "app/components/common/WhyChooseUs";
import { saasSeoWhyChooseData } from "app/data/whyChooseData";
import ServiceGridSection from "app/components/common/ServiceGrid";
import { saasSeoData } from "app/data/services/servicesData";
import ClientsLogosSection from "app/components/home/ClientLogos";
import AchievedSection from "app/components/common/Achieved";
import SplitContentSection from "app/components/WhiteHatSEO";
import visionImage from "@assets/images/vision.png";
import UniqueBlendSection from "app/components/common/UniqueBlendSection";
import CtaSection from "app/components/common/CTA";
import ConfidenceSection from "app/components/common/Confidence";
import { confidenceData } from "app/data/services/confidenceData";
import WorkProcess from "app/components/common/WorkProcess";
import PackagesSection from "app/components/common/Packages";
import SuccessfulProjects from "app/components/common/SuccessfulProjects";
import ContactFormSection from "app/components/home/ContactForm";
import ExpectationsSection from "app/components/common/Expectations";
import TestimonialsSection from "app/components/common/Testimonials";
import FAQSection from "app/components/common/FAQ";
import CtaBeforeFooter from "app/components/common/CTABeforeFooter";

export default function Home() {
  return (
    <div>
      <HeroBanner
        isInnerPage={true}
        title={
          <>
            Embrace{" "}
            <span style={{ color: "var(--color-primary)" }}>SaaS SEO to Scale</span>
            <br />
            Your B2B SaaS & Drive ROI
          </>
        }
        description="Grow your B2B SaaS business faster than ever with Microters. Our proven SEO strategy helps you reach your targeted audience without fail."
      />
      <AboutSection
        title={<>Full-Service SaaS SEO That <strong className="font-extrabold">Won’t Let You Down</strong></>}
        subtitle={null}
        description={[
            "Why do some SaaS companies double or even triple their ROI while others don’t?",
            "The secret lies in a results-driven SaaS SEO strategy. But what does this result driven SEO mean? ",
            "Typical tools based keyword research, backlinks from everywhere or some guest posts?  Won’t work anymore! Result driven SEO however is a step by step process involving advanced SEO strategies and brainstormings.",
            "We know exactly how to craft you a SaaS SEO strategy that brings more traffic, more leads and more conversions to dominate the SERPs. We make sure your business gets sales-qualified leads (SQLs) and monthly recurring revenue (MRR) building your brand and achieving trust from your audience.",
            "With over 10 years of experience we know how to take up with this competitive world and make your SaaS projects stand out."
        ]}
        youtubeId="6UUYK4ZvB9I"
        thumbnail={THUMBNAIL_URL}
    />
      <IndustrySpecializations/>
       <WhyChooseSection
        title={saasSeoWhyChooseData.title}
        description={saasSeoWhyChooseData.description}
        features={saasSeoWhyChooseData.features}
      />
      <ServiceGridSection 
        title={saasSeoData.title}
        description={saasSeoData.description}
        services={saasSeoData.items}
      />
      <ClientsLogosSection/>
      <AchievedSection/>
      <SplitContentSection 
        title={
            <>
            Why Choose SaaS SEO Over <strong className="font-extrabold">Traditional SEO?</strong>
            </>
        }
        topDescription={[
            "The traditional approach to SEO is about optimizing websites for the search engine with a long-term strategy. Sure, it’s still an unbeatable strategy to grow your business. But for your Software as a Service (SaaS), should you apply the conventional SEO methods?",
            "We say, NO. You need a personalized strategy crafted by SaaS SEO experts that gives your SaaS the online visibility it deserves. This is where SaaS SEO comes into play."
        ]}
        bottomDescription={[
            "Our SaaS SEO services are the extended version of our SEO capabilities. We take a deep dive into your product features and market trends. Not only that, we optimize the entire user journey including onboarding and user experience of your product.",
            "So what are you waiting for? Contact Microters now and let our SaaS SEO experts generate performance-oriented strategies."
        ]}
        imageSrc={visionImage}
      />
      <UniqueBlendSection
        title={
          <>
            Why Choose SaaS SEO Over <br />
            <strong>Traditional SEO?</strong>
          </>
        }
        subtitle="The traditional approach to SEO is about optimizing websites for the search engine with a long-term strategy. Sure, it’s still an unbeatable strategy to grow your business. But for your Software as a Service (SaaS), should you apply the conventional SEO methods?"
        description={[
          "We say, NO. You need a personalized strategy crafted by SaaS SEO experts that gives your SaaS the online visibility it deserves. This is where SaaS SEO comes into play.",
          "Our SaaS SEO services are the extended version of our SEO capabilities. We take a deep dive into your product features and market trends. Not only that, we optimize the entire user journey including onboarding and user experience of your product.",
          <>
            So what are you waiting for? Contact Microters now and let our SaaS SEO experts generate performance-oriented strategies.
          </>
        ]}
      />
       <CtaSection
            title={<>Ready to Embrace <strong>the Power of Data-driven SEO?</strong></>}
            description={null}
            buttonText="Contact Us"
            buttonLink="/contact"
        />
        <ConfidenceSection
            title={
                <>Why We’re Confident About Our <br/> <strong>SaaS SEO Services</strong></>
            }
            description="Don’t just take our word for it. Discover why people consider us the cream of the crop in digital marketing. Our results speak louder than any claim we could make."
            features={confidenceData}
        />
        <WorkProcess/>
        <PackagesSection/>
        <SuccessfulProjects/>
         <div className="py-16 md:py-20">
            <ContactFormSection/>
        </div>
         <ExpectationsSection/>
        <CtaSection
            title={<>Start Your Journey to Success with Professional SEO Services</>}
            description="Let’s rank your website and increase online sales with proven strategies. You can rest assured, we’ll be with you every step of the way."
            buttonText="Request A Free Proposal"
            buttonLink="/send-a-proposal"
        />
        <TestimonialsSection/>
        <FAQSection/>
        <CtaBeforeFooter/>
    </div>
  );
}
