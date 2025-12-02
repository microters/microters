import ClientsLogos from "app/components/common/ClientsLogos";
import RelatedToolsSection from "app/components/common/RelatedTools";
import ToolFeaturesSection from "app/components/common/ToolFeatures";
import ToolIntroSection from "app/components/common/ToolIntro";
import ToolStepsSection from "app/components/common/ToolSteps";
import TitleGenerator from "app/components/tools/TitleGenerator";
import { schemaGeneratorRelatedToolsData } from "app/data/tools/relatedToolsData";
import { titleGeneratorToolFeatures } from "app/data/tools/toolFeatures";
import { titleGeneratorToolSteps } from "app/data/tools/toolsData";
import { titleGeneratorToolIntro } from "app/data/tools/toolsIntro";

export const metadata = {
  title: "Free AI Title Generator – Create Catchy & Engaging Titles Instantly",
  description:
    "Generate creative, engaging, and SEO-friendly titles in seconds with our Free AI Title Generator. Perfect for blogs, articles, social media, videos, and marketing content.",
};

export default function TitleGeneratorPage() {
  return (
    <main>
       <div className="bg-[#fef7f5] pt-16 lg:pt-20">
            <h1 className="text-[#212E4A] text-4xl lg:text-7xl text-center font-extrabold leading-tight">
        Free AI Title{" "}
        <span className="text-[#f35d36]">Generator Tool</span>
      </h1>
      {/* Description Text */}
        <p className="text-[#606162] text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mt-4 px-4 text-center">
           Discover the Free AI Title Generator Tool for crafting perfect titles in seconds. Whether you’re creating blog titles, social media headlines, or catchy marketing slogans, this tool uses advanced AI to deliver accurate, creative, and engaging suggestions instantly.
        </p>
      {/* 2. Tool Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 ">
          <TitleGenerator />
        </div>
      </section>
       </div>
       {/* The Steps Section */}
      <ToolStepsSection
        title={titleGeneratorToolSteps.title}
        description={titleGeneratorToolSteps.description}
        steps={titleGeneratorToolSteps.steps}
      />
       {/* Tools Intro Section */}
      <ToolIntroSection 
        title={titleGeneratorToolIntro.title}
        description={titleGeneratorToolIntro.description}
        image={titleGeneratorToolIntro.image}
        useCasesTitle={titleGeneratorToolIntro.useCasesTitle}
        useCasesIntro={titleGeneratorToolIntro.useCasesIntro}
        useCases={titleGeneratorToolIntro.useCases}
      />
      <ClientsLogos/>
      <ToolFeaturesSection
        title={titleGeneratorToolFeatures.title}
        description={titleGeneratorToolFeatures.description}
        features={titleGeneratorToolFeatures.features}
      />
       <RelatedToolsSection
        title={schemaGeneratorRelatedToolsData.title} 
        tools={schemaGeneratorRelatedToolsData.tools} 
      />
    </main>
  );
}