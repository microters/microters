import ClientsLogos from "app/components/common/ClientsLogos";
import RelatedToolsSection from "app/components/common/RelatedTools";
import ToolFeaturesSection from "app/components/common/ToolFeatures";
import ToolIntroSection from "app/components/common/ToolIntro";
import ToolStepsSection from "app/components/common/ToolSteps";
import InternalLinkAnalyzer from "app/components/tools/InternalLinkAnalyzer";
import { schemaGeneratorRelatedToolsData } from "app/data/tools/relatedToolsData";
import { internalLinkAnalyzerToolFeatures } from "app/data/tools/toolFeatures";
import { internalLinkAnalyzerToolSteps } from "app/data/tools/toolsData";
import { internalLinkAnalyzerToolIntro } from "app/data/tools/toolsIntro";

export const metadata = {
  title: "Free Internal Link Analyzer – Check Internal Links & Improve Site SEO",
  description:
    "Analyze your website’s internal links instantly with our Free Internal Link Analyzer. Improve site structure, boost SEO rankings, and optimize user navigation with accurate link insights.",
};

export default function InternalLinkAnalyzerPage() {
  return (
    <main>
       <div className="bg-[#fef7f5] pt-16 lg:pt-20">
            <h1 className="text-[#212E4A] text-4xl lg:text-7xl text-center font-extrabold leading-tight">
        Free Internal Link{" "}
        <span className="text-[#f35d36]">Analyzer Tool</span>
      </h1>
      {/* Description Text */}
        <p className="text-[#606162] text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mt-4 px-4 text-center">       
            Efficiently manage your website’s internal linking structure with the Free Internal Link Checker Tool. This easy-to-use tool simplifies link analysis, helping you improve navigation, boost SEO rankings, and enhance user experience. Perfect for marketers, bloggers, and website owners, it ensures your site stays optimized.
        </p>
      {/* 2. Tool Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 ">
          <InternalLinkAnalyzer/>
        </div>
      </section>
       </div>
       {/* The Steps Section */}
      <ToolStepsSection
        title={internalLinkAnalyzerToolSteps.title}
        description={internalLinkAnalyzerToolSteps.description}
        steps={internalLinkAnalyzerToolSteps.steps}
      />
       {/* Tools Intro Section */}
      <ToolIntroSection 
        title={internalLinkAnalyzerToolIntro.title}
        description={internalLinkAnalyzerToolIntro.description}
        image={internalLinkAnalyzerToolIntro.image}
        useCasesTitle={internalLinkAnalyzerToolIntro.useCasesTitle}
        useCasesIntro={internalLinkAnalyzerToolIntro.useCasesIntro}
        useCases={internalLinkAnalyzerToolIntro.useCases}
      />
      <ClientsLogos/>
      <ToolFeaturesSection
        title={internalLinkAnalyzerToolFeatures.title}
        description={internalLinkAnalyzerToolFeatures.description}
        features={internalLinkAnalyzerToolFeatures.features}
      />
       <RelatedToolsSection
        title={schemaGeneratorRelatedToolsData.title} 
        tools={schemaGeneratorRelatedToolsData.tools} 
      />
    </main>
  );
}