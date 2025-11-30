import ClientsLogos from "app/components/common/ClientsLogos";
import RelatedToolsSection from "app/components/common/RelatedTools";
import ToolFeaturesSection from "app/components/common/ToolFeatures";
import ToolIntroSection from "app/components/common/ToolIntro";
import ToolStepsSection from "app/components/common/ToolSteps";
import LocalBusinessSchemaForm from "app/components/tools/LocalBusinessSchema";
import { schemaGeneratorRelatedToolsData } from "app/data/tools/relatedToolsData";
import { localBusinessSchemaToolFeatures } from "app/data/tools/toolFeatures";
import { localBusinessSchemaToolSteps } from "app/data/tools/toolsData";
import { localBusinessSchemaToolIntro } from "app/data/tools/toolsIntro";

export const metadata = {
  title: "Free Local Business Schema Generator – Create JSON-LD Local Schema Instantly",
  description:
    "Generate accurate JSON-LD Local Business Schema markup with ease. Improve local SEO, enhance search visibility, and help customers find your business online with our free Local Business Schema Generator.",
};

export default function KeywordGroupingPage() {
  return (
    <main>
       <div className="bg-[#fef7f5] pt-16 lg:pt-20">
            <h1 className="text-[#212E4A] text-4xl lg:text-7xl text-center font-extrabold leading-tight">
        Local Business{" "}
        <span className="text-[#f35d36]">Schema Generator</span>
      </h1>
      {/* Description Text */}
        <p className="text-[#606162] text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mt-4 px-4 text-center">
           The Local Business Schema tool helps businesses improve online visibility by organizing information like name, address, and contact details for search engines. It enhances local SEO performance and makes your business easier to find.
        </p>
      {/* 2. Tool Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 ">
          <LocalBusinessSchemaForm />
        </div>
      </section>
       </div>
       {/* The Steps Section */}
      <ToolStepsSection
        title={localBusinessSchemaToolSteps.title}
        description={localBusinessSchemaToolSteps.description}
        steps={localBusinessSchemaToolSteps.steps}
      />
       {/* Tools Intro Section */}
      <ToolIntroSection 
        title={localBusinessSchemaToolIntro.title}
        description={localBusinessSchemaToolIntro.description}
        image={localBusinessSchemaToolIntro.image}
        useCasesTitle={localBusinessSchemaToolIntro.useCasesTitle}
        useCasesIntro={localBusinessSchemaToolIntro.useCasesIntro}
        useCases={localBusinessSchemaToolIntro.useCases}
      />
      <ClientsLogos/>
      <ToolFeaturesSection
        title={localBusinessSchemaToolFeatures.title}
        description={localBusinessSchemaToolFeatures.description}
        features={localBusinessSchemaToolFeatures.features}
      />
       <RelatedToolsSection
        title={schemaGeneratorRelatedToolsData.title} 
        tools={schemaGeneratorRelatedToolsData.tools} 
      />
    </main>
  );
}