import ClientsLogos from "app/components/common/ClientsLogos";
import RelatedToolsSection from "app/components/common/RelatedTools";
import ToolFeaturesSection from "app/components/common/ToolFeatures";
import ToolIntroSection from "app/components/common/ToolIntro";
import ToolStepsSection from "app/components/common/ToolSteps";
import EventSchemaForm from "app/components/tools/EventSchema";
import { schemaGeneratorRelatedToolsData } from "app/data/tools/relatedToolsData";
import { eventSchemaGeneratorToolFeatures } from "app/data/tools/toolFeatures";
import { eventSchemaGeneratorToolSteps } from "app/data/tools/toolsData";
import { eventSchemaGeneratorToolIntro } from "app/data/tools/toolsIntro";

export const metadata = {
  title: "Free Event Schema Generator – Create JSON-LD Event Markup Instantly",
  description:
    "Generate accurate JSON-LD Event Schema Markup for your website in seconds. Improve SEO and enhance event visibility on Google with our Free Event Schema Generator Tool.",
};

export default function EventSchemaGeneratorPage() {
  return (
    <main>
       <div className="bg-[#fef7f5] pt-16 lg:pt-20">
            <h1 className="text-[#212E4A] text-4xl lg:text-7xl text-center font-extrabold leading-tight">
        Event Schema{" "}
        <span className="text-[#f35d36]">Generator Tool</span>
      </h1>
      {/* Description Text */}
        <p className="text-[#606162] text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mt-4 px-4 text-center">
           The Event Schema Generator is a powerful tool designed to simplify adding structured data to your event web pages. It helps improve search engine visibility by making your event details more accessible to users and search engines. With its intuitive interface and reliable performance, it is ideal for professionals looking to enhance their online presence.
        </p>
      {/* 2. Tool Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 ">
          <EventSchemaForm />
        </div>
      </section>
       </div>
       {/* The Steps Section */}
      <ToolStepsSection
        title={eventSchemaGeneratorToolSteps.title}
        description={eventSchemaGeneratorToolSteps.description}
        steps={eventSchemaGeneratorToolSteps.steps}
      />
       {/* Tools Intro Section */}
      <ToolIntroSection 
        title={eventSchemaGeneratorToolIntro.title}
        description={eventSchemaGeneratorToolIntro.description}
        image={eventSchemaGeneratorToolIntro.image}
        useCasesTitle={eventSchemaGeneratorToolIntro.useCasesTitle}
        useCasesIntro={eventSchemaGeneratorToolIntro.useCasesIntro}
        useCases={eventSchemaGeneratorToolIntro.useCases}
      />
      <ClientsLogos/>
      <ToolFeaturesSection
        title={eventSchemaGeneratorToolFeatures.title}
        description={eventSchemaGeneratorToolFeatures.description}
        features={eventSchemaGeneratorToolFeatures.features}
      />
       <RelatedToolsSection
        title={schemaGeneratorRelatedToolsData.title} 
        tools={schemaGeneratorRelatedToolsData.tools} 
      />
    </main>
  );
}