import ClientsLogos from "app/components/common/ClientsLogos";
import RelatedToolsSection from "app/components/common/RelatedTools";
import ToolFeaturesSection from "app/components/common/ToolFeatures";
import ToolIntroSection from "app/components/common/ToolIntro";
import ToolStepsSection from "app/components/common/ToolSteps";
import RobotsTxtValidator from "app/components/tools/RobotsTxtValidator";
import { schemaGeneratorRelatedToolsData } from "app/data/tools/relatedToolsData";
import { robotsTxtValidatorToolFeatures  } from "app/data/tools/toolFeatures";
import { robotsTxtValidatorToolSteps } from "app/data/tools/toolsData";
import { robotsTxtValidatorToolIntro  } from "app/data/tools/toolsIntro";

export const metadata = {
  title: "Robots.txt Validator – Free Robots.txt Testing Tool",
  description:
    "Validate and test your robots.txt file instantly with our free Robots.txt Validator. Detect errors, ensure proper crawl instructions, and improve your website’s SEO and indexing efficiency.",
};

export default function ProductSchemaPage() {
  return (
    <main>
       <div className="bg-[#fef7f5] pt-16 lg:pt-20">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-[#212E4A] text-4xl lg:text-7xl text-center font-extrabold leading-tight">
        Robots.txt Validator and{" "}
        <span className="text-[#f35d36]">Testing Tool</span>
      </h1>
      {/* Description Text */}
        <p className="text-[#606162] text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mt-4 px-4 text-center">
           The Robots.txt Validator and Testing tool is essential for ensuring your website’s Robots.txt file is error-free. It helps search engines understand which parts of your site to crawl or skip, improving site organization and SEO performance.
        </p>
            </div>
      {/* 2. Tool Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 ">
          <RobotsTxtValidator/>
        </div>
      </section>
       </div>
       {/* The Steps Section */}
      <ToolStepsSection
        title={robotsTxtValidatorToolSteps.title}
        description={robotsTxtValidatorToolSteps.description}
        steps={robotsTxtValidatorToolSteps.steps}
      />
       {/* Tools Intro Section */}
      <ToolIntroSection 
        title={robotsTxtValidatorToolIntro.title}
        description={robotsTxtValidatorToolIntro.description}
        image={robotsTxtValidatorToolIntro.image}
        useCasesTitle={robotsTxtValidatorToolIntro.useCasesTitle}
        useCasesIntro={robotsTxtValidatorToolIntro.useCasesIntro}
        useCases={robotsTxtValidatorToolIntro.useCases}
      />
      <ClientsLogos/>
      <ToolFeaturesSection
        title={robotsTxtValidatorToolFeatures.title}
        description={robotsTxtValidatorToolFeatures.description}
        features={robotsTxtValidatorToolFeatures.features}
      />
       <RelatedToolsSection
        title={schemaGeneratorRelatedToolsData.title} 
        tools={schemaGeneratorRelatedToolsData.tools} 
      />
    </main>
  );
}