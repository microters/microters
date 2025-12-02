import ClientsLogos from "app/components/common/ClientsLogos";
import RelatedToolsSection from "app/components/common/RelatedTools";
import ToolFeaturesSection from "app/components/common/ToolFeatures";
import ToolIntroSection from "app/components/common/ToolIntro";
import ToolStepsSection from "app/components/common/ToolSteps";
import YouTubeDownloader from "app/components/tools/YouTubeDownloader";
import { videoRelatedToolsData } from "app/data/tools/relatedToolsData";
import { youtubeShortsDownloaderToolFeatures } from "app/data/tools/toolFeatures";
import { youtubeShortsDownloaderToolSteps } from "app/data/tools/toolsData";
import { youtubeShortsDownloaderToolIntro } from "app/data/tools/toolsIntro";

export const metadata = {
  title: "Free YouTube Video Downloader – Download YouTube Videos Instantly",
  description:
    "Download YouTube videos quickly and easily with our Free YouTube Video Downloader. Save tutorials, music, and your favorite content for offline viewing in just one click.",
};

export default function YouTubeVideoDownloaderPage() {
  return (
    <main>
       <div className="bg-[#fef7f5] pt-16 lg:pt-20">
            <h1 className="text-[#212E4A] text-4xl lg:text-7xl text-center font-extrabold leading-tight">
        YouTube Video{" "}
        <span className="text-[#f35d36]">Downloader</span>
      </h1>
      {/* Description Text */}
        <p className="text-[#606162] text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mt-4 px-4 text-center">
           The YouTube Video Downloader is a simple and effective tool that allows you to download your favorite YouTube videos directly to your device. Whether it’s a tutorial, music video, or any other type of content, this tool helps you save videos for offline viewing, making it easier to access them anytime without an internet connection.
        </p>
      {/* 2. Tool Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 ">
          <YouTubeDownloader />
        </div>
      </section>
       </div>
       {/* The Steps Section */}
      <ToolStepsSection
        title={youtubeShortsDownloaderToolSteps.title}
        description={youtubeShortsDownloaderToolSteps.description}
        steps={youtubeShortsDownloaderToolSteps.steps}
      />
       {/* Tools Intro Section */}
      <ToolIntroSection 
        title={youtubeShortsDownloaderToolIntro.title}
        description={youtubeShortsDownloaderToolIntro.description}
        image={youtubeShortsDownloaderToolIntro.image}
        useCasesTitle={youtubeShortsDownloaderToolIntro.useCasesTitle}
        useCasesIntro={youtubeShortsDownloaderToolIntro.useCasesIntro}
        useCases={youtubeShortsDownloaderToolIntro.useCases}
      />
      <ClientsLogos/>
      <ToolFeaturesSection
        title={youtubeShortsDownloaderToolFeatures.title}
        description={youtubeShortsDownloaderToolFeatures.description}
        features={youtubeShortsDownloaderToolFeatures.features}
      />
       <RelatedToolsSection
        title={videoRelatedToolsData.title} 
        tools={videoRelatedToolsData.tools} 
      />
    </main>
  );
}