import ClientsLogos from "app/components/common/ClientsLogos";
import RelatedToolsSection from "app/components/common/RelatedTools";
import ToolFeaturesSection from "app/components/common/ToolFeatures";
import ToolIntroSection from "app/components/common/ToolIntro";
import ToolStepsSection from "app/components/common/ToolSteps";
import YouTubeToMP4Downloader from "app/components/tools/YouTubeToMP4Downloader";
import { videoRelatedToolsData } from "app/data/tools/relatedToolsData";
import { youtubeToMp4DownloaderToolFeatures } from "app/data/tools/toolFeatures";
import { youtubeToMp4DownloaderToolSteps } from "app/data/tools/toolsData";
import { youtubeToMp4DownloaderToolIntro } from "app/data/tools/toolsIntro";

export const metadata = {
  title: "Free YouTube to MP4 Downloader – Convert YouTube Videos to MP4 Instantly",
  description:
    "Convert YouTube videos to high-quality MP4 format instantly with our Free YouTube to MP4 Downloader. Fast, easy, and secure—use only with content you own or have permission to download.",
};

export default function YouTubeToMP4DownloaderPage() {
  return (
    <main>
       <div className="bg-[#fef7f5] pt-16 lg:pt-20">
          <div className="max-w-5xl mx-auto">
                <h1 className="text-[#212E4A] text-4xl lg:text-7xl text-center font-extrabold leading-tight">
        Free YouTube To{" "}
        <span className="text-[#f35d36]">MP4 Downloader</span>
      </h1>
      {/* Description Text */}
        <p className="text-[#606162] text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mt-4 px-4 text-center">
           The Free YouTube To MP4 Downloader Tool allows you to easily convert YouTube videos into MP4 format for offline viewing. With this tool, you can enjoy videos on your device without worrying about internet connection, all for free.
        </p>
          </div>
      {/* 2. Tool Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 ">
          <YouTubeToMP4Downloader />
        </div>
      </section>
       </div>
       {/* The Steps Section */}
      <ToolStepsSection
        title={youtubeToMp4DownloaderToolSteps.title}
        description={youtubeToMp4DownloaderToolSteps.description}
        steps={youtubeToMp4DownloaderToolSteps.steps}
      />
       {/* Tools Intro Section */}
      <ToolIntroSection 
        title={youtubeToMp4DownloaderToolIntro.title}
        description={youtubeToMp4DownloaderToolIntro.description}
        image={youtubeToMp4DownloaderToolIntro.image}
        useCasesTitle={youtubeToMp4DownloaderToolIntro.useCasesTitle}
        useCasesIntro={youtubeToMp4DownloaderToolIntro.useCasesIntro}
        useCases={youtubeToMp4DownloaderToolIntro.useCases}
      />
      <ClientsLogos/>
      <ToolFeaturesSection
        title={youtubeToMp4DownloaderToolFeatures.title}
        description={youtubeToMp4DownloaderToolFeatures.description}
        features={youtubeToMp4DownloaderToolFeatures.features}
      />
       <RelatedToolsSection
        title={videoRelatedToolsData.title} 
        tools={videoRelatedToolsData.tools} 
      />
    </main>
  );
}