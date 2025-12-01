import ClientsLogos from "app/components/common/ClientsLogos";
import RelatedToolsSection from "app/components/common/RelatedTools";
import ToolFeaturesSection from "app/components/common/ToolFeatures";
import ToolIntroSection from "app/components/common/ToolIntro";
import ToolStepsSection from "app/components/common/ToolSteps";
import HowToSchemaForm from "app/components/tools/HowToSchema";
import { schemaGeneratorRelatedToolsData } from "app/data/tools/relatedToolsData";
import { howToSchemaToolFeatures  } from "app/data/tools/toolFeatures";
import { howToSchemaToolSteps } from "app/data/tools/toolsData";
import { howToSchemaToolIntro } from "app/data/tools/toolsIntro";

export const metadata = {
  title: "Free How-To Schema Generator – Create JSON-LD Markup Easily",
  description:
    "Generate clean and accurate JSON-LD How-To Schema markup instantly with our free How-To Schema Generator. Boost SEO, enhance rich results, and make your step-by-step guides more visible in search engines.",
};

export default function ProductSchemaPage() {
  return (
    <main>
       <div className="bg-[#fef7f5] pt-16 lg:pt-20">
            <h1 className="text-[#212E4A] text-4xl lg:text-7xl text-center font-extrabold leading-tight">
        How To Schema{" "}
        <span className="text-[#f35d36]">Generator Tool</span>
      </h1>
      {/* Description Text */}
        <p className="text-[#606162] text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mt-4 px-4 text-center">
           The How To schema generator tool makes it easy to create structured data for step-by-step guides. It improves search visibility and ensures your content appears in rich results on search engines, making it perfect for marketers, bloggers, and content creators.
        </p>
      {/* 2. Tool Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 ">
          <HowToSchemaForm/>
        </div>
      </section>
       </div>
       {/* The Steps Section */}
      <ToolStepsSection
        title={howToSchemaToolSteps.title}
        description={howToSchemaToolSteps.description}
        steps={howToSchemaToolSteps.steps}
      />
       {/* Tools Intro Section */}
      <ToolIntroSection 
        title={howToSchemaToolIntro.title}
        description={howToSchemaToolIntro.description}
        image={howToSchemaToolIntro.image}
        useCasesTitle={howToSchemaToolIntro.useCasesTitle}
        useCasesIntro={howToSchemaToolIntro.useCasesIntro}
        useCases={howToSchemaToolIntro.useCases}
      />
      <ClientsLogos/>
      <ToolFeaturesSection
        title={howToSchemaToolFeatures.title}
        description={howToSchemaToolFeatures.description}
        features={howToSchemaToolFeatures.features}
      />
       <RelatedToolsSection
        title={schemaGeneratorRelatedToolsData.title} 
        tools={schemaGeneratorRelatedToolsData.tools} 
      />
    </main>
  );
}