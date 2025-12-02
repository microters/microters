import ClientsLogos from "app/components/common/ClientsLogos";
import RelatedToolsSection from "app/components/common/RelatedTools";
import ToolFeaturesSection from "app/components/common/ToolFeatures";
import ToolIntroSection from "app/components/common/ToolIntro";
import ToolStepsSection from "app/components/common/ToolSteps";
import ThesisGenerator from "app/components/tools/ThesisGenerator";
import { relatedToolsData } from "app/data/tools/relatedToolsData";
import { thesisGeneratorToolFeatures } from "app/data/tools/toolFeatures";
import { thesisGeneratorToolSteps } from "app/data/tools/toolsData";
import { thesisGeneratorToolIntro } from "app/data/tools/toolsIntro";

export const metadata = {
  title: "Free AI Thesis Generator – Create Strong Thesis Statements Instantly",
  description:
    "Generate clear, compelling thesis statements in seconds with our Free AI Thesis Generator. Ideal for students, researchers, and writers who need structured, high-quality academic content fast.",
};

export default function ThesisGeneratorPage() {
  return (
    <main>
      <div className="bg-[#fef7f5] pt-16 lg:pt-20">
        <h1 className="text-[#212E4A] text-4xl lg:text-7xl text-center font-extrabold leading-tight">
          AI Thesis <span className="text-[#f35d36]">Generator Tool</span>
        </h1>
        {/* Description Text */}
        <p className="text-[#606162] text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mt-4 px-4 text-center">
          AI Thesis Generator is a powerful tool designed to simplify the thesis writing process. Whether you’re a student, researcher, or professional, this tool helps create high-quality, structured content in just minutes. Its intuitive design and advanced features make it easy for anyone to generate a thesis with minimal effort.
        </p>
        {/* 2. Tool Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <ThesisGenerator/>
          </div>
        </section>
      </div>
      {/* The Steps Section */}
      <ToolStepsSection
        title={thesisGeneratorToolSteps.title}
        description={thesisGeneratorToolSteps.description}
        steps={thesisGeneratorToolSteps.steps}
      />
      {/* Tools Intro Section */}
      <ToolIntroSection
        title={thesisGeneratorToolIntro.title}
        description={thesisGeneratorToolIntro.description}
        image={thesisGeneratorToolIntro.image}
        useCasesTitle={thesisGeneratorToolIntro.useCasesTitle}
        useCasesIntro={thesisGeneratorToolIntro.useCasesIntro}
        useCases={thesisGeneratorToolIntro.useCases}
      />
      <ClientsLogos />
      <ToolFeaturesSection
        title={thesisGeneratorToolFeatures.title}
        description={thesisGeneratorToolFeatures.description}
        features={thesisGeneratorToolFeatures.features}
      />
      <RelatedToolsSection
        title={relatedToolsData.title}
        tools={relatedToolsData.tools}
      />
    </main>
  );
}