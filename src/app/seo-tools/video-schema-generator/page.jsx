import ClientsLogos from "app/components/common/ClientsLogos";
import RelatedToolsSection from "app/components/common/RelatedTools";
import ToolFeaturesSection from "app/components/common/ToolFeatures";
import ToolIntroSection from "app/components/common/ToolIntro";
import ToolStepsSection from "app/components/common/ToolSteps";
import VideoSchemaForm from "app/components/tools/VideoSchema";
import { schemaGeneratorRelatedToolsData } from "app/data/tools/relatedToolsData";
import { videoSchemaToolFeatures } from "app/data/tools/toolFeatures";
import { videoSchemaToolSteps } from "app/data/tools/toolsData";
import { videoSchemaToolIntro } from "app/data/tools/toolsIntro";

export const metadata = {
  title: "Free Video Schema Generator – Create JSON-LD Video Markup Instantly",
  description:
    "Generate accurate JSON-LD Video Schema markup in seconds with our Free Video Schema Generator. Improve video SEO, enhance search visibility, and help search engines understand your video content.",
};

export default function VideoSchemaGeneratorPage() {
  return (
    <main>
       <div className="bg-[#fef7f5] pt-16 lg:pt-20">
            <h1 className="text-[#212E4A] text-4xl lg:text-7xl text-center font-extrabold leading-tight">
        Video Schema{" "}
        <span className="text-[#f35d36]">Generator</span>
      </h1>
      {/* Description Text */}
        <p className="text-[#606162] text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mt-4 px-4 text-center">
           The video schema generator tool simplifies creating structured data for videos, improving SEO performance and boosting visibility on search engines. Perfect for professionals and beginners alike, this tool ensures your video content gets noticed.
        </p>
      {/* 2. Tool Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 ">
          <VideoSchemaForm />
        </div>
      </section>
       </div>
       {/* The Steps Section */}
      <ToolStepsSection
        title={videoSchemaToolSteps.title}
        description={videoSchemaToolSteps.description}
        steps={videoSchemaToolSteps.steps}
      />
       {/* Tools Intro Section */}
      <ToolIntroSection 
        title={videoSchemaToolIntro.title}
        description={videoSchemaToolIntro.description}
        image={videoSchemaToolIntro.image}
        useCasesTitle={videoSchemaToolIntro.useCasesTitle}
        useCasesIntro={videoSchemaToolIntro.useCasesIntro}
        useCases={videoSchemaToolIntro.useCases}
      />
      <ClientsLogos/>
      <ToolFeaturesSection
        title={videoSchemaToolFeatures.title}
        description={videoSchemaToolFeatures.description}
        features={videoSchemaToolFeatures.features}
      />
       <RelatedToolsSection
        title={schemaGeneratorRelatedToolsData.title} 
        tools={schemaGeneratorRelatedToolsData.tools} 
      />
    </main>
  );
}