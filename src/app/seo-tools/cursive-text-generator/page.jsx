import ClientsLogos from "app/components/common/ClientsLogos";
import RelatedToolsSection from "app/components/common/RelatedTools";
import ToolFeaturesSection from "app/components/common/ToolFeatures";
import ToolIntroSection from "app/components/common/ToolIntro";
import ToolStepsSection from "app/components/common/ToolSteps";
import CursiveTextGenerator from "app/components/tools/CursiveTextGenerator";
import { schemaGeneratorRelatedToolsData } from "app/data/tools/relatedToolsData";
import { cursiveTextGeneratorToolFeatures } from "app/data/tools/toolFeatures";
import { cursiveTextGeneratorToolSteps } from "app/data/tools/toolsData";
import { cursiveTextGeneratorToolIntro } from "app/data/tools/toolsIntro";

export const metadata = {
  title: "Free Web Word Counter Tool | ULK Online Word & Character Counter",
  description: "Count words, characters, and keywords effortlessly using the ULK Web Word Counter Tool. Ideal for SEO, content planning, blogging, and keyword clustering.",
};

export default function WebWordCounterPage() {
  return (
    <main>
       <div className="bg-[#fef7f5] pt-16 lg:pt-20">
            <h1 className="text-[#212E4A] text-4xl lg:text-7xl text-center font-extrabold leading-tight">
        Cursive Text{" "}
        <span className="text-[#f35d36]">Generator</span>
      </h1>
      {/* Description Text */}
        <p className="text-[#606162] text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mt-4 px-4 text-center">
           The Cursive Text Generator Tool helps you convert plain text into elegant cursive fonts. This easy-to-use tool is perfect for personalizing content, creating stylish social media posts, and adding a creative touch to any text.
        </p>
      {/* 2. Tool Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 ">
          <CursiveTextGenerator />
        </div>
      </section>
       </div>
       {/* The Steps Section */}
      <ToolStepsSection
        title={cursiveTextGeneratorToolSteps.title}
        description={cursiveTextGeneratorToolSteps.description}
        steps={cursiveTextGeneratorToolSteps.steps}
      />
       {/* Tools Intro Section */}
      <ToolIntroSection 
        title={cursiveTextGeneratorToolIntro.title}
        description={cursiveTextGeneratorToolIntro.description}
        image={cursiveTextGeneratorToolIntro.image}
        useCasesTitle={cursiveTextGeneratorToolIntro.useCasesTitle}
        useCasesIntro={cursiveTextGeneratorToolIntro.useCasesIntro}
        useCases={cursiveTextGeneratorToolIntro.useCases}
      />
      <ClientsLogos/>
      <ToolFeaturesSection
        title={cursiveTextGeneratorToolFeatures.title}
        description={cursiveTextGeneratorToolFeatures.description}
        features={cursiveTextGeneratorToolFeatures.features}
      />
       <RelatedToolsSection
        title={schemaGeneratorRelatedToolsData.title} 
        tools={schemaGeneratorRelatedToolsData.tools} 
      />
    </main>
  );
}