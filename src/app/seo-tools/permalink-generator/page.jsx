import ClientsLogos from "app/components/common/ClientsLogos";
import RelatedToolsSection from "app/components/common/RelatedTools";
import ToolFeaturesSection from "app/components/common/ToolFeatures";
import ToolIntroSection from "app/components/common/ToolIntro";
import ToolStepsSection from "app/components/common/ToolSteps";
import PermalinkGenerator from "app/components/tools/PermalinkGenerator";
import { schemaGeneratorRelatedToolsData } from "app/data/tools/relatedToolsData";
import { permalinkGeneratorToolFeatures  } from "app/data/tools/toolFeatures";
import { permalinkGeneratorToolSteps } from "app/data/tools/toolsData";
import { permalinkGeneratorToolIntro } from "app/data/tools/toolsIntro";

export const metadata = {
  title: "Free Permalink Generator – Create Clean SEO-Friendly URLs",
  description:
    "Generate clean, readable, and SEO-friendly permalinks instantly with our Free Permalink Generator. Perfect for blogs, websites, and marketing content—optimize your URLs for better search visibility and user experience.",
};

export default function OrganizationSchemaPage() {
  return (
    <main>
       <div className="bg-[#fef7f5] pt-16 lg:pt-20">
            <h1 className="text-[#212E4A] text-4xl lg:text-7xl text-center font-extrabold leading-tight">
        Free Permalink{" "}
        <span className="text-[#f35d36]">Generator Tool</span>
      </h1>
      {/* Description Text */}
        <p className="text-[#606162] text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mt-4 px-4 text-center">
           A Free Permalink Generator Tool simplifies creating clean, user-friendly URLs for your web content. It’s essential for improving website SEO, enhancing user experience, and making your content shareable across platforms.
        </p>
      {/* 2. Tool Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 ">
          <PermalinkGenerator/>
        </div>
      </section>
       </div>
       {/* The Steps Section */}
      <ToolStepsSection
        title={permalinkGeneratorToolSteps.title}
        description={permalinkGeneratorToolSteps.description}
        steps={permalinkGeneratorToolSteps.steps}
      />
       {/* Tools Intro Section */}
      <ToolIntroSection 
        title={permalinkGeneratorToolIntro.title}
        description={permalinkGeneratorToolIntro.description}
        image={permalinkGeneratorToolIntro.image}
        useCasesTitle={permalinkGeneratorToolIntro.useCasesTitle}
        useCasesIntro={permalinkGeneratorToolIntro.useCasesIntro}
        useCases={permalinkGeneratorToolIntro.useCases}
      />
      <ClientsLogos/>
      <ToolFeaturesSection
        title={permalinkGeneratorToolFeatures.title}
        description={permalinkGeneratorToolFeatures.description}
        features={permalinkGeneratorToolFeatures.features}
      />
       <RelatedToolsSection
        title={schemaGeneratorRelatedToolsData.title} 
        tools={schemaGeneratorRelatedToolsData.tools} 
      />
    </main>
  );
}