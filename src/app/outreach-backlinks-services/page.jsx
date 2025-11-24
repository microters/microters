import AboutSection from "app/components/common/About";
import HeroBanner from "app/components/common/HeroBanner";
import THUMBNAIL_URL from "@assets/images/microters-company.png";
import IndustrySpecializations from "app/components/common/IndustrySpecializations";
import WhyChooseSection from "app/components/common/WhyChooseUs";
import { seoWhyChooseData } from "app/data/whyChooseData";
import ServiceGridSection from "app/components/common/ServiceGrid";
import { shopifySeoData } from "app/data/services/servicesData";
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
import { shopifySeoFaqData } from "app/data/faq";

export default function Home() {
  return (
    <div>
      <HeroBanner
        isInnerPage={true}
        title={
          <>
            Skyrocket Your Organic Traffic Growth with{" "}
            <span style={{ color: "var(--color-primary)" }}>Strategic Shopify SEO </span>
          </>
        }
        description="Let our Shopify SEO experts boost your sales with organic search traffic- no costly paid ads needed. Rank your online store higher on SERPs and increase conversion rates through our proven strategy, ready to deliver results."
      />
      <AboutSection
        title={<>Paid Ads Failing? <strong className="font-extrabold">Try Shopify SEO</strong></>}
        subtitle={null}
        description={[
            "Let’s face the facts. If you want to draw immediate sales impact, paid advertising is the way to go. But are paid ads sustainable? Absolutely not! You have to spend consistently to stay visible and lose a ton of money over time.",
            "This is why industry experts recommend implementing specialized SEO strategies for Shopify stores. Not only that, about 46% of customers find organic search results to be more trustworthy than paid ads.",
            "Microters is here to give you a full-form Shopify SEO service that saves you money, and provides a sustainable solution with organic traffic.",
            "From fixing broken links to crafting engaging and trustworthy content, we’ll optimize your Shopify store to generate long-term results without paid ads.",
            "Let’s build your store’s credibility and dominate the organic search, together!"
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
        title={shopifySeoData.title}
        description={shopifySeoData.description}
        services={shopifySeoData.items}
      />
      <ClientsLogosSection/>
      <AchievedSection/>
      <div className="py-16 lg:py-20">
         <UniqueBlendSection
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
      </div>
       <CtaSection
            title={<>Ready to Embrace the Power of Data-driven SEO?</>}
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
            title={<>Start Your Journey to Success with Shopify SEO</>}
            description="Let’s rank your website and increase online sales with proven strategies. You can rest assured, we’ll be with you every step of the way."
            buttonText="Request A Free Proposal"
            buttonLink="/send-a-proposal"
        />
        <TestimonialsSection/>
        <FAQSection
            title="FAQ" 
            description="Got questions? We've got answers! Explore our FAQ section to find solutions to common queries."
            items={shopifySeoFaqData}
        />
        <CtaBeforeFooter/>
    </div>
  );
}