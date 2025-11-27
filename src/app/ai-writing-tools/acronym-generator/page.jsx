import ClientsLogos from "app/components/common/ClientsLogos";
import RelatedToolsSection from "app/components/common/RelatedTools";
import ToolFeaturesSection from "app/components/common/ToolFeatures";
import ToolIntroSection from "app/components/common/ToolIntro";
import ToolStepsSection from "app/components/common/ToolSteps";
import AcronymTool from "app/components/tools/AcronymTool";
import { relatedToolsData } from "app/data/tools/relatedToolsData";
import { acronymToolFeatures } from "app/data/tools/toolFeatures";
import { acronymToolSteps } from "app/data/tools/toolsData";
import { acronymToolIntro } from "app/data/tools/toolsIntro";

export const metadata = {
  title: "AI Acronym Generator | Microters",
  description: "Turn complex topics into memorable acronyms instantly.",
};

export default function AcronymGeneratorPage() {
  return (
    <main>
       <div className="bg-[#fef7f5] pt-16 lg:pt-20">
            <h1 className="text-[#212E4A] text-4xl lg:text-7xl text-center font-extrabold leading-tight">
        Free AI Acronym{" "}
        <span className="text-[#f35d36]">Generator</span>
      </h1>
      {/* Description Text */}
        <p className="text-[#606162] text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mt-4 px-4 text-center">
           Looking for a quick and easy way to create engaging content? The Free AI Paragraph Generator Tool helps you craft high-quality paragraphs in seconds. It’s perfect for anyone who needs a fast and reliable way to write. Whether you’re a student, a content creator, or just need to save time, this tool delivers.
        </p>
      {/* 2. Tool Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 ">
          <AcronymTool />
        </div>
      </section>
       </div>
       {/* The Steps Section */}
      <ToolStepsSection
        title={acronymToolSteps.title}
        description={acronymToolSteps.description}
        steps={acronymToolSteps.steps}
      />
      {/* Tools Intro Section */}
      <ToolIntroSection 
        title={acronymToolIntro.title}
        description={acronymToolIntro.description}
        image={acronymToolIntro.image}
        useCasesTitle={acronymToolIntro.useCasesTitle}
        useCasesIntro={acronymToolIntro.useCasesIntro}
        useCases={acronymToolIntro.useCases}
      />
      <ClientsLogos/>
      <ToolFeaturesSection 
        title={acronymToolFeatures.title}
        description={acronymToolFeatures.description}
        features={acronymToolFeatures.features}
      />
      <RelatedToolsSection
        title={relatedToolsData.title} 
        tools={relatedToolsData.tools} 
      />
    </main>
  );
}