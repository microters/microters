import ClientsLogos from "app/components/common/ClientsLogos";
import RelatedToolsSection from "app/components/common/RelatedTools";
import ToolFeaturesSection from "app/components/common/ToolFeatures";
import ToolIntroSection from "app/components/common/ToolIntro";
import ToolStepsSection from "app/components/common/ToolSteps";
import ThesisGenerator from "app/components/tools/ThesisGenerator";
import ThesisStatementGenerator from "app/components/tools/ThesisStatementGenerator";
import { relatedToolsData } from "app/data/tools/relatedToolsData";
import { thesisStatementGeneratorToolFeatures } from "app/data/tools/toolFeatures";
import { thesisStatementGeneratorToolSteps } from "app/data/tools/toolsData";
import { thesisStatementGeneratorToolIntro } from "app/data/tools/toolsIntro";

export const metadata = {
  title: "Free AI Thesis Generator – Create Strong Thesis Statements Instantly",
  description:
    "Generate clear, compelling thesis statements in seconds with our Free AI Thesis Generator. Ideal for students, researchers, and writers who need structured, high-quality academic content fast.",
};

export default function ThesisStatementGeneratorPage() {
  return (
    <main>
      <div className="bg-[#fef7f5] pt-16 lg:pt-20">
        <div className="max-w-5xl mx-auto">
            <h1 className="text-[#212E4A] text-4xl lg:text-7xl text-center font-extrabold leading-tight">
          Free AI Thesis <span className="text-[#f35d36]">Statement Generator</span>
        </h1>
        {/* Description Text */}
        <p className="text-[#606162] text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mt-4 px-4 text-center">
          A Free AI Thesis Statement Generator is a revolutionary tool that helps students, writers, and professionals craft precise and impactful thesis statements effortlessly. This user-friendly tool ensures high-quality results, saving time and reducing stress during the writing process.
        </p>
        </div>
        {/* 2. Tool Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <ThesisStatementGenerator/>
          </div>
        </section>
      </div>
      {/* The Steps Section */}
      <ToolStepsSection
        title={thesisStatementGeneratorToolSteps.title}
        description={thesisStatementGeneratorToolSteps.description}
        steps={thesisStatementGeneratorToolSteps.steps}
      />
      {/* Tools Intro Section */}
      <ToolIntroSection
        title={thesisStatementGeneratorToolIntro.title}
        description={thesisStatementGeneratorToolIntro.description}
        image={thesisStatementGeneratorToolIntro.image}
        useCasesTitle={thesisStatementGeneratorToolIntro.useCasesTitle}
        useCasesIntro={thesisStatementGeneratorToolIntro.useCasesIntro}
        useCases={thesisStatementGeneratorToolIntro.useCases}
      />
      <ClientsLogos />
      <ToolFeaturesSection
        title={thesisStatementGeneratorToolFeatures.title}
        description={thesisStatementGeneratorToolFeatures.description}
        features={thesisStatementGeneratorToolFeatures.features}
      />
      <RelatedToolsSection
        title={relatedToolsData.title}
        tools={relatedToolsData.tools}
      />
    </main>
  );
}