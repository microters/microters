import ClientsLogos from "app/components/common/ClientsLogos";
import RelatedToolsSection from "app/components/common/RelatedTools";
import ToolFeaturesSection from "app/components/common/ToolFeatures";
import ToolIntroSection from "app/components/common/ToolIntro";
import ToolStepsSection from "app/components/common/ToolSteps";
import WebsiteSchemaForm from "app/components/tools/WebsiteSchema";
import { schemaGeneratorRelatedToolsData } from "app/data/tools/relatedToolsData";
import { websiteSchemaToolFeatures } from "app/data/tools/toolFeatures";
import { websiteSchemaToolSteps } from "app/data/tools/toolsData";
import { websiteSchemaToolIntro } from "app/data/tools/toolsIntro";

export const metadata = {
  title: "Free Website Schema Generator – Create JSON-LD Website Markup Instantly",
  description:
    "Generate accurate JSON-LD Website Schema markup easily with our Free Website Schema Generator. Improve SEO, enhance search visibility, and help search engines understand your website structure.",
};

export default function WebsiteSchemaGeneratorPage() {
  return (
    <main>
       <div className="bg-[#fef7f5] pt-16 lg:pt-20">
            <h1 className="text-[#212E4A] text-4xl lg:text-7xl text-center font-extrabold leading-tight">
        Website Schema{" "}
        <span className="text-[#f35d36]">Generator Tool</span>
      </h1>
      {/* Description Text */}
        <p className="text-[#606162] text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mt-4 px-4 text-center">
           The Website Schema Generator tool simplifies creating structured data for your website. This tool ensures search engines like Google understand your site better, improving your online visibility and boosting SEO rankings.
        </p>
      {/* 2. Tool Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 ">
          <WebsiteSchemaForm />
        </div>
      </section>
       </div>
       {/* The Steps Section */}
      <ToolStepsSection
        title={websiteSchemaToolSteps.title}
        description={websiteSchemaToolSteps.description}
        steps={websiteSchemaToolSteps.steps}
      />
       {/* Tools Intro Section */}
      <ToolIntroSection 
        title={websiteSchemaToolIntro.title}
        description={websiteSchemaToolIntro.description}
        image={websiteSchemaToolIntro.image}
        useCasesTitle={websiteSchemaToolIntro.useCasesTitle}
        useCasesIntro={websiteSchemaToolIntro.useCasesIntro}
        useCases={websiteSchemaToolIntro.useCases}
      />
      <ClientsLogos/>
      <ToolFeaturesSection
        title={websiteSchemaToolFeatures.title}
        description={websiteSchemaToolFeatures.description}
        features={websiteSchemaToolFeatures.features}
      />
       <RelatedToolsSection
        title={schemaGeneratorRelatedToolsData.title} 
        tools={schemaGeneratorRelatedToolsData.tools} 
      />
    </main>
  );
}