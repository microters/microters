import ClientsLogos from "app/components/common/ClientsLogos";
import RelatedToolsSection from "app/components/common/RelatedTools";
import ToolFeaturesSection from "app/components/common/ToolFeatures";
import ToolIntroSection from "app/components/common/ToolIntro";
import ToolStepsSection from "app/components/common/ToolSteps";
import SentenceExpander from "app/components/tools/SentenceExpander";
import { relatedToolsData } from "app/data/tools/relatedToolsData";
import { sentenceExpanderToolFeatures } from "app/data/tools/toolFeatures";
import { sentenceExpanderToolSteps } from "app/data/tools/toolsData";
import { sentenceExpanderToolIntro } from "app/data/tools/toolsIntro";

export const metadata = {
  title: "Free AI Sentence Expander – Improve & Extend Sentences Instantly",
  description:
    "Expand sentences instantly with our Free AI Sentence Expander. Create clearer, longer, and more engaging text for essays, blogs, and marketing content—powered by high-quality AI writing.",
};

export default function SentenceExpanderPage() {
  return (
    <main>
      <div className="bg-[#fef7f5] pt-16 lg:pt-20">
        <h1 className="text-[#212E4A] text-4xl lg:text-7xl text-center font-extrabold leading-tight">
          Free AI Sentence <span className="text-[#f35d36]">Expander Tool</span>
        </h1>
        {/* Description Text */}
        <p className="text-[#606162] text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mt-4 px-4 text-center">
          Looking for a fast way to expand your sentences while keeping them clear and engaging? The Free AI Sentence Expander Tool is your perfect solution. This tool takes your ideas and makes them better by expanding sentences with high-quality, human-like text.
        </p>
        {/* 2. Tool Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <SentenceExpander/>
          </div>
        </section>
      </div>
      {/* The Steps Section */}
      <ToolStepsSection
        title={sentenceExpanderToolSteps.title}
        description={sentenceExpanderToolSteps.description}
        steps={sentenceExpanderToolSteps.steps}
      />
      {/* Tools Intro Section */}
      <ToolIntroSection
        title={sentenceExpanderToolIntro.title}
        description={sentenceExpanderToolIntro.description}
        image={sentenceExpanderToolIntro.image}
        useCasesTitle={sentenceExpanderToolIntro.useCasesTitle}
        useCasesIntro={sentenceExpanderToolIntro.useCasesIntro}
        useCases={sentenceExpanderToolIntro.useCases}
      />
      <ClientsLogos />
      <ToolFeaturesSection
        title={sentenceExpanderToolFeatures.title}
        description={sentenceExpanderToolFeatures.description}
        features={sentenceExpanderToolFeatures.features}
      />
      <RelatedToolsSection
        title={relatedToolsData.title}
        tools={relatedToolsData.tools}
      />
    </main>
  );
}
