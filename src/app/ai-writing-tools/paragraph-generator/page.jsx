import ClientsLogos from "app/components/common/ClientsLogos";
import RelatedToolsSection from "app/components/common/RelatedTools";
import ToolFeaturesSection from "app/components/common/ToolFeatures";
import ToolIntroSection from "app/components/common/ToolIntro";
import ToolStepsSection from "app/components/common/ToolSteps";
import ParagraphGenerator from "app/components/tools/ParagraphGenerator";
import { relatedToolsData } from "app/data/tools/relatedToolsData";
import { paragraphGeneratorToolFeatures } from "app/data/tools/toolFeatures";
import { paragraphGeneratorToolSteps } from "app/data/tools/toolsData";
import { paragraphGeneratorToolIntro } from "app/data/tools/toolsIntro";

export const metadata = {
  title: "Free AI Paragraph Generator – Create Quality Paragraphs Instantly",
  description:
    "Generate clear, engaging, and high-quality paragraphs instantly with our Free AI Paragraph Generator. Perfect for blogs, essays, marketing content, and social media—write better and faster with AI.",
};

export default function ParagraphGeneratorPage() {
  return (
    <main>
      <div className="bg-[#fef7f5] pt-16 lg:pt-20">
        <h1 className="text-[#212E4A] text-4xl lg:text-7xl text-center font-extrabold leading-tight">
          Free AI Paragraph <span className="text-[#f35d36]">Generator</span>
        </h1>
        {/* Description Text */}
        <p className="text-[#606162] text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mt-4 px-4 text-center">
          The Free AI Paragraph Generator is a powerful tool for creating high-quality written content in seconds. Whether you’re writing for marketing, blogging, or social media, this tool makes crafting precise and engaging paragraphs effortless. Its user-friendly design and diverse features make it ideal for a variety of writing needs.
        </p>
        {/* 2. Tool Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <ParagraphGenerator/>
          </div>
        </section>
      </div>
      {/* The Steps Section */}
      <ToolStepsSection
        title={paragraphGeneratorToolSteps.title}
        description={paragraphGeneratorToolSteps.description}
        steps={paragraphGeneratorToolSteps.steps}
      />
      {/* Tools Intro Section */}
      <ToolIntroSection
        title={paragraphGeneratorToolIntro.title}
        description={paragraphGeneratorToolIntro.description}
        image={paragraphGeneratorToolIntro.image}
        useCasesTitle={paragraphGeneratorToolIntro.useCasesTitle}
        useCasesIntro={paragraphGeneratorToolIntro.useCasesIntro}
        useCases={paragraphGeneratorToolIntro.useCases}
      />
      <ClientsLogos />
      <ToolFeaturesSection
        title={paragraphGeneratorToolFeatures.title}
        description={paragraphGeneratorToolFeatures.description}
        features={paragraphGeneratorToolFeatures.features}
      />
      <RelatedToolsSection
        title={relatedToolsData.title}
        tools={relatedToolsData.tools}
      />
    </main>
  );
}
