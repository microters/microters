import AboutSection from "app/components/common/About";
import HeroBanner from "app/components/common/HeroBanner";
import THUMBNAIL_URL from "@assets/images/microters-company.png";
import IndustrySpecializations from "app/components/common/IndustrySpecializations";
import WhyChooseSection from "app/components/common/WhyChooseUs";
import { ecommerceSeoWhyChooseData } from "app/data/whyChooseData";
import ServiceGridSection from "app/components/common/ServiceGrid";
import { ecommerceSeoData } from "app/data/services/servicesData";
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
import PlatformsSection from "app/components/Platforms";

export default function Home() {
  return (
    <div>
      <HeroBanner
        isInnerPage={true}
        title={
          <>
            eCommerce SEO: Unlock{" "}
            <span style={{ color: "var(--color-primary)" }}>Record-breaking Sales </span>
            <br />
            for Your Online Store
          </>
        }
        description="Optimize your online store, using the proven expertise of our eCommerce SEO services. Let Microters take care of your eCommerce business growth with more sales, more revenue, and eventually more ROI. "
      />
      <AboutSection
        title={<>eCommerce SEO for a <strong className="font-extrabold">Sales-focused Strategy</strong></>}
        subtitle={null}
        description={[
            "For over 10 years, we’ve been collaborating with numerous online businesses and generating massive sales in the eCommerce industry.",
            "But how can your business achieve that? With traditional keyword research and backlinking strategy?",
            "The answer is NO! You need a more sales-oriented approach- a strategy that guarantees sales without the paid ads. And that’s why Mictroters is here, equipped with experienced eCommerce professionals.",
            "We have specialized keyword research techniques that help you understand the actual purchase intent of people. Not only that, we’ll craft a content strategy that converts visitors into buyers.",
            "Set yourself up for a massive sales boost partnering with us right from today."
        ]}
        youtubeId="6UUYK4ZvB9I"
        thumbnail={THUMBNAIL_URL}
    />
    <PlatformsSection/>
      <IndustrySpecializations/>
       <WhyChooseSection
        title={ecommerceSeoWhyChooseData.title}
        description={ecommerceSeoWhyChooseData.description}
        features={ecommerceSeoWhyChooseData.features}
      />
      <ServiceGridSection
        title={ecommerceSeoData.title}
        description={ecommerceSeoData.description}
        services={ecommerceSeoData.items}
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
            title={<>Start Your Success Journey with eCommerce SEO</>}
            description={null}
            buttonText="Contact Us"
            buttonLink="/contact"
        />
        <ConfidenceSection
            title={
                <>Why We’re Confident About Our <br/> <strong>eCommerce SEO Services</strong></>
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
            title={<>Start Your Success Journey with eCommerce SEO</>}
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