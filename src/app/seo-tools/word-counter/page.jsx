import ClientsLogos from "app/components/common/ClientsLogos";
import RelatedToolsSection from "app/components/common/RelatedTools";
import ToolFeaturesSection from "app/components/common/ToolFeatures";
import ToolIntroSection from "app/components/common/ToolIntro";
import ToolStepsSection from "app/components/common/ToolSteps";
import WordsCounter from "app/components/tools/WordsCounter";
import { schemaGeneratorRelatedToolsData } from "app/data/tools/relatedToolsData";
import { wordCounterToolFeatures } from "app/data/tools/toolFeatures";
import { wordCounterToolSteps } from "app/data/tools/toolsData";
import { wordCounterToolIntro } from "app/data/tools/toolsIntro";

export const metadata = {
  title: "Free Online Word Counter – Count Words & Characters Instantly",
  description:
    "Use our Free Online Word Counter to instantly count words, characters, and spaces. Perfect for writers, students, and SEO professionals needing fast and accurate text analysis.",
};

export default function WordCounterPage() {
  return (
    <main>
       <div className="bg-[#fef7f5] pt-16 lg:pt-20">
            <h1 className="text-[#212E4A] text-4xl lg:text-7xl text-center font-extrabold leading-tight">
        Free Online Word{" "}
        <span className="text-[#f35d36]">Counter Tool</span>
      </h1>
      {/* Description Text */}
        <p className="text-[#606162] text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mt-4 px-4 text-center">
           A Free Online Word Counter Tool is a simple, reliable solution for counting words, characters, and spaces in your text. Whether you’re writing an article, optimizing content for SEO, or crafting a social media post, this tool ensures precision and saves time.
        </p>
      {/* 2. Tool Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 ">
          <WordsCounter />
        </div>
      </section>
       </div>
       {/* The Steps Section */}
      <ToolStepsSection
        title={wordCounterToolSteps.title}
        description={wordCounterToolSteps.description}
        steps={wordCounterToolSteps.steps}
      />
       {/* Tools Intro Section */}
      <ToolIntroSection 
        title={wordCounterToolIntro.title}
        description={wordCounterToolIntro.description}
        image={wordCounterToolIntro.image}
        useCasesTitle={wordCounterToolIntro.useCasesTitle}
        useCasesIntro={wordCounterToolIntro.useCasesIntro}
        useCases={wordCounterToolIntro.useCases}
      />
      <ClientsLogos/>
      <ToolFeaturesSection
        title={wordCounterToolFeatures.title}
        description={wordCounterToolFeatures.description}
        features={wordCounterToolFeatures.features}
      />
       <RelatedToolsSection
        title={schemaGeneratorRelatedToolsData.title}
        tools={schemaGeneratorRelatedToolsData.tools}
      />
    </main>
  );
}