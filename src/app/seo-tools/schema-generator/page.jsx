import ToolIntroSection from "app/components/common/ToolIntro";
import ToolStepsSection from "app/components/common/ToolSteps";
import ArticleSchema from "app/components/tools/ArticleSchema";
import { schemaGeneratorToolSteps } from "app/data/tools/toolsData";
import { schemaGeneratorToolIntro } from "app/data/tools/toolsIntro";

export const metadata = {
  title: "AI Acronym Generator | Microters",
  description: "Turn complex topics into memorable acronyms instantly.",
};

export default function SeoGeneratorPage() {
  return (
    <main>
       <div className="bg-[#fef7f5] pt-16 lg:pt-20">
            <h1 className="text-[#212E4A] text-4xl lg:text-7xl text-center font-extrabold leading-tight">
        Schema{" "}
        <span className="text-[#f35d36]">Generator Tool</span>
      </h1>
      {/* Description Text */}
        <p className="text-[#606162] text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mt-4 px-4 text-center">
           A Schema Generator Tool simplifies creating structured data for websites, boosting SEO performance and improving search engine visibility. It helps website owners generate schema markup efficiently without needing advanced coding knowledge.
        </p>
      {/* 2. Tool Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 ">
          <ArticleSchema />
        </div>
      </section>
       </div>
       {/* The Steps Section */}
      <ToolStepsSection
        title={schemaGeneratorToolSteps.title}
        description={schemaGeneratorToolSteps.description}
        steps={schemaGeneratorToolSteps.steps}
      />
       {/* Tools Intro Section */}
      <ToolIntroSection 
        title={schemaGeneratorToolIntro.title}
        description={schemaGeneratorToolIntro.description}
        image={schemaGeneratorToolIntro.image}
        useCasesTitle={schemaGeneratorToolIntro.useCasesTitle}
        useCasesIntro={schemaGeneratorToolIntro.useCasesIntro}
        useCases={schemaGeneratorToolIntro.useCases}
      />
    </main>
  );
}