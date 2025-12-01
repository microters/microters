import ClientsLogos from "app/components/common/ClientsLogos";
import RelatedToolsSection from "app/components/common/RelatedTools";
import ToolFeaturesSection from "app/components/common/ToolFeatures";
import ToolIntroSection from "app/components/common/ToolIntro";
import ToolStepsSection from "app/components/common/ToolSteps";
import OrganizationSchemaForm from "app/components/tools/OrganizationSchema";
import { schemaGeneratorRelatedToolsData } from "app/data/tools/relatedToolsData";
import { organizationSchemaToolFeatures  } from "app/data/tools/toolFeatures";
import { organizationSchemaToolSteps } from "app/data/tools/toolsData";
import { organizationSchemaToolIntro } from "app/data/tools/toolsIntro";

export const metadata = {
  title: "Organization Schema Generator – Free JSON-LD Tool",
  description:
    "Easily generate valid JSON-LD Organization Schema markup for your website. Improve SEO, boost brand visibility, and help search engines understand your organization better with our free Organization Schema Generator.",
};

export default function OrganizationSchemaPage() {
  return (
    <main>
       <div className="bg-[#fef7f5] pt-16 lg:pt-20">
            <h1 className="text-[#212E4A] text-4xl lg:text-7xl text-center font-extrabold leading-tight">
        Organization Schema{" "}
        <span className="text-[#f35d36]">Generator</span>
      </h1>
      {/* Description Text */}
        <p className="text-[#606162] text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mt-4 px-4 text-center">
           Easily create structured data for organizations using the Organization Schema Generator tool. This tool simplifies adding schema markup to websites, improving search engine visibility and driving targeted traffic to your site.
        </p>
      {/* 2. Tool Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 ">
          <OrganizationSchemaForm/>
        </div>
      </section>
       </div>
       {/* The Steps Section */}
      <ToolStepsSection
        title={organizationSchemaToolSteps.title}
        description={organizationSchemaToolSteps.description}
        steps={organizationSchemaToolSteps.steps}
      />
       {/* Tools Intro Section */}
      <ToolIntroSection 
        title={organizationSchemaToolIntro.title}
        description={organizationSchemaToolIntro.description}
        image={organizationSchemaToolIntro.image}
        useCasesTitle={organizationSchemaToolIntro.useCasesTitle}
        useCasesIntro={organizationSchemaToolIntro.useCasesIntro}
        useCases={organizationSchemaToolIntro.useCases}
      />
      <ClientsLogos/>
      <ToolFeaturesSection
        title={organizationSchemaToolFeatures.title}
        description={organizationSchemaToolFeatures.description}
        features={organizationSchemaToolFeatures.features}
      />
       <RelatedToolsSection
        title={schemaGeneratorRelatedToolsData.title} 
        tools={schemaGeneratorRelatedToolsData.tools} 
      />
    </main>
  );
}