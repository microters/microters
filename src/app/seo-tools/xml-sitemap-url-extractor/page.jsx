import ClientsLogos from "app/components/common/ClientsLogos";
import RelatedToolsSection from "app/components/common/RelatedTools";
import ToolFeaturesSection from "app/components/common/ToolFeatures";
import ToolIntroSection from "app/components/common/ToolIntro";
import ToolStepsSection from "app/components/common/ToolSteps";
import SitemapKeywordExtractor from "app/components/tools/SitemapKeywordExtractor";
import { schemaGeneratorRelatedToolsData } from "app/data/tools/relatedToolsData";
import { sitemapExtractorToolFeatures } from "app/data/tools/toolFeatures";
import { sitemapExtractorToolSteps } from "app/data/tools/toolsData";
import { sitemapExtractorToolIntro } from "app/data/tools/toolsIntro";

export const metadata = {
  title: "Free XML Sitemap URL Extractor – Extract URLs from XML Sitemaps Instantly",
  description:
    "Easily extract all URLs from any XML sitemap with our Free XML Sitemap URL Extractor. Perfect for SEO audits, keyword clustering, site analysis, and content planning.",
};

export default function SiteMapUrlExtractorPage() {
  return (
    <main>
       <div className="bg-[#fef7f5] pt-16 lg:pt-20">
            <h1 className="text-[#212E4A] text-4xl lg:text-7xl text-center font-extrabold leading-tight">
        Free XML Sitemap{" "}
        <span className="text-[#f35d36]">URL Extractor</span>
      </h1>
      {/* Description Text */}
        <p className="text-[#606162] text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mt-4 px-4 text-center">
           The Free XML Sitemap URL Extractor is a simple yet powerful tool that helps you extract URLs from XML sitemaps. It’s designed for users who want quick and efficient access to sitemap data for keyword clustering, SEO optimization, and more.
        </p>
      {/* 2. Tool Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 ">
          <SitemapKeywordExtractor />
        </div>
      </section>
       </div>
       {/* The Steps Section */}
      <ToolStepsSection
        title={sitemapExtractorToolSteps.title}
        description={sitemapExtractorToolSteps.description}
        steps={sitemapExtractorToolSteps.steps}
      />
       {/* Tools Intro Section */}
      <ToolIntroSection 
        title={sitemapExtractorToolIntro.title}
        description={sitemapExtractorToolIntro.description}
        image={sitemapExtractorToolIntro.image}
        useCasesTitle={sitemapExtractorToolIntro.useCasesTitle}
        useCasesIntro={sitemapExtractorToolIntro.useCasesIntro}
        useCases={sitemapExtractorToolIntro.useCases}
      />
      <ClientsLogos/>
      <ToolFeaturesSection
        title={sitemapExtractorToolFeatures.title}
        description={sitemapExtractorToolFeatures.description}
        features={sitemapExtractorToolFeatures.features}
      />
       <RelatedToolsSection
        title={schemaGeneratorRelatedToolsData.title} 
        tools={schemaGeneratorRelatedToolsData.tools} 
      />
    </main>
  );
}