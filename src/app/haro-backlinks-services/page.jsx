import AboutSection from "app/components/common/About";
import HeroBanner from "app/components/common/HeroBanner";
import THUMBNAIL_URL from "@assets/images/microters-company.png";
import IndustrySpecializations from "app/components/common/IndustrySpecializations";
import WhyChooseSection from "app/components/common/WhyChooseUs";
import { haroBacklinksWhyChooseData } from "app/data/whyChooseData";
import ServiceGridSection from "app/components/common/ServiceGrid";
import { haroBacklinksData } from "app/data/services/servicesData";
import ClientsLogosSection from "app/components/home/ClientLogos";
import AchievedSection from "app/components/common/Achieved";
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
import { haroBacklinksFaqData } from "app/data/faq";
import AlternativesSection from "app/components/common/Alternatives";
import optimizedContentImg from "@assets/images/haro.png";

export default function Home() {
  return (
    <div>
      <HeroBanner
        isInnerPage={true}
        title={
          <>
            HARO Backlinks for{" "}
            <span style={{ color: "var(--color-primary)" }}>Powerful Authority and Unmatched </span>
            Rankings
          </>
        }
        description="Want to become a recognized expert in your niche? We’ll help you get featured in prominent media outlets and authoritative publications. Our high-DA HARO backlinks will boost your search rankings and help you gain authority in your relevant field- guaranteed."
      />
      <AboutSection
        title={<><strong className="font-extrabold">What is HARO?</strong></>}
        subtitle={null}
        description={[
            "Journalists often have to write on different topics and sometimes they need expert opinions or insights to make their content more reliable and credible in the eyes of the readers.",
            "But how can they find experts in a specific industry? One answer: Help a Reporter Out (HARO) or Connectively.  It’s basically a platform that connects journalists with experts.",
            "If journalists need expertise on a specific topic, they send queries on the platform and receive multiple responses from relevant industry experts. They then decide which responses to us and in return, they link the sources’ website in their content.",
            "The responder gets to be featured in a high-DA website and the journalists get to increase their credibility."
        ]}
        youtubeId="6UUYK4ZvB9I"
        thumbnail={THUMBNAIL_URL}
    />
         <UniqueBlendSection
            bgColor="bg-[#feefeb]"
            padding="py-16 lg:py-20"
            imageSrc={optimizedContentImg}
            title={
              <>
                Optimized Content that Not Only <br />
                <strong>Hooks, But Converts</strong>
              </>
            }
            subtitle="Search engine ranking can only get you traffic, but what about conversion? Without making actual sales, your website traffic isn’t worth much."
            description={[
              "Our content team understands this and that’s why we’ll craft content targets specific search terms across search engines. We'll optimize every single webpage and produce engaging content that resonates with the customers. From product titles, page schema to product descriptions, we’ll craft content following google’s guidelines.",
              "That’s not all, we’ll keep monitoring the existing content performance and modify content to make sure that the visitors convert into actual paid customers.",
            ]}
      />
     <AlternativesSection/>
      <IndustrySpecializations/>
       <WhyChooseSection
        title={haroBacklinksWhyChooseData.title}
        description={haroBacklinksWhyChooseData.description}
        features={haroBacklinksWhyChooseData.features}
      />
      <ServiceGridSection
        title={haroBacklinksData.title}
        description={haroBacklinksData.description}
        services={haroBacklinksData.items}
      />
      <ClientsLogosSection/>
      <AchievedSection/>
       <CtaSection
            title={<>Start Your Success Journey with HARO Backlinks</>}
            description={null}
            buttonText="Contact Us"
            buttonLink="/contact"
        />
        <ConfidenceSection
            title={
                <>Why We’re Confident About Our <br/> <strong>HARO Backlinks Services</strong></>
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
         <ExpectationsSection 
          title={
            <>
              What To Expect With Our <br className="hidden lg:block" />
              <strong>HARO Backlinks Services?</strong>
            </>
          }
          description="Ready to kick start your new online venture? Before we get started, let's set some realistic expectations for what you can get from our eCommerce SEO services for new businesses."
        />
        <CtaSection
            title={<>Start Your Success Journey with HARO Backlinks</>}
            description="Let’s rank your website and increase online sales with proven strategies. You can rest assured, we’ll be with you every step of the way."
            buttonText="Request A Free Proposal"
            buttonLink="/send-a-proposal"
        />
        <TestimonialsSection/>
        <FAQSection
            title="FAQ" 
            description="Got questions? We've got answers! Explore our FAQ section to find solutions to common queries."
            items={haroBacklinksFaqData}
        />
        <CtaBeforeFooter/>
    </div>
  );
}