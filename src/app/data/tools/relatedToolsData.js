import React from 'react';
import { FaPenNib, FaParagraph, FaExpandAlt } from 'react-icons/fa';
import { MdOutlineShortText, MdTitle, MdOutlineSummarize } from 'react-icons/md';
import { TbFileInfo, TbAbc } from 'react-icons/tb';
import { BiText } from 'react-icons/bi';

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