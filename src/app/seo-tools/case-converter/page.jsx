import ClientsLogos from "app/components/common/ClientsLogos";
import RelatedToolsSection from "app/components/common/RelatedTools";
import ToolFeaturesSection from "app/components/common/ToolFeatures";
import ToolIntroSection from "app/components/common/ToolIntro";
import ToolStepsSection from "app/components/common/ToolSteps";
import ArticleSchema from "app/components/tools/ArticleSchema";
import CaseConverter from "app/components/tools/CaseConverter";
import { schemaGeneratorRelatedToolsData } from "app/data/tools/relatedToolsData";
import { caseConverterToolFeatures } from "app/data/tools/toolFeatures";
import { caseConverterToolSteps } from "app/data/tools/toolsData";
import { caseConverterToolIntro } from "app/data/tools/toolsIntro";

export const metadata = {
  title: "Free Schema Markup Generator Tool | JSON-LD | Microters",
  description: "Create structured data for your website instantly. Boost your SEO with our free Schema Generator Tool. Supports Article, FAQ, Product, and more without coding.",
};

export default function CaseConverterPage() {
  return (
    <main>
       <div className="bg-[#fef7f5] pt-16 lg:pt-20">
            <h1 className="text-[#212E4A] text-4xl lg:text-7xl text-center font-extrabold leading-tight">
        Free Case{" "}
        <span className="text-[#f35d36]">Converter Tool</span>
      </h1>
      {/* Description Text */}
        <p className="text-[#606162] text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mt-4 px-4 text-center">
           The Free Case Converter Tool is a simple and efficient way to change text formatting instantly. It helps you switch between uppercase, lowercase, sentence case, and more, saving time and effort for a variety of projects.
        </p>
      {/* 2. Tool Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 ">
          <CaseConverter />
        </div>
      </section>
       </div>
       {/* The Steps Section */}
      <ToolStepsSection
        title={caseConverterToolSteps.title}
        description={caseConverterToolSteps.description}
        steps={caseConverterToolSteps.steps}
      />
       {/* Tools Intro Section */}
      <ToolIntroSection 
        title={caseConverterToolIntro.title}
        description={caseConverterToolIntro.description}
        image={caseConverterToolIntro.image}
        useCasesTitle={caseConverterToolIntro.useCasesTitle}
        useCasesIntro={caseConverterToolIntro.useCasesIntro}
        useCases={caseConverterToolIntro.useCases}
      />
      <ClientsLogos/>
      <ToolFeaturesSection
        title={caseConverterToolFeatures.title}
        description={caseConverterToolFeatures.description}
        features={caseConverterToolFeatures.features}
      />
       <RelatedToolsSection
        title={schemaGeneratorRelatedToolsData.title} 
        tools={schemaGeneratorRelatedToolsData.tools} 
      />
    </main>
  );
}