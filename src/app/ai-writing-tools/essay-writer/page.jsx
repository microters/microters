import ClientsLogos from "app/components/common/ClientsLogos";
import RelatedToolsSection from "app/components/common/RelatedTools";
import ToolFeaturesSection from "app/components/common/ToolFeatures";
import ToolIntroSection from "app/components/common/ToolIntro";
import ToolStepsSection from "app/components/common/ToolSteps";
import EssayGenerator from "app/components/tools/EssayGenerator";
import { relatedToolsData } from "app/data/tools/relatedToolsData";
import { essayWriterToolFeatures } from "app/data/tools/toolFeatures";
import { essayWriterToolSteps } from "app/data/tools/toolsData";
import { essayWriterToolIntro } from "app/data/tools/toolsIntro";

export const metadata = {
  title: "Free AI Essay Writer – Generate High-Quality Essays Instantly",
  description:
    "Create well-structured, engaging essays with our Free AI Essay Writer. Perfect for students, bloggers, and professionals—generate polished essays fast with AI.",
};

export default function EssayWriterPage() {
  return (
    <main>
      <div className="bg-[#fef7f5] pt-16 lg:pt-20">
        <h1 className="text-[#212E4A] text-4xl lg:text-7xl text-center font-extrabold leading-tight">
          Free AI Essay <span className="text-[#f35d36]">Writer Tool</span>
        </h1>
        {/* Description Text */}
        <p className="text-[#606162] text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mt-4 px-4 text-center">
          The Free AI Essay Writer Tool helps you create well-written, engaging essays quickly. Whether you’re working on school assignments, blog posts, or professional projects, this tool simplifies the process and ensures high-quality results. Its intuitive interface and customizable options make it ideal for users of all skill levels.
        </p>
        {/* 2. Tool Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <EssayGenerator/>
          </div>
        </section>
      </div>
      {/* The Steps Section */}
      <ToolStepsSection
        title={essayWriterToolSteps.title}
        description={essayWriterToolSteps.description}
        steps={essayWriterToolSteps.steps}
      />
      {/* Tools Intro Section */}
      <ToolIntroSection
        title={essayWriterToolIntro.title}
        description={essayWriterToolIntro.description}
        image={essayWriterToolIntro.image}
        useCasesTitle={essayWriterToolIntro.useCasesTitle}
        useCasesIntro={essayWriterToolIntro.useCasesIntro}
        useCases={essayWriterToolIntro.useCases}
      />
      <ClientsLogos />
      <ToolFeaturesSection
        title={essayWriterToolFeatures.title}
        description={essayWriterToolFeatures.description}
        features={essayWriterToolFeatures.features}
      />
      <RelatedToolsSection
        title={relatedToolsData.title}
        tools={relatedToolsData.tools}
      />
    </main>
  );
}
