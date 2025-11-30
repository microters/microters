import ClientsLogos from "app/components/common/ClientsLogos";
import RelatedToolsSection from "app/components/common/RelatedTools";
import ToolFeaturesSection from "app/components/common/ToolFeatures";
import ToolIntroSection from "app/components/common/ToolIntro";
import ToolStepsSection from "app/components/common/ToolSteps";
import MetaTagsChecker from "app/components/tools/MetaTagsChecker";
import { schemaGeneratorRelatedToolsData } from "app/data/tools/relatedToolsData";
import { metaTagsCheckerToolFeatures } from "app/data/tools/toolFeatures";
import { metaTagsCheckerToolSteps } from "app/data/tools/toolsData";
import { metaTagsCheckerToolIntro } from "app/data/tools/toolsIntro";

export const metadata = {
  title: "Free Local Business Schema Generator – Create JSON-LD Local Schema Instantly",
  description:
    "Generate accurate JSON-LD Local Business Schema markup with ease. Improve local SEO, enhance search visibility, and help customers find your business online with our free Local Business Schema Generator.",
};

export default function MetaTagsCheckerPage() {
  return (
    <main>
       <div className="bg-[#fef7f5] pt-16 lg:pt-20">
            <h1 className="text-[#212E4A] text-4xl lg:text-7xl text-center font-extrabold leading-tight">
        Meta Tags{" "}
        <span className="text-[#f35d36]">Checker Tool</span>
      </h1>
      {/* Description Text */}
        <p className="text-[#606162] text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mt-4 px-4 text-center">
           Meta Tags Checker Tool helps you analyze and optimize your website’s meta tags for better search engine rankings. This free tool ensures your tags align with best practices, improving your site’s visibility and engagement.
        </p>
      {/* 2. Tool Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 ">
          <MetaTagsChecker/>
        </div>
      </section>
       </div>
       {/* The Steps Section */}
      <ToolStepsSection
        title={metaTagsCheckerToolSteps.title}
        description={metaTagsCheckerToolSteps.description}
        steps={metaTagsCheckerToolSteps.steps}
      />
       {/* Tools Intro Section */}
      <ToolIntroSection 
        title={metaTagsCheckerToolIntro.title}
        description={metaTagsCheckerToolIntro.description}
        image={metaTagsCheckerToolIntro.image}
        useCasesTitle={metaTagsCheckerToolIntro.useCasesTitle}
        useCasesIntro={metaTagsCheckerToolIntro.useCasesIntro}
        useCases={metaTagsCheckerToolIntro.useCases}
      />
      <ClientsLogos/>
      <ToolFeaturesSection
        title={metaTagsCheckerToolFeatures.title}
        description={metaTagsCheckerToolFeatures.description}
        features={metaTagsCheckerToolFeatures.features}
      />
       <RelatedToolsSection
        title={schemaGeneratorRelatedToolsData.title} 
        tools={schemaGeneratorRelatedToolsData.tools} 
      />
    </main>
  );
}