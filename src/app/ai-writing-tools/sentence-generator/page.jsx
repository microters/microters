import ClientsLogos from "app/components/common/ClientsLogos";
import RelatedToolsSection from "app/components/common/RelatedTools";
import ToolFeaturesSection from "app/components/common/ToolFeatures";
import ToolIntroSection from "app/components/common/ToolIntro";
import ToolStepsSection from "app/components/common/ToolSteps";
import SentenceGenerator from "app/components/tools/SentenceGenerator";
import { relatedToolsData } from "app/data/tools/relatedToolsData";
import { sentenceGeneratorToolFeatures } from "app/data/tools/toolFeatures";
import { sentenceGeneratorToolSteps } from "app/data/tools/toolsData";
import { sentenceGeneratorToolIntro } from "app/data/tools/toolsIntro";

export const metadata = {
  title: "Free AI Sentence Generator – Create Unique Sentences Instantly",
  description:
    "Generate unique, high-quality sentences instantly with our Free AI Sentence Generator. Perfect for blogs, marketing, essays, and social media—customize tone, style, and language effortlessly with AI.",
};

export default function SentenceGeneratorPage() {
  return (
    <main>
      <div className="bg-[#fef7f5] pt-16 lg:pt-20">
        <h1 className="text-[#212E4A] text-4xl lg:text-7xl text-center font-extrabold leading-tight">
          Free AI Sentence <span className="text-[#f35d36]">Generator Tool</span>
        </h1>
        {/* Description Text */}
        <p className="text-[#606162] text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mt-4 px-4 text-center">
          The Free AI Sentence Generator Tool helps users quickly and effortlessly create sentences tailored to their needs. Whether you’re crafting marketing content, blog posts, or social media captions, this tool streamlines the process with features like tone selection, language support, and SEO optimization.
        </p>
        {/* 2. Tool Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <SentenceGenerator/>
          </div>
        </section>
      </div>
      {/* The Steps Section */}
      <ToolStepsSection
        title={sentenceGeneratorToolSteps.title}
        description={sentenceGeneratorToolSteps.description}
        steps={sentenceGeneratorToolSteps.steps}
      />
      {/* Tools Intro Section */}
      <ToolIntroSection
        title={sentenceGeneratorToolIntro.title}
        description={sentenceGeneratorToolIntro.description}
        image={sentenceGeneratorToolIntro.image}
        useCasesTitle={sentenceGeneratorToolIntro.useCasesTitle}
        useCasesIntro={sentenceGeneratorToolIntro.useCasesIntro}
        useCases={sentenceGeneratorToolIntro.useCases}
      />
      <ClientsLogos />
      <ToolFeaturesSection
        title={sentenceGeneratorToolFeatures.title}
        description={sentenceGeneratorToolFeatures.description}
        features={sentenceGeneratorToolFeatures.features}
      />
      <RelatedToolsSection
        title={relatedToolsData.title}
        tools={relatedToolsData.tools}
      />
    </main>
  );
}
