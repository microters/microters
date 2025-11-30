import ClientsLogos from "app/components/common/ClientsLogos";
import RelatedToolsSection from "app/components/common/RelatedTools";
import ToolFeaturesSection from "app/components/common/ToolFeatures";
import ToolIntroSection from "app/components/common/ToolIntro";
import ToolStepsSection from "app/components/common/ToolSteps";
import KeywordGroupingTool from "app/components/tools/KeywordGroupingTool";
import { schemaGeneratorRelatedToolsData } from "app/data/tools/relatedToolsData";
import { keywordGroupingToolFeatures } from "app/data/tools/toolFeatures";
import { keywordGroupingToolSteps } from "app/data/tools/toolsData";
import { keywordGroupingToolIntro } from "app/data/tools/toolsIntro";

export const metadata = {
  title: "Free Keyword Grouping Tool – Cluster Keywords by Relevance Instantly",
  description:
    "Group and cluster keywords effortlessly with our Free Keyword Grouping Tool. Improve SEO planning, content strategy, and keyword organization with fast, accurate grouping.",
};

export default function KeywordGroupingPage() {
  return (
    <main>
       <div className="bg-[#fef7f5] pt-16 lg:pt-20">
            <h1 className="text-[#212E4A] text-4xl lg:text-7xl text-center font-extrabold leading-tight">
        FREE Keyword{" "}
        <span className="text-[#f35d36]">Grouping Tool</span>
      </h1>
      {/* Description Text */}
        <p className="text-[#606162] text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mt-4 px-4 text-center">
           The FREE Keyword Grouping Tool is designed to simplify your keyword organization process. It helps users group related keywords efficiently, improving SEO strategies and making content creation easier.
        </p>
      {/* 2. Tool Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 ">
          <KeywordGroupingTool />
        </div>
      </section>
       </div>
       {/* The Steps Section */}
      <ToolStepsSection
        title={keywordGroupingToolSteps.title}
        description={keywordGroupingToolSteps.description}
        steps={keywordGroupingToolSteps.steps}
      />
       {/* Tools Intro Section */}
      <ToolIntroSection 
        title={keywordGroupingToolIntro.title}
        description={keywordGroupingToolIntro.description}
        image={keywordGroupingToolIntro.image}
        useCasesTitle={keywordGroupingToolIntro.useCasesTitle}
        useCasesIntro={keywordGroupingToolIntro.useCasesIntro}
        useCases={keywordGroupingToolIntro.useCases}
      />
      <ClientsLogos/>
      <ToolFeaturesSection
        title={keywordGroupingToolFeatures.title}
        description={keywordGroupingToolFeatures.description}
        features={keywordGroupingToolFeatures.features}
      />
       <RelatedToolsSection
        title={schemaGeneratorRelatedToolsData.title} 
        tools={schemaGeneratorRelatedToolsData.tools} 
      />
    </main>
  );
}