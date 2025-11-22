import AboutSection from "app/components/common/About";
import HeroBanner from "app/components/common/HeroBanner";
import THUMBNAIL_URL from "@assets/images/microters-company.png";
import IndustrySpecializations from "app/components/common/IndustrySpecializations";
import WhyChooseSection from "app/components/common/WhyChooseUs";
import { seoWhyChooseData } from "app/data/whyChooseData";
import { seoProfessionalData } from "app/data/services/servicesData";
import ServiceGridSection from "app/components/common/ServiceGrid";

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
    </div>
  );
}
