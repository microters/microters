import ClientsLogos from "app/components/common/ClientsLogos";
import RelatedToolsSection from "app/components/common/RelatedTools";
import ToolFeaturesSection from "app/components/common/ToolFeatures";
import ToolIntroSection from "app/components/common/ToolIntro";
import ToolStepsSection from "app/components/common/ToolSteps";
import KeywordClusteringTool from "app/components/tools/KeywordClusteringTool";
import { schemaGeneratorRelatedToolsData } from "app/data/tools/relatedToolsData";
import { keywordClusteringToolFeatures } from "app/data/tools/toolFeatures";
import { keywordClusteringToolSteps } from "app/data/tools/toolsData";
import { keywordClusteringToolIntro } from "app/data/tools/toolsIntro";

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
        Free Keyword{" "}
        <span className="text-[#f35d36]">Clustering Tool</span>
      </h1>
      {/* Description Text */}
        <p className="text-[#606162] text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mt-4 px-4 text-center">
           The Free Keyword Clustering Tool helps you organize keywords effortlessly. It’s perfect for marketers, bloggers, and anyone who needs a fast, effective way to group keywords for SEO or content creation. This tool simplifies the keyword clustering process, ensuring better search engine results and a more targeted audience reach.
        </p>
      {/* 2. Tool Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 ">
          <KeywordClusteringTool />
        </div>
      </section>
       </div>
       {/* The Steps Section */}
      <ToolStepsSection
        title={keywordClusteringToolSteps.title}
        description={keywordClusteringToolSteps.description}
        steps={keywordClusteringToolSteps.steps}
      />
       {/* Tools Intro Section */}
      <ToolIntroSection 
        title={keywordClusteringToolIntro.title}
        description={keywordClusteringToolIntro.description}
        image={keywordClusteringToolIntro.image}
        useCasesTitle={keywordClusteringToolIntro.useCasesTitle}
        useCasesIntro={keywordClusteringToolIntro.useCasesIntro}
        useCases={keywordClusteringToolIntro.useCases}
      />
      <ClientsLogos/>
      <ToolFeaturesSection
        title={keywordClusteringToolFeatures.title}
        description={keywordClusteringToolFeatures.description}
        features={keywordClusteringToolFeatures.features}
      />
       <RelatedToolsSection
        title={schemaGeneratorRelatedToolsData.title} 
        tools={schemaGeneratorRelatedToolsData.tools} 
      />
    </main>
  );
}