import ClientsLogos from "app/components/common/ClientsLogos";
import RelatedToolsSection from "app/components/common/RelatedTools";
import ToolFeaturesSection from "app/components/common/ToolFeatures";
import ToolIntroSection from "app/components/common/ToolIntro";
import ToolStepsSection from "app/components/common/ToolSteps";
import YouTubeToMP3Downloader from "app/components/tools/YouTubeToMP3Downloader";
import { videoRelatedToolsData } from "app/data/tools/relatedToolsData";
import { youtubeToMp3DownloaderToolFeatures } from "app/data/tools/toolFeatures";
import { youtubeToMp3DownloaderToolSteps } from "app/data/tools/toolsData";
import { youtubeToMp3DownloaderToolIntro } from "app/data/tools/toolsIntro";

export const metadata = {
  title: "Free YouTube to MP3 Downloader – Convert Videos to MP3 Safely & Instantly",
  description:
    "Convert YouTube videos to high-quality MP3 audio instantly with our Free YouTube to MP3 Downloader. Fast, easy, and secure—use only with content you own or have permission to download.",
};

export default function YouTubeToMP3DownloaderPage() {
  return (
    <main>
      <div className="bg-[#fef7f5] pt-16 lg:pt-20">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-[#212E4A] text-4xl lg:text-7xl text-center font-extrabold leading-tight">
            Free YouTube To{" "}
            <span className="text-[#f35d36]">MP3 Downloader</span>
          </h1>
          {/* Description Text */}
          <p className="text-[#606162] text-lg lg:text-xl leading-relaxed max-w-5xl mx-auto mt-4 px-4 text-center">
            A Free YouTube To Mp3 Downloader allows you to quickly and easily convert your favorite YouTube videos into high-quality MP3 files. With this tool, you can enjoy your favorite music and podcasts offline, anytime, and anywhere.
          </p>
        </div>
        {/* 2. Tool Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 ">
            <YouTubeToMP3Downloader />
          </div>
        </section>
      </div>
      {/* The Steps Section */}
      <ToolStepsSection
        title={youtubeToMp3DownloaderToolSteps.title}
        description={youtubeToMp3DownloaderToolSteps.description}
        steps={youtubeToMp3DownloaderToolSteps.steps}
      />
      {/* Tools Intro Section */}
      <ToolIntroSection
        title={youtubeToMp3DownloaderToolIntro.title}
        description={youtubeToMp3DownloaderToolIntro.description}
        image={youtubeToMp3DownloaderToolIntro.image}
        useCasesTitle={youtubeToMp3DownloaderToolIntro.useCasesTitle}
        useCasesIntro={youtubeToMp3DownloaderToolIntro.useCasesIntro}
        useCases={youtubeToMp3DownloaderToolIntro.useCases}
      />
      <ClientsLogos />
      <ToolFeaturesSection
        title={youtubeToMp3DownloaderToolFeatures.title}
        description={youtubeToMp3DownloaderToolFeatures.description}
        features={youtubeToMp3DownloaderToolFeatures.features}
      />
      <RelatedToolsSection
        title={videoRelatedToolsData.title}
        tools={videoRelatedToolsData.tools}
      />
    </main>
  );
}