import AboutSection from "app/components/common/About";
import HeroBanner from "app/components/common/HeroBanner";
import THUMBNAIL_URL from "@assets/images/microters-company.png";
import IndustrySpecializations from "app/components/common/IndustrySpecializations";
import WhyChooseSection from "app/components/common/WhyChooseUs";
import { healthcareSeoWhyChooseData } from "app/data/whyChooseData";
import ServiceGridSection from "app/components/common/ServiceGrid";
import { healthcareSeoData } from "app/data/services/servicesData";
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
import { healthcareSeoFaqData} from "app/data/faq";

export default function Home() {
  return (
    <div>
      <HeroBanner
        isInnerPage={true}
        title={
          <>
            Healthcare SEO:{" "}
            <span style={{ color: "var(--color-primary)" }}>Get More Traffic, More Patients,</span>
            <br />
            and More Treatments
          </>
        }
        description="Grow your organic search traffic and reach more patients. We offer specialized healthcare SEO services that help patients find your organization. Let’s collaborate with Microters to rank your healthcare company higher on SERPs and get quality leads- all at once."
      />
      <AboutSection
        title={<>Healthcare SEO for <strong className="font-extrabold">Maximum Patient Satisfaction</strong></>}
        subtitle={null}
        description={[
            "According to research, people make 50 billion searches on Google every month, and 7% of them are related to healthcare. It’s a clear sign that people with health issues are searching for solutions online. Be their guide by ranking higher on organic searches.",
            "But how to dominate the SERPs? You can leave that to us. Our healthcare SEO experts will craft scalable SEO strategies that not only just beat competitors on search engines, but answers to the search queries of the patients.",
            "From simple SEO audits to full-form SEO service, Microters helps you achieve your healthcare organization’s  goals. Put your faith in us and we’ll deliver results that lead to maximum ROI."
        ]}
        youtubeId="6UUYK4ZvB9I"
        thumbnail={THUMBNAIL_URL}
    />
      <IndustrySpecializations/>
       <WhyChooseSection
        title={healthcareSeoWhyChooseData.title}
        description={healthcareSeoWhyChooseData.description}
        features={healthcareSeoWhyChooseData.features}
      />
      <ServiceGridSection
        title={healthcareSeoData.title}
        description={healthcareSeoData.description}
        services={healthcareSeoData.items}
      />
      <ClientsLogosSection/>
      <AchievedSection/>
      <div className="py-16 lg:py-20">
         <UniqueBlendSection
        title={
          <>
            Bring Local Patients to <br />
            <strong>Your Doorstep</strong>
          </>
        }
        subtitle="As a healthcare service provider, your first priority should be serving patients located within a 20-minute driving distance from your facility. But how would you reach them? That’s why we’re here, offering you effective local SEO strategies for the healthcare industry."
        description={[
          "We’ll target relevant local keywords to rank you higher on local search results. Our team will create dedicated website pages for your preferred location.",
          "We’ll optimize your Google Business Profile for local searches, making it easier for people to find your location on Google. Our team will also work on online review management, where people can input their experience with your services. This helps you build credibility and authority online.",
          "So what are you waiting for? Contact us right now and get maximum visibility in your vicinity!"
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
                <>Why We’re Confident About Our <br/> <strong>healthcare SEO Services</strong></>
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
              <strong>Healthcare SEO Services?</strong>
            </>
          }
          description="Ready to kick start your new online venture? Before we get started, let's set some realistic expectations for what you can get from our eCommerce SEO services for new businesses."
        />
        <CtaSection
            title={<>Start Your Journey to Success with healthcare SEO</>}
            description="Let’s rank your website and increase online sales with proven strategies. You can rest assured, we’ll be with you every step of the way."
            buttonText="Request A Free Proposal"
            buttonLink="/send-a-proposal"
        />
        <TestimonialsSection/>
        <FAQSection
            title="FAQ" 
            description="Got questions? We've got answers! Explore our FAQ section to find solutions to common queries."
            items={healthcareSeoFaqData}
        />
        <CtaBeforeFooter/>
    </div>
  );
}