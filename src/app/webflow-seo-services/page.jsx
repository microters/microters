import AboutSection from "app/components/common/About";
import HeroBanner from "app/components/common/HeroBanner";
import THUMBNAIL_URL from "@assets/images/microters-company.png";
import IndustrySpecializations from "app/components/common/IndustrySpecializations";
import WhyChooseSection from "app/components/common/WhyChooseUs";
import { webFlowSeoWhyChooseData  } from "app/data/whyChooseData";
import ServiceGridSection from "app/components/common/ServiceGrid";
import { webFlowSeoData } from "app/data/services/servicesData";
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
import { webflowSeoFaqData } from "app/data/faq";
import { expectationsData } from "app/data/services/expectationsData";

export default function Home() {
  return (
    <div>
      <HeroBanner
        isInnerPage={true}
        title={
          <>
            Webflow SEO to{" "}
            <span style={{ color: "var(--color-primary)" }}>Get More Organic Traffic</span>
            <br />
            and Profit
          </>
        }
        description="Let’s help you skyrocket your online visibility with Microters Webflow SEO services. We promise to help you get ahead of your competitors by leveraging Webflow’s excellent SEO features. Team up with our Webflow SEO experts and achieve success-together!"
      />
      <AboutSection
        title={<>Hire Webflow SEO Specialists And <strong className="font-extrabold">See Magic!</strong></>}
        subtitle={null}
        description={[
            "Webflow is a no-code CMS built for every form of business. Webflow gives you some of the most advanced, built-in SEO features for organic search rankings.",
            "But can you make the most of these SEO features by yourself?",
            "Well, you can, but experts who spent years mastering Webflow SEO can get things done faster and more efficiently. Plus, you need battle-tested strategies that not only just generate traffic but make actual conversions. This is why Microters is here to help.",
            "We have handpicked some of the industry-leading Webflow SEO professionals to give you full-form Webflow SEO services that bring results. From customizable meta tags and clean URL structures to auto-generated sitemaps, we make 100% use for webflow’s SEO.",
            "Plus, we’ll not only just suggest improvements- we’ll even apply them! Our Webflow SEO experts deliver the highest level of service for one thing only- scaling your business."
        ]}
        youtubeId="6UUYK4ZvB9I"
        thumbnail={THUMBNAIL_URL}
    />
      <IndustrySpecializations/>
       <WhyChooseSection
        title={webFlowSeoWhyChooseData .title}
        description={webFlowSeoWhyChooseData .description}
        features={webFlowSeoWhyChooseData .features}
      />
      <ServiceGridSection
        title={webFlowSeoData.title}
        description={webFlowSeoData.description}
        services={webFlowSeoData.items}
      />
      <ClientsLogosSection/>
      <AchievedSection/>
      <div className="py-16 lg:py-20">
         <UniqueBlendSection
        title={
          <>
            Make the Most of Your <br />
            <strong>Webflow Website</strong>
          </>
        }
        subtitle="What makes Webflow special is its built-in SEO features. But lots of Webflow businesses can’t even use these features because of their lack of Webflow knowledge. We’re here to change that."
        description={[
          "From optimizing meta titles and alt texts to automatic SSL certificates and HTTPS, we’ll maximize our SEO efforts to rank your business higher on Google and attract more organic traffic. We use every Webflow SEO tool to its fullest potential.",
          "But we don’t stop at technical optimization. We’ll increase the loading speed and enhance user-friendly experience to keep visitors engaged.",
          "Let’s help your Webflow website shine and give your ROI a massive boost."
        ]}
      />
      </div>
       <CtaSection
            title={<>Ready to Embrace the Power of Data-driven SEO?</>}
            description={null}
            buttonText="Contact Us"
            buttonLink="/contact"
        />
        <ConfidenceSection
            title={
                <>Why We’re Confident About Our <br/> <strong>Webflow SEO Services</strong></>
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
                    What To Expect With Our <br/>
                    <strong>Webflow SEO Services?</strong>
                </>
            }
            description="Ready to kick start your new online venture? Before we get started, let's set some realistic expectations for what you can get from our eCommerce SEO services for new businesses."
            timelineItems={expectationsData}
        />
        <CtaSection
            title={<>Start Your Journey to Success with Shopify SEO</>}
            description="Let’s rank your website and increase online sales with proven strategies. You can rest assured, we’ll be with you every step of the way."
            buttonText="Request A Free Proposal"
            buttonLink="/send-a-proposal"
        />
        <TestimonialsSection/>
        <FAQSection
            title="FAQ" 
            description="Got questions? We've got answers! Explore our FAQ section to find solutions to common queries."
            items={webflowSeoFaqData}
        />
        <CtaBeforeFooter/>
    </div>
  );
}