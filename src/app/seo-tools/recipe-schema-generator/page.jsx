import ClientsLogos from "app/components/common/ClientsLogos";
import RelatedToolsSection from "app/components/common/RelatedTools";
import ToolFeaturesSection from "app/components/common/ToolFeatures";
import ToolIntroSection from "app/components/common/ToolIntro";
import ToolStepsSection from "app/components/common/ToolSteps";
import RecipeSchemaForm from "app/components/tools/RecipeSchema";
import { schemaGeneratorRelatedToolsData } from "app/data/tools/relatedToolsData";
import { recipeSchemaToolFeatures  } from "app/data/tools/toolFeatures";
import { recipeSchemaToolSteps } from "app/data/tools/toolsData";
import { recipeSchemaToolIntro } from "app/data/tools/toolsIntro";

export const metadata = {
  title: "Free Recipe Schema Generator – Create JSON-LD Recipe Markup",
  description:
    "Generate valid JSON-LD Recipe Schema markup instantly with our free Recipe Schema Generator. Improve SEO, boost recipe visibility, and help search engines display rich recipe results with structured data.",
};

export default function ProductSchemaPage() {
  return (
    <main>
       <div className="bg-[#fef7f5] pt-16 lg:pt-20">
            <h1 className="text-[#212E4A] text-4xl lg:text-7xl text-center font-extrabold leading-tight">
        Recipe Schema{" "}
        <span className="text-[#f35d36]">Generator</span>
      </h1>
      {/* Description Text */}
        <p className="text-[#606162] text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mt-4 px-4 text-center">
           A Recipe Schema Generator is an essential tool for creating structured recipe data that helps your content stand out in search engine results. With it, you can boost visibility and improve user engagement effortlessly.
        </p>
      {/* 2. Tool Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 ">
          <RecipeSchemaForm/>
        </div>
      </section>
       </div>
       {/* The Steps Section */}
      <ToolStepsSection
        title={recipeSchemaToolSteps.title}
        description={recipeSchemaToolSteps.description}
        steps={recipeSchemaToolSteps.steps}
      />
       {/* Tools Intro Section */}
      <ToolIntroSection 
        title={recipeSchemaToolIntro.title}
        description={recipeSchemaToolIntro.description}
        image={recipeSchemaToolIntro.image}
        useCasesTitle={recipeSchemaToolIntro.useCasesTitle}
        useCasesIntro={recipeSchemaToolIntro.useCasesIntro}
        useCases={recipeSchemaToolIntro.useCases}
      />
      <ClientsLogos/>
      <ToolFeaturesSection
        title={recipeSchemaToolFeatures.title}
        description={recipeSchemaToolFeatures.description}
        features={recipeSchemaToolFeatures.features}
      />
       <RelatedToolsSection
        title={schemaGeneratorRelatedToolsData.title} 
        tools={schemaGeneratorRelatedToolsData.tools} 
      />
    </main>
  );
}