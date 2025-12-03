import ClientsLogos from "app/components/common/ClientsLogos";
import RelatedToolsSection from "app/components/common/RelatedTools";
import ToolFeaturesSection from "app/components/common/ToolFeatures";
import ToolIntroSection from "app/components/common/ToolIntro";
import ToolStepsSection from "app/components/common/ToolSteps";
import HTMLHeadingsChecker from "app/components/tools/HTMLHeadingsChecker";
import { schemaGeneratorRelatedToolsData } from "app/data/tools/relatedToolsData";
import { htmlHeadingCheckerToolFeatures } from "app/data/tools/toolFeatures";
import { htmlHeadingCheckerToolSteps } from "app/data/tools/toolsData";
import { htmlHeadingCheckerToolIntro } from "app/data/tools/toolsIntro";

export const metadata = {
  title: "Free HTML Heading Checker – Analyze H1–H6 Structure for Better SEO",
  description:
    "Check and analyze your website’s H1–H6 heading structure with our Free HTML Heading Checker. Improve on-page SEO, content hierarchy, and user experience instantly.",
};

export default function InternalLinkAnalyzerPage() {
  return (
    <main>
       <div className="bg-[#fef7f5] pt-16 lg:pt-20">
            <h1 className="text-[#212E4A] text-4xl lg:text-7xl text-center font-extrabold leading-tight">
        Free HTML Heading{" "}
        <span className="text-[#f35d36]">Checker Tool</span>
      </h1>
      {/* Description Text */}
        <p className="text-[#606162] text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mt-4 px-4 text-center">       
            Free HTML Heading Checker Tool is a simple and effective way to analyze your website’s HTML headings. This tool ensures your headings are structured properly to enhance SEO and improve user experience.
        </p>
      {/* 2. Tool Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 ">
          <HTMLHeadingsChecker/>
        </div>
      </section>
       </div>
       {/* The Steps Section */}
      <ToolStepsSection
        title={htmlHeadingCheckerToolSteps.title}
        description={htmlHeadingCheckerToolSteps.description}
        steps={htmlHeadingCheckerToolSteps.steps}
      />
       {/* Tools Intro Section */}
      <ToolIntroSection 
        title={htmlHeadingCheckerToolIntro.title}
        description={htmlHeadingCheckerToolIntro.description}
        image={htmlHeadingCheckerToolIntro.image}
        useCasesTitle={htmlHeadingCheckerToolIntro.useCasesTitle}
        useCasesIntro={htmlHeadingCheckerToolIntro.useCasesIntro}
        useCases={htmlHeadingCheckerToolIntro.useCases}
      />
      <ClientsLogos/>
      <ToolFeaturesSection
        title={htmlHeadingCheckerToolFeatures.title}
        description={htmlHeadingCheckerToolFeatures.description}
        features={htmlHeadingCheckerToolFeatures.features}
      />
       <RelatedToolsSection
        title={schemaGeneratorRelatedToolsData.title} 
        tools={schemaGeneratorRelatedToolsData.tools} 
      />
    </main>
  );
}