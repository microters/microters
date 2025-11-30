import ClientsLogos from "app/components/common/ClientsLogos";
import RelatedToolsSection from "app/components/common/RelatedTools";
import ToolFeaturesSection from "app/components/common/ToolFeatures";
import ToolIntroSection from "app/components/common/ToolIntro";
import ToolStepsSection from "app/components/common/ToolSteps";
import DisclaimerGenerator from "app/components/tools/DisclaimerGenerator";
import { schemaGeneratorRelatedToolsData } from "app/data/tools/relatedToolsData";
import { disclaimerGeneratorToolFeatures } from "app/data/tools/toolFeatures";
import { disclaimerGeneratorToolSteps } from "app/data/tools/toolsData";
import { disclaimerGeneratorToolIntro } from "app/data/tools/toolsIntro";

export const metadata = {
  title: "Free Web Word Counter Tool | ULK Online Word & Character Counter",
  description: "Count words, characters, and keywords effortlessly using the ULK Web Word Counter Tool. Ideal for SEO, content planning, blogging, and keyword clustering.",
};

export default function WebWordCounterPage() {
  return (
    <main>
      <div className="bg-[#fef7f5] pt-16 lg:pt-20">
        <h1 className="text-[#212E4A] text-4xl lg:text-7xl text-center font-extrabold leading-tight">
          Free Disclaimer <span className="text-[#f35d36]">Generator</span>
        </h1>
        {/* Description Text */}
        <p className="text-[#606162] text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mt-4 px-4 text-center">
          The Free Disclaimer Generator Tool helps you create legally sound disclaimers tailored to your needs. Whether you run a blog, website, or business, this tool makes it easy to protect yourself and your content.
        </p>
        {/* 2. Tool Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 ">
            <DisclaimerGenerator />
          </div>
        </section>
      </div>
      {/* The Steps Section */}
      <ToolStepsSection
        title={disclaimerGeneratorToolSteps.title}
        description={disclaimerGeneratorToolSteps.description}
        steps={disclaimerGeneratorToolSteps.steps}
      />
      {/* Tools Intro Section */}
      <ToolIntroSection
        title={disclaimerGeneratorToolIntro.title}
        description={disclaimerGeneratorToolIntro.description}
        image={disclaimerGeneratorToolIntro.image}
        useCasesTitle={disclaimerGeneratorToolIntro.useCasesTitle}
        useCasesIntro={disclaimerGeneratorToolIntro.useCasesIntro}
        useCases={disclaimerGeneratorToolIntro.useCases}
      />
      <ClientsLogos />
      <ToolFeaturesSection
        title={disclaimerGeneratorToolFeatures.title}
        description={disclaimerGeneratorToolFeatures.description}
        features={disclaimerGeneratorToolFeatures.features}
      />
      <RelatedToolsSection
        title={schemaGeneratorRelatedToolsData.title}
        tools={schemaGeneratorRelatedToolsData.tools}
      />
    </main>
  );
}