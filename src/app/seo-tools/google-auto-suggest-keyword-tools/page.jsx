import ClientsLogos from "app/components/common/ClientsLogos";
import RelatedToolsSection from "app/components/common/RelatedTools";
import ToolFeaturesSection from "app/components/common/ToolFeatures";
import ToolIntroSection from "app/components/common/ToolIntro";
import ToolStepsSection from "app/components/common/ToolSteps";
import KeywordsExplorer from "app/components/tools/KeywordsExplorer";
import { schemaGeneratorRelatedToolsData } from "app/data/tools/relatedToolsData";
import { googleKeywordToolsFeatures } from "app/data/tools/toolFeatures";
import { googleKeywordToolsSteps } from "app/data/tools/toolsData";
import { googleKeywordToolsToolIntro } from "app/data/tools/toolsIntro";

export const metadata = {
  title: "Google Auto Suggest Keyword Tool – Free Keyword Ideas & Search Insights",
  description:
    "Discover high-intent keyword ideas instantly with our Google Auto Suggest Keyword Tool. Generate real-time keyword suggestions to improve SEO, content planning, and search visibility.",
};

export default function FAQSchemaGeneratorPage() {
  return (
    <main>
       <div className="bg-[#fef7f5] pt-16 lg:pt-20">
           <div className="max-w-5xl mx-auto">
               <h1 className="text-[#212E4A] text-4xl lg:text-7xl text-center font-extrabold leading-tight">
        Google Auto Suggest{" "}
        <span className="text-[#f35d36]">Keyword Tools</span>
      </h1>
      {/* Description Text */}
        <p className="text-[#606162] text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mt-4 px-4 text-center">
           Google Auto Suggest Keyword Tools help users discover relevant keywords and phrases that align with search intent. They provide insights to optimize content strategies and enhance visibility in search engine results, making them an essential tool for marketers and content creators.
        </p>
           </div>
      {/* 2. Tool Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 ">
          <KeywordsExplorer />
        </div>
      </section>
       </div>
       {/* The Steps Section */}
      <ToolStepsSection
        title={googleKeywordToolsSteps.title}
        description={googleKeywordToolsSteps.description}
        steps={googleKeywordToolsSteps.steps}
      />
       {/* Tools Intro Section */}
      <ToolIntroSection 
        title={googleKeywordToolsToolIntro.title}
        description={googleKeywordToolsToolIntro.description}
        image={googleKeywordToolsToolIntro.image}
        useCasesTitle={googleKeywordToolsToolIntro.useCasesTitle}
        useCasesIntro={googleKeywordToolsToolIntro.useCasesIntro}
        useCases={googleKeywordToolsToolIntro.useCases}
      />
      <ClientsLogos/>
      <ToolFeaturesSection
        title={googleKeywordToolsFeatures.title}
        description={googleKeywordToolsFeatures.description}
        features={googleKeywordToolsFeatures.features}
      />
       <RelatedToolsSection
        title={schemaGeneratorRelatedToolsData.title} 
        tools={schemaGeneratorRelatedToolsData.tools} 
      />
    </main>
  );
}