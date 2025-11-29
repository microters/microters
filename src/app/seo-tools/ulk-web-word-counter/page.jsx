import ClientsLogos from "app/components/common/ClientsLogos";
import RelatedToolsSection from "app/components/common/RelatedTools";
import ToolFeaturesSection from "app/components/common/ToolFeatures";
import ToolIntroSection from "app/components/common/ToolIntro";
import ToolStepsSection from "app/components/common/ToolSteps";
import StaticTextWordCounter from "app/components/tools/StaticTextWordCounter";
import { schemaGeneratorRelatedToolsData } from "app/data/tools/relatedToolsData";
import { ulkWebWordCounterToolFeatures } from "app/data/tools/toolFeatures";
import { ulkWebWordCounterToolSteps } from "app/data/tools/toolsData";
import { ulkWebWordCounterToolIntro } from "app/data/tools/toolsIntro";

export const metadata = {
  title: "Free Web Word Counter Tool | ULK Online Word & Character Counter",
  description: "Count words, characters, and keywords effortlessly using the ULK Web Word Counter Tool. Ideal for SEO, content planning, blogging, and keyword clustering.",
};

export default function WebWordCounterPage() {
  return (
    <main>
       <div className="bg-[#fef7f5] pt-16 lg:pt-20">
            <h1 className="text-[#212E4A] text-4xl lg:text-7xl text-center font-extrabold leading-tight">
        ULK Web Word{" "}
        <span className="text-[#f35d36]">Counter Tool</span>
      </h1>
      {/* Description Text */}
        <p className="text-[#606162] text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mt-4 px-4 text-center">
           The ULK Web Word Counter Tool is a free and easy-to-use tool for keyword clustering. It simplifies keyword research and grouping to help users improve their SEO strategies and content planning.
        </p>
      {/* 2. Tool Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 ">
          <StaticTextWordCounter />
        </div>
      </section>
       </div>
       {/* The Steps Section */}
      <ToolStepsSection
        title={ulkWebWordCounterToolSteps.title}
        description={ulkWebWordCounterToolSteps.description}
        steps={ulkWebWordCounterToolSteps.steps}
      />
       {/* Tools Intro Section */}
      <ToolIntroSection 
        title={ulkWebWordCounterToolIntro.title}
        description={ulkWebWordCounterToolIntro.description}
        image={ulkWebWordCounterToolIntro.image}
        useCasesTitle={ulkWebWordCounterToolIntro.useCasesTitle}
        useCasesIntro={ulkWebWordCounterToolIntro.useCasesIntro}
        useCases={ulkWebWordCounterToolIntro.useCases}
      />
      <ClientsLogos/>
      <ToolFeaturesSection
        title={ulkWebWordCounterToolFeatures.title}
        description={ulkWebWordCounterToolFeatures.description}
        features={ulkWebWordCounterToolFeatures.features}
      />
       <RelatedToolsSection
        title={schemaGeneratorRelatedToolsData.title} 
        tools={schemaGeneratorRelatedToolsData.tools} 
      />
    </main>
  );
}