import ClientsLogos from "app/components/common/ClientsLogos";
import RelatedToolsSection from "app/components/common/RelatedTools";
import ToolFeaturesSection from "app/components/common/ToolFeatures";
import ToolIntroSection from "app/components/common/ToolIntro";
import ToolStepsSection from "app/components/common/ToolSteps";
import HeadlineGenerator from "app/components/tools/HeadlineGenerator";
import { schemaGeneratorRelatedToolsData } from "app/data/tools/relatedToolsData";
import { headlineGeneratorToolFeatures } from "app/data/tools/toolFeatures";
import { headlineGeneratorToolSteps } from "app/data/tools/toolsData";
import { headlineGeneratorToolIntro } from "app/data/tools/toolsIntro";

export const metadata = {
  title: "Free FAQ Schema Generator – Create JSON-LD FAQ Markup Easily",
  description:
    "Generate clean, SEO-friendly JSON-LD FAQ Schema markup instantly with our Free FAQ Schema Generator. Improve search visibility and enhance rich results without coding.",
};

export default function HeadlineGeneratorPage() {
  return (
    <main>
       <div className="bg-[#fef7f5] pt-16 lg:pt-20">
            <h1 className="text-[#212E4A] text-4xl lg:text-7xl text-center font-extrabold leading-tight">
        Free Headline{" "}
        <span className="text-[#f35d36]">Generator</span>
      </h1>
      {/* Description Text */}
        <p className="text-[#606162] text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mt-4 px-4 text-center">       
            The Free Headline Generator Tool helps you create attention-grabbing headlines effortlessly. Perfect for marketers, bloggers, and writers, this tool generates optimized headlines tailored to your content and audience, improving engagement and visibility.
        </p>
      {/* 2. Tool Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 ">
          <HeadlineGenerator/>
        </div>
      </section>
       </div>
       {/* The Steps Section */}
      <ToolStepsSection
        title={headlineGeneratorToolSteps.title}
        description={headlineGeneratorToolSteps.description}
        steps={headlineGeneratorToolSteps.steps}
      />
       {/* Tools Intro Section */}
      <ToolIntroSection 
        title={headlineGeneratorToolIntro.title}
        description={headlineGeneratorToolIntro.description}
        image={headlineGeneratorToolIntro.image}
        useCasesTitle={headlineGeneratorToolIntro.useCasesTitle}
        useCasesIntro={headlineGeneratorToolIntro.useCasesIntro}
        useCases={headlineGeneratorToolIntro.useCases}
      />
      <ClientsLogos/>
      <ToolFeaturesSection
        title={headlineGeneratorToolFeatures.title}
        description={headlineGeneratorToolFeatures.description}
        features={headlineGeneratorToolFeatures.features}
      />
       <RelatedToolsSection
        title={schemaGeneratorRelatedToolsData.title} 
        tools={schemaGeneratorRelatedToolsData.tools} 
      />
    </main>
  );
}