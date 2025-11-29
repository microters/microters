import ClientsLogos from "app/components/common/ClientsLogos";
import RelatedToolsSection from "app/components/common/RelatedTools";
import ToolFeaturesSection from "app/components/common/ToolFeatures";
import ToolIntroSection from "app/components/common/ToolIntro";
import ToolStepsSection from "app/components/common/ToolSteps";
import ConclusionGenerator from "app/components/tools/ConclusionGenerator";
import { relatedToolsData } from "app/data/tools/relatedToolsData";
import { conclusionGeneratorToolFeatures } from "app/data/tools/toolFeatures";
import { conclusionGeneratorToolSteps } from "app/data/tools/toolsData";
import { conclusionGeneratorToolIntro } from "app/data/tools/toolsIntro";

export const metadata = {
  title: "AI Conclusion Generator – Write Clear, Strong Conclusions Fast",
  description:
    "Need a strong ending for your content? Use our Free AI Conclusion Generator to create polished, meaningful conclusions instantly.",
};

export default function ConclusionGeneratorPage() {
  return (
    <main>
      <div className="bg-[#fef7f5] pt-16 lg:pt-20">
        <h1 className="text-[#212E4A] text-4xl lg:text-7xl text-center font-extrabold leading-tight">
          Free AI <span className="text-[#f35d36]">Conclusion Generator</span>
        </h1>
        {/* Description Text */}
        <p className="text-[#606162] text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mt-4 px-4 text-center">
          The Free AI Conclusion Generator is a powerful tool that helps users
          create engaging and well-structured conclusions in seconds. Whether
          you’re writing for work, school, or personal projects, this tool makes
          it easy to summarize content effectively. With a user-friendly
          interface and customizable options, it’s perfect for anyone looking to
          save time and improve their writing.
        </p>
        {/* 2. Tool Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 ">
            <ConclusionGenerator />
          </div>
        </section>
      </div>
      {/* The Steps Section */}
      <ToolStepsSection
        title={conclusionGeneratorToolSteps.title}
        description={conclusionGeneratorToolSteps.description}
        steps={conclusionGeneratorToolSteps.steps}
      />
      {/* Tools Intro Section */}
      <ToolIntroSection
        title={conclusionGeneratorToolIntro.title}
        description={conclusionGeneratorToolIntro.description}
        image={conclusionGeneratorToolIntro.image}
        useCasesTitle={conclusionGeneratorToolIntro.useCasesTitle}
        useCasesIntro={conclusionGeneratorToolIntro.useCasesIntro}
        useCases={conclusionGeneratorToolIntro.useCases}
      />
      <ClientsLogos />
      <ToolFeaturesSection
        title={conclusionGeneratorToolFeatures.title}
        description={conclusionGeneratorToolFeatures.description}
        features={conclusionGeneratorToolFeatures.features}
      />
      <RelatedToolsSection
        title={relatedToolsData.title}
        tools={relatedToolsData.tools}
      />
    </main>
  );
}
