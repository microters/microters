import ClientsLogos from "app/components/common/ClientsLogos";
import RelatedToolsSection from "app/components/common/RelatedTools";
import ToolFeaturesSection from "app/components/common/ToolFeatures";
import ToolIntroSection from "app/components/common/ToolIntro";
import ToolStepsSection from "app/components/common/ToolSteps";
import ProductSchemaForm from "app/components/tools/ProductSchema";
import { schemaGeneratorRelatedToolsData } from "app/data/tools/relatedToolsData";
import { productSchemaToolFeatures  } from "app/data/tools/toolFeatures";
import { productSchemaToolSteps } from "app/data/tools/toolsData";
import { productSchemaToolIntro } from "app/data/tools/toolsIntro";

export const metadata = {
  title: "Free Product Schema Generator – Create JSON-LD Product Markup",
  description:
    "Generate accurate JSON-LD Product Schema markup instantly with our free Product Schema Generator. Improve product visibility, boost SEO, and help search engines understand your product details with clean structured data.",
};

export default function ProductSchemaPage() {
  return (
    <main>
       <div className="bg-[#fef7f5] pt-16 lg:pt-20">
            <h1 className="text-[#212E4A] text-4xl lg:text-7xl text-center font-extrabold leading-tight">
        Product Schema{" "}
        <span className="text-[#f35d36]">Generator</span>
      </h1>
      {/* Description Text */}
        <p className="text-[#606162] text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mt-4 px-4 text-center">
           The Product Schema tool helps businesses optimize their online presence by making product information easily accessible and structured. This tool is perfect for anyone looking to improve product visibility, enhance search engine rankings, and attract the right audience.
        </p>
      {/* 2. Tool Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 ">
          <ProductSchemaForm/>
        </div>
      </section>
       </div>
       {/* The Steps Section */}
      <ToolStepsSection
        title={productSchemaToolSteps.title}
        description={productSchemaToolSteps.description}
        steps={productSchemaToolSteps.steps}
      />
       {/* Tools Intro Section */}
      <ToolIntroSection 
        title={productSchemaToolIntro.title}
        description={productSchemaToolIntro.description}
        image={productSchemaToolIntro.image}
        useCasesTitle={productSchemaToolIntro.useCasesTitle}
        useCasesIntro={productSchemaToolIntro.useCasesIntro}
        useCases={productSchemaToolIntro.useCases}
      />
      <ClientsLogos/>
      <ToolFeaturesSection
        title={productSchemaToolFeatures.title}
        description={productSchemaToolFeatures.description}
        features={productSchemaToolFeatures.features}
      />
       <RelatedToolsSection
        title={schemaGeneratorRelatedToolsData.title} 
        tools={schemaGeneratorRelatedToolsData.tools} 
      />
    </main>
  );
}