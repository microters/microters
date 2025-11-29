import ClientsLogos from "app/components/common/ClientsLogos";
import RelatedToolsSection from "app/components/common/RelatedTools";
import ToolFeaturesSection from "app/components/common/ToolFeatures";
import ToolIntroSection from "app/components/common/ToolIntro";
import ToolStepsSection from "app/components/common/ToolSteps";
import BreadcrumbSchemaForm from "app/components/tools/BreadcrumbSchema";
import { schemaGeneratorRelatedToolsData } from "app/data/tools/relatedToolsData";
import { breadcrumbGeneratorToolFeatures } from "app/data/tools/toolFeatures";
import { breadcrumbGeneratorToolSteps } from "app/data/tools/toolsData";
import { breadcrumbGeneratorToolIntro } from "app/data/tools/toolsIntro";

export const metadata = {
  title: "Free Breadcrumb Schema Generator | JSON-LD Markup Tool for SEO",
  description: "Create breadcrumb structured data in seconds with our free Breadcrumb Schema Generator. Build clean JSON-LD markup, improve site navigation, and boost SEO effortlessly.",
};

export default function BreadcrumbGeneratorPage() {
  return (
    <main>
       <div className="bg-[#fef7f5] pt-16 lg:pt-20">
           <div className="max-w-5xl mx-auto">
               <h1 className="text-[#212E4A] text-4xl lg:text-7xl text-center font-extrabold leading-tight">
        Breadcrumbs Schema{" "}
        <span className="text-[#f35d36]">Markup Generator</span>
      </h1>
      {/* Description Text */}
        <p className="text-[#606162] text-lg lg:text-xl leading-relaxed mt-4 px-4 text-center">
           The Breadcrumb-Generator is an easy-to-use tool that helps create breadcrumb navigation for websites, improving site structure and user experience. This tool enhances SEO performance and simplifies navigation, making it an essential tool for any digital marketer or website owner.
        </p>
           </div>
      {/* 2. Tool Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 ">
          <BreadcrumbSchemaForm />
        </div>
      </section>
      {/* The Steps Section */}
      <ToolStepsSection
        title={breadcrumbGeneratorToolSteps.title}
        description={breadcrumbGeneratorToolSteps.description}
        steps={breadcrumbGeneratorToolSteps.steps}
      />
      {/* Tools Intro Section */}
      <ToolIntroSection 
        title={breadcrumbGeneratorToolIntro.title}
        description={breadcrumbGeneratorToolIntro.description}
        image={breadcrumbGeneratorToolIntro.image}
        useCasesTitle={breadcrumbGeneratorToolIntro.useCasesTitle}
        useCasesIntro={breadcrumbGeneratorToolIntro.useCasesIntro}
        useCases={breadcrumbGeneratorToolIntro.useCases}
      />
      <ClientsLogos/>
      <ToolFeaturesSection
        title={breadcrumbGeneratorToolFeatures.title}
        description={breadcrumbGeneratorToolFeatures.description}
        features={breadcrumbGeneratorToolFeatures.features}
      />
      <RelatedToolsSection
        title={schemaGeneratorRelatedToolsData.title} 
        tools={schemaGeneratorRelatedToolsData.tools} 
      />
       </div>
    </main>
  );
}