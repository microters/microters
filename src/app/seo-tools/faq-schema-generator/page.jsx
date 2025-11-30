import ClientsLogos from "app/components/common/ClientsLogos";
import RelatedToolsSection from "app/components/common/RelatedTools";
import ToolFeaturesSection from "app/components/common/ToolFeatures";
import ToolIntroSection from "app/components/common/ToolIntro";
import ToolStepsSection from "app/components/common/ToolSteps";
import FAQPageSchemaForm from "app/components/tools/FAQSchema";
import { schemaGeneratorRelatedToolsData } from "app/data/tools/relatedToolsData";
import { faqSchemaGeneratorToolFeatures } from "app/data/tools/toolFeatures";
import { faqSchemaGeneratorToolSteps } from "app/data/tools/toolsData";
import { faqSchemaGeneratorToolIntro } from "app/data/tools/toolsIntro";

export const metadata = {
  title: "Free FAQ Schema Generator – Create JSON-LD FAQ Markup Easily",
  description:
    "Generate clean, SEO-friendly JSON-LD FAQ Schema markup instantly with our Free FAQ Schema Generator. Improve search visibility and enhance rich results without coding.",
};

export default function FAQSchemaGeneratorPage() {
  return (
    <main>
       <div className="bg-[#fef7f5] pt-16 lg:pt-20">
            <h1 className="text-[#212E4A] text-4xl lg:text-7xl text-center font-extrabold leading-tight">
        FAQ Schema{" "}
        <span className="text-[#f35d36]">Generator Tool</span>
      </h1>
      {/* Description Text */}
        <p className="text-[#606162] text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mt-4 px-4 text-center">
           The FAQ Schema Generator Tool makes creating structured data for FAQs simple and efficient. It helps improve your website’s search visibility, increases engagement, and provides users with quick answers directly on search result pages.
        </p>
      {/* 2. Tool Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 ">
          <FAQPageSchemaForm />
        </div>
      </section>
       </div>
       {/* The Steps Section */}
      <ToolStepsSection
        title={faqSchemaGeneratorToolSteps.title}
        description={faqSchemaGeneratorToolSteps.description}
        steps={faqSchemaGeneratorToolSteps.steps}
      />
       {/* Tools Intro Section */}
      <ToolIntroSection 
        title={faqSchemaGeneratorToolIntro.title}
        description={faqSchemaGeneratorToolIntro.description}
        image={faqSchemaGeneratorToolIntro.image}
        useCasesTitle={faqSchemaGeneratorToolIntro.useCasesTitle}
        useCasesIntro={faqSchemaGeneratorToolIntro.useCasesIntro}
        useCases={faqSchemaGeneratorToolIntro.useCases}
      />
      <ClientsLogos/>
      <ToolFeaturesSection
        title={faqSchemaGeneratorToolFeatures.title}
        description={faqSchemaGeneratorToolFeatures.description}
        features={faqSchemaGeneratorToolFeatures.features}
      />
       <RelatedToolsSection
        title={schemaGeneratorRelatedToolsData.title} 
        tools={schemaGeneratorRelatedToolsData.tools} 
      />
    </main>
  );
}