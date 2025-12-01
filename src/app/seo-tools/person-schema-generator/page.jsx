import ClientsLogos from "app/components/common/ClientsLogos";
import RelatedToolsSection from "app/components/common/RelatedTools";
import ToolFeaturesSection from "app/components/common/ToolFeatures";
import ToolIntroSection from "app/components/common/ToolIntro";
import ToolStepsSection from "app/components/common/ToolSteps";
import PersonSchemaForm from "app/components/tools/PersonSchema";
import { schemaGeneratorRelatedToolsData } from "app/data/tools/relatedToolsData";
import { personSchemaToolFeatures  } from "app/data/tools/toolFeatures";
import { personSchemaToolSteps } from "app/data/tools/toolsData";
import { personSchemaToolIntro } from "app/data/tools/toolsIntro";

export const metadata = {
  title: "Free Person Schema Generator – Create JSON-LD Markup Instantly",
  description:
    "Generate accurate JSON-LD Person Schema markup instantly with our free Person Schema Generator. Improve search visibility, enhance personal branding, and help search engines understand your profile with clean structured data.",
};

export default function PersonSchemaPage() {
  return (
    <main>
       <div className="bg-[#fef7f5] pt-16 lg:pt-20">
            <h1 className="text-[#212E4A] text-4xl lg:text-7xl text-center font-extrabold leading-tight">
        Person Schema{" "}
        <span className="text-[#f35d36]">Generator</span>
      </h1>
      {/* Description Text */}
        <p className="text-[#606162] text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mt-4 px-4 text-center">
           The Person Schema Generator Tool makes it simple to create structured data for personal profiles, helping search engines understand and showcase information effectively. It improves visibility and credibility online.
        </p>
      {/* 2. Tool Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 ">
          <PersonSchemaForm/>
        </div>
      </section>
       </div>
       {/* The Steps Section */}
      <ToolStepsSection
        title={personSchemaToolSteps.title}
        description={personSchemaToolSteps.description}
        steps={personSchemaToolSteps.steps}
      />
       {/* Tools Intro Section */}
      <ToolIntroSection 
        title={personSchemaToolIntro.title}
        description={personSchemaToolIntro.description}
        image={personSchemaToolIntro.image}
        useCasesTitle={personSchemaToolIntro.useCasesTitle}
        useCasesIntro={personSchemaToolIntro.useCasesIntro}
        useCases={personSchemaToolIntro.useCases}
      />
      <ClientsLogos/>
      <ToolFeaturesSection
        title={personSchemaToolFeatures.title}
        description={personSchemaToolFeatures.description}
        features={personSchemaToolFeatures.features}
      />
       <RelatedToolsSection
        title={schemaGeneratorRelatedToolsData.title} 
        tools={schemaGeneratorRelatedToolsData.tools} 
      />
    </main>
  );
}