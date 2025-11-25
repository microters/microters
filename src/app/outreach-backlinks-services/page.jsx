import AboutSection from "app/components/common/About";
import HeroBanner from "app/components/common/HeroBanner";
import THUMBNAIL_URL from "@assets/images/microters-company.png";
import IndustrySpecializations from "app/components/common/IndustrySpecializations";
import WhyChooseSection from "app/components/common/WhyChooseUs";
import { outreachBacklinksWhyChooseData } from "app/data/whyChooseData";
import ServiceGridSection from "app/components/common/ServiceGrid";
import { outreachBacklinkData} from "app/data/services/servicesData";
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
import { outreachBacklinksFaqData, shopifySeoFaqData } from "app/data/faq";
import AlternativesSection from "app/components/common/Alternatives";
import { outreachBacklinksData } from "app/data/services/alternativesData";

export default function Home() {
  return (
    <div>
      <HeroBanner
        isInnerPage={true}
        title={
          <>
            Get High-Authority{" "}
            <span style={{ color: "var(--color-primary)" }}>Outreach Backlinks </span>
            to Build Your Brand
          </>
        }
        description="Microters offers you powerful outreach backlinks guaranteed to make an impact in search rankings. Let our link-building masters craft outreach strategies that help you build trust and outperform competitors."
      />
      <AboutSection
        title={<>No Black-Hat Techniques- <strong className="font-extrabold">Only Ethical Backlinks</strong></>}
        subtitle={null}
        description={[
            "Acquiring outreach backlinks is pretty tough and it requires a ton of effort.  ",
            "But a lot of rip-off agencies on the internet offer high DA outreach backlinks at a shockingly cheap price.",
            "DON’T FALL FOR THEIR TRAP– they use black hat SEO like link farming, link pyramid, PBN and a whole lot more dark arts.",
            "What’s the danger with that? Well, Google flags websites that use black hat SEO which might even lead to a permanent ban on the search engine.",
            "Do you want to take that big of a risk just to save some bucks? Absolutely NO!",
            "And that’s why we only offer 100% authentic backlinks. We have a team of advanced link-building specialists who’ll put all their resources into good use and acquire demandable Do-follow backlinks.",
            "We might not offer you the cheapest backlinks in the market, but we promise to offer result-oriented and trusted outreach backlinks that put you on top of SERPs."
        ]}
        youtubeId="6UUYK4ZvB9I"
        thumbnail={THUMBNAIL_URL}
    />
    <AlternativesSection
      title={
        <>
          What Does Our <strong>Outreach Backlink Services Include?</strong>
        </>
      }
      description="Let our SEO experts work their magic and give you a full-from outreach backlink services. Here are our offerings for maximum link-building success:"
      items={outreachBacklinksData}
    />
      <IndustrySpecializations/>
       <WhyChooseSection
        title={outreachBacklinksWhyChooseData.title}
        description={outreachBacklinksWhyChooseData.description}
        features={outreachBacklinksWhyChooseData.features}
      />
      <ServiceGridSection
        title={outreachBacklinkData.title}
        description={outreachBacklinkData.description}
        services={outreachBacklinkData.items}
      />
      <ClientsLogosSection/>
      <AchievedSection/>
       <CtaSection
            title={<>Start Your Success Journey with Outreach Backlinks</>}
            description={null}
            buttonText="Contact Us"
            buttonLink="/contact"
        />
        <ConfidenceSection
            title={
                <>Why We’re Confident About Our <br/> <strong>Our Outreach Backlink Services</strong></>
            }
            description="Discover why people consider us the cream of the crop in digital marketing:"
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
              What To Expect With <br className="hidden lg:block" />
              <strong>Our Outreach Backlink Services?</strong>
            </>
          }
          description="Ready to kick start your new online venture? Before we get started, let's set some realistic expectations for what you can get from our eCommerce SEO services for new businesses."
        />
        <CtaSection
            title={<>Start Your Success Journey with Outreach Backlink Services</>}
            description="Let’s rank your website and increase online sales with proven strategies. You can rest assured, we’ll be with you every step of the way."
            buttonText="Request A Free Proposal"
            buttonLink="/send-a-proposal"
        />
        <TestimonialsSection/>
        <FAQSection
            title="FAQ" 
            description="Got questions? We've got answers! Explore our FAQ section to find solutions to common queries."
            items={outreachBacklinksFaqData}
        />
        <CtaBeforeFooter/>
    </div>
  );
}