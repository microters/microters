import React from 'react';
import { FaPenNib, FaParagraph, FaExpandAlt, FaQuestionCircle, FaLayerGroup, FaListOl, FaBriefcase, FaStore, FaBuilding, FaUser, FaBoxOpen, FaUtensils, FaVideo, FaGlobe, FaSignature, FaExclamationCircle, FaSitemap, FaGoogle, FaHeading, FaCode, FaLink, FaRobot, FaYoutube, FaMusic, FaFileAudio, FaFileVideo } from 'react-icons/fa';
import { MdTitle, MdOutlineSummarize, MdOutlineArticle, MdOutlineLinearScale, MdEvent } from 'react-icons/md';
import { TbFileInfo, TbAbc, TbSchema, TbLetterCase, TbSeo, TbNumbers } from 'react-icons/tb';
import { BiText } from 'react-icons/bi';
import { FaClapperboard } from 'react-icons/fa6';

export const relatedToolsData = {
  title: "Other writing tools you may be interested in",
  tools: [
    {
      id: 1,
      title: "Acronym Generator",
      icon: <TbAbc className="text-3xl" />,
      link: "/ai-writing-tools/acronym-generator/"
    },
    {
      id: 2,
      title: "AI Essay Writer",
      icon: <FaPenNib className="text-2xl" />,
      link: "/ai-writing-tools/essay-writer/"
    },
    {
      id: 3,
      title: "Conclusion Generator",
      icon: <MdOutlineSummarize className="text-3xl" />,
      link: "/ai-writing-tools/conclusion-generator/"
    },
    {
      id: 4,
      title: "Paragraph Generator",
      icon: <FaParagraph className="text-2xl" />,
      link: "/ai-writing-tools/paragraph-generator/"
    },
    {
      id: 5,
      title: "Sentence Generator",
      icon: <BiText className="text-3xl" />,
      link: "/ai-writing-tools/sentence-generator/"
    },
    {
      id: 6,
      title: "Sentence Expander",
      icon: <FaExpandAlt className="text-2xl" />,
      link: "/ai-writing-tools/sentence-expander/"
    },
    {
      id: 7,
      title: "Thesis Generator",
      icon: <TbFileInfo className="text-3xl" />,
      link: "/ai-writing-tools/thesis-generator/"
    },
    {
      id: 8,
      title: "Thesis Statement Generator",
      icon: <TbFileInfo className="text-3xl" />, 
      link: "https://aibuster.com/ai-writing-tools/thesis-statement-generator/"
    },
    {
      id: 9,
      title: "Title Generator",
      icon: <MdTitle className="text-3xl" />,
      link: "/seo-tools/title-generator/"
    }
  ]
};

export const schemaGeneratorRelatedToolsData = {
  title: "Other SEO tools you may be interested in",
  tools: [
    {
      id: 1,
      title: "Article Schema Generator",
      icon: <MdOutlineArticle className="text-3xl" />,
      link: "/seo-tools/article-schema-generator/"
    },
    {
      id: 2,
      title: "Breadcrumb Schema Generator",
      icon: <MdOutlineLinearScale className="text-3xl" />,
      link: "/seo-tools/breadcrumb-generator/"
    },
    {
      id: 3,
      title: "Event Schema Generator",
      icon: <MdEvent className="text-3xl" />,
      link: "/seo-tools/event-schema-generator/"
    },
    {
      id: 4,
      title: "FAQ Schema Generator",
      icon: <FaQuestionCircle className="text-2xl" />,
      link: "/seo-tools/faq-schema-generator/"
    },
    {
      id: 5,
      title: "Keyword Grouping",
      icon: <FaLayerGroup className="text-2xl" />,
      link: "/seo-tools/keyword-grouping/"
    },
    {
      id: 6,
      title: "HowTo Schema Generator",
      icon: <FaListOl className="text-2xl" />,
      link: "/seo-tools/howto-schema-generator/"
    },
    {
      id: 7,
      title: "Job Posting Schema",
      icon: <FaBriefcase className="text-2xl" />,
      link: "/seo-tools/job-post-schema/"
    },
    {
      id: 8,
      title: "Local Business Schema",
      icon: <FaStore className="text-2xl" />,
      link: "/seo-tools/local-business-schema/"
    },
    {
      id: 9,
      title: "Organization Schema",
      icon: <FaBuilding className="text-2xl" />,
      link: "/seo-tools/organization-schema-generator/"
    },
    {
      id: 10,
      title: "Person Schema Generator",
      icon: <FaUser className="text-2xl" />,
      link: "/seo-tools/person-schema-generator/"
    },
    {
      id: 11,
      title: "Product Schema Generator",
      icon: <FaBoxOpen className="text-2xl" />,
      link: "/seo-tools/product-schema/"
    },
    {
      id: 12,
      title: "Recipe Schema Generator",
      icon: <FaUtensils className="text-2xl" />,
      link: "/seo-tools/recipe-schema/"
    },
    {
      id: 13,
      title: "Schema Markup Generator",
      icon: <TbSchema className="text-3xl" />,
      link: "/seo-tools/schema-generator/"
    },
    {
      id: 14,
      title: "Video Schema Generator",
      icon: <FaVideo className="text-2xl" />,
      link: "/seo-tools/video-schema/"
    },
    {
      id: 15,
      title: "Website Schema Generator",
      icon: <FaGlobe className="text-2xl" />,
      link: "/seo-tools/website-schema/"
    },
    {
      id: 16,
      title: "Case Converter Tool",
      icon: <TbLetterCase className="text-3xl" />,
      link: "/seo-tools/case-converter/"
    },
    {
      id: 17,
      title: "Cursive Text Generator",
      icon: <FaSignature className="text-2xl" />,
      link: "/seo-tools/cursive-text-generator/"
    },
    {
      id: 18,
      title: "Disclaimer Generator",
      icon: <FaExclamationCircle className="text-2xl" />,
      link: "/seo-tools/disclaimer-generator/"
    },
    {
      id: 19,
      title: "Keywords Cluster",
      icon: <TbSeo className="text-3xl" />,
      link: "/seo-tools/keyword-clustering/"
    },
    {
      id: 20,
      title: "XML Sitemap Extractor",
      icon: <FaSitemap className="text-2xl" />,
      link: "/seo-tools/xml-sitemap-url-extractor/"
    },
    {
      id: 21,
      title: "Google Keyword Tools",
      icon: <FaGoogle className="text-2xl" />,
      link: "/seo-tools/google-auto-suggest-keyword-tools/"
    },
    {
      id: 22,
      title: "Headline Generator",
      icon: <FaHeading className="text-2xl" />,
      link: "/seo-tools/headline-generator/"
    },
    {
      id: 23,
      title: "HTML Heading Checker",
      icon: <FaCode className="text-2xl" />,
      link: "/seo-tools/html-heading-checker/"
    },
    {
      id: 24,
      title: "Internal Link Analyzer",
      icon: <FaLink className="text-2xl" />,
      link: "/seo-tools/internal-link-analyzer/"
    },
    {
      id: 25,
      title: "Meta Tags Checker",
      icon: <FaCode className="text-2xl" />,
      link: "/seo-tools/meta-tags-checker/"
    },
    {
      id: 26,
      title: "Word Counter Tool",
      icon: <TbNumbers className="text-3xl" />,
      link: "/seo-tools/word-counter/"
    },
    {
      id: 27,
      title: "Permalink Generator",
      icon: <FaLink className="text-2xl" />,
      link: "/seo-tools/permalink-generator/"
    },
    {
      id: 28,
      title: "Robots.txt Validator",
      icon: <FaRobot className="text-2xl" />,
      link: "/seo-tools/robots-txt-validator/"
    },
    {
      id: 29,
      title: "Title Generator",
      icon: <MdTitle className="text-3xl" />,
      link: "/seo-tools/title-generator/"
    },
    {
      id: 30,
      title: "ULK Web Word Counter",
      icon: <TbNumbers className="text-3xl" />,
      link: "/seo-tools/ulk-web-word-counter/"
    }
  ]
};

export const videoRelatedToolsData = {
  title: "Other Video tools you may be interested in",
  tools: [
    {
      id: 1,
      title: "YouTube Video Downloader",
      icon: <FaYoutube className="text-2xl" />,
      link: "/video-tools/youtube-video-downloader"
    },
    {
      id: 2,
      title: "YouTube Shorts Downloader",
      icon: <FaClapperboard className="text-2xl" />,
      link: "/video-tools/youtube-shorts-downloader"
    },
    {
      id: 3,
      title: "YouTube Shorts To MP3",
      icon: <FaMusic className="text-2xl" />,
      link: "/video-tools/youtube-shorts-to-mp3-downloader"
    },
    {
      id: 4,
      title: "YouTube Shorts To MP4",
      icon: <FaVideo className="text-2xl" />,
      link: "/video-tools/youtube-shorts-to-mp4-downloader"
    },
    {
      id: 5,
      title: "YouTube To MP3 Downloader",
      icon: <FaFileAudio className="text-2xl" />,
      link: "/video-tools/youtube-to-mp3-downloader"
    },
    {
      id: 6,
      title: "YouTube To MP4 Downloader",
      icon: <FaFileVideo className="text-2xl" />,
      link: "/video-tools/youtube-to-mp4-downloader"
    }
  ]
};