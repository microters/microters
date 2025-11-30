import ClientsLogos from "app/components/common/ClientsLogos";
import RelatedToolsSection from "app/components/common/RelatedTools";
import ToolFeaturesSection from "app/components/common/ToolFeatures";
import ToolIntroSection from "app/components/common/ToolIntro";
import ToolStepsSection from "app/components/common/ToolSteps";
import JobPostingSchemaForm from "app/components/tools/JobPostingSchema";
import { schemaGeneratorRelatedToolsData } from "app/data/tools/relatedToolsData";
import { jobPostingSchemaToolFeatures } from "app/data/tools/toolFeatures";
import { jobPostingSchemaToolSteps } from "app/data/tools/toolsData";
import { jobPostingSchemaToolIntro } from "app/data/tools/toolsIntro";

export const metadata = {
  title: "Free Job Posting Schema Generator – Create JSON-LD Job Markup Instantly",
  description:
    "Generate SEO-friendly JSON-LD Job Posting Schema markup in seconds with our free tool. Improve visibility, enhance rich results, and help search engines display your job listings more effectively.",
};

export default function JobPostingSchemaPage() {
  return (
    <main>
       <div className="bg-[#fef7f5] pt-16 lg:pt-20">
            <h1 className="text-[#212E4A] text-4xl lg:text-7xl text-center font-extrabold leading-tight">
        Job Post Schema{" "}
        <span className="text-[#f35d36]">Generator</span>
      </h1>
      {/* Description Text */}
        <p className="text-[#606162] text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mt-4 px-4 text-center">       
            The Job Post Schema Tool simplifies the process of adding structured data to job postings. It helps search engines display job listings in rich snippets, boosting visibility and click-through rates. Whether you’re hiring or sharing job opportunities, this tool ensures your listings stand out.
        </p>
      {/* 2. Tool Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 ">
          <JobPostingSchemaForm/>
        </div>
      </section>
       </div>
       {/* The Steps Section */}
      <ToolStepsSection
        title={jobPostingSchemaToolSteps.title}
        description={jobPostingSchemaToolSteps.description}
        steps={jobPostingSchemaToolSteps.steps}
      />
       {/* Tools Intro Section */}
      <ToolIntroSection 
        title={jobPostingSchemaToolIntro.title}
        description={jobPostingSchemaToolIntro.description}
        image={jobPostingSchemaToolIntro.image}
        useCasesTitle={jobPostingSchemaToolIntro.useCasesTitle}
        useCasesIntro={jobPostingSchemaToolIntro.useCasesIntro}
        useCases={jobPostingSchemaToolIntro.useCases}
      />
      <ClientsLogos/>
      <ToolFeaturesSection
        title={jobPostingSchemaToolFeatures.title}
        description={jobPostingSchemaToolFeatures.description}
        features={jobPostingSchemaToolFeatures.features}
      />
       <RelatedToolsSection
        title={schemaGeneratorRelatedToolsData.title} 
        tools={schemaGeneratorRelatedToolsData.tools} 
      />
    </main>
  );
}