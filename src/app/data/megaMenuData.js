import { FaBezierCurve, FaBriefcase, FaChartLine, FaCode, FaCopy, FaFileCode, FaFileInvoiceDollar, FaFileVideo, FaInfoCircle, FaLaptopCode, FaLeaf, FaLink, FaMapMarkerAlt, FaMedkit, FaQuestionCircle, FaRobot, FaSearch, FaShieldAlt, FaShopify, FaShoppingBag, FaStarHalf, FaUsers, FaVideo, FaVideoSlash, FaWordpress } from "react-icons/fa";
import { FaArrowUpRightFromSquare, FaClapperboard, FaPhotoFilm, FaSquareUpRight, FaWebflow } from "react-icons/fa6";
import Frame1Image from '@assets/images/Frame1.png'; 
import Frame19Bg from '@assets/images/Frame-19.png';
import AboutBannerBg from '@assets/images/We-Are-CTA.png';

const primaryIconBg = '[background-color:var(--color-primary)]'; 
const secondaryIconBg = '[background-color:var(--color-secondary)]';
const primaryColorName = 'primary';
const secondaryColorName = 'secondary';
const tertiaryColorName = 'tertiary';
const quaternaryColorName = 'quaternary';
const quinaryColorName = 'quinary';
// Structured data for the Mega Menu
export const MegaMenuData = [
  {
    type: 'banner',
    title: 'Managed SEO',
    description: 'Reach your ranking goals with our comprehensive SEO management services.',
    buttonText: 'View Pricing ➔',
    buttonLink: 'https://microters.com/professional-seo-services/',
    imagePath: Frame1Image, 
    bannerBgPath: Frame19Bg,
  },
  
  {
    type: 'links',
    sections: [
      {
        title: 'SEO Services',
        titleColorName: primaryColorName,
        iconBgClass: primaryIconBg,
        links: [
          { name: 'Professional SEO ➔', href: '/professional-seo-services', Icon: FaChartLine },
          { name: 'SaaS SEO ➔', href: '/saas-seo-services', Icon: FaSearch },
          { name: 'eCommerce SEO ➔', href: '/e-commerce-seo', Icon: FaShoppingBag },
          { name: 'Shopify SEO ➔', href: '/shopify-seo-services', Icon: FaShopify },
          { name: 'Webflow SEO ➔', href: '/webflow-seo-services', Icon: FaWebflow },
          { name: 'Healthcare SEO ➔', href: '/healthcare-seo-services', Icon: FaMedkit },
        ],
      },
      {
        title: 'SEO Backlinks',
        titleColorName: quaternaryColorName,
        iconBgClass: primaryIconBg,
        links: [
          { name: 'HARO Backlinks ➔', href: '/haro-backlinks-services', Icon: FaArrowUpRightFromSquare },
          { name: 'Outreach Backlinks ➔', href: '/outreach-backlinks-services', Icon: FaSquareUpRight },
          { name: 'Sponsored Post ➔', href: '#', Icon: FaFileInvoiceDollar },
          { name: 'ABC Backlinks ➔', href: '#', Icon: FaBezierCurve },
          { name: 'PR Backlinks ➔', href: '#', Icon: FaLink },
          { name: 'Foundation Links ➔', href: '/high-authority-link-insertion-services', Icon: FaLink },
          { name: 'High Authority Link Insertion ➔', href: '/high-authority-link-insertion-services', Icon: FaSquareUpRight },
        ],
      },
    ],
  },
  {
    type: 'links',
    sections: [
      {
        title: 'Video Editing',
        titleColorName: secondaryColorName,
        iconBgClass: secondaryIconBg,
        links: [
          { name: 'Explainer Video Editing ➔', href: '#', Icon: FaVideoSlash},
          { name: 'SaaS Product Video ➔', href: '#', Icon: FaClapperboard },
          { name: 'Promotional Video ➔', href: '#', Icon: FaVideo },
          { name: 'Reel Video Editing ➔', href: '#', Icon: FaFileVideo },
          { name: 'Long Video Editing ➔', href: '#', Icon: FaPhotoFilm },
        ],
      },
      {
        title: 'AI & Writing Services',
        titleColorName: quinaryColorName,
        iconBgClass: secondaryIconBg,
        links: [
          { name: 'WP AI Automation ➔', href: '#', Icon: FaWordpress },
          { name: 'AI Writing Services ➔', href: '#', Icon: FaRobot },
          { name: 'Shopify AI Content ➔', href: '#', Icon: FaShopify },
          { name: 'Copy Writing Services ➔', href: '#', Icon: FaCopy },
          { name: 'Product Review Writing ➔', href: '#', Icon: FaStarHalf },
        ],
      },
    ],
  },
  {
    type: 'links',
    sections: [
      {
        title: 'Development',
        titleColorName: tertiaryColorName,
        iconBgClass: primaryIconBg,
        links: [
          { name: 'WP Development Services ➔', href: '#', Icon: FaLaptopCode },
          { name: 'SaaS Development ➔', href: '#', Icon: FaCode },
          { name: 'WP Plugin Development ➔', href: '#', Icon: FaFileCode },
          { name: 'WP Maintenance Services ➔', href: '#', Icon: FaCode },
        ],
      },
    ],
  },
  {
    type: 'banner_about',
    title: "Hi. We're Microters.",
    description: 'Microters is A Full-Service Agency Specializing In SEO, Software Development, Digital Marketing, Content Strategy, And Web Design. We Approach Our Work With Passion And Pride In Everything We Do.',
    buttonText: 'Contact Sales ➔',
    buttonLink: '#',
    bannerBgPath: AboutBannerBg,
    customBgColor: 'bg-gray-100',
    hasFooter: false,
  },
  {
    type: 'links_about',
    sections: [
      {
        title: 'ABOUT',
        titleColorName: primaryColorName,
        iconBgClass: primaryIconBg,
        links: [
          { name: 'Our Team ➔', href: '/our-team', Icon: FaUsers },
          { name: 'About Us ➔', href: '/about', Icon: FaInfoCircle },
          { name: 'Microters Career ➔', href: '/microters-career', Icon: FaBriefcase },
          { name: 'Microters Culture ➔', href: '/microters-culture', Icon: FaLeaf },
        ],
      },
      {
        title: 'MORE',
        titleColorName: secondaryColorName,
        iconBgClass: secondaryIconBg,
        links: [
          { name: 'Refund Policy ➔', href: '/refund-policy', Icon: FaShieldAlt },
          { name: 'Help Center ➔', href: '#', Icon: FaQuestionCircle },
          { name: 'Locations ➔', href: '#', Icon: FaMapMarkerAlt },
        ],
      },
    ],
  },
{
    type: 'links_tools',
    sections: [
        {
            title: 'SEO TOOLS',
            titleColorName: primaryColorName,
            iconBgClass: primaryIconBg,
            links: [
                { name: 'Breadcrumb Generator', href: '/seo-tools/breadcrumb-generator', Icon: FaArrowUpRightFromSquare },
                { name: 'Case Converter Tool', href: '/seo-tools/case-converter', Icon: FaCopy },
                { name: 'Cursive Text Generator', href: '/seo-tools/cursive-text-generator', Icon: FaBezierCurve },
                { name: 'Event Schema Generator', href: '/seo-tools/event-schema-generator', Icon: FaSearch },
                { name: 'FAQ Schema Generator', href: '/seo-tools/faq-schema-generator', Icon: FaQuestionCircle },
                { name: 'HowTo Schema Generator', href: '#', Icon: FaFileCode },
                { name: 'Internal Link Analyzer', href: '/seo-tools/internal-link-analyzer', Icon: FaLink },
                { name: 'Local Business Schema', href: '/seo-tools/local-business-schema', Icon: FaShopify },
                { name: 'Word Counter', href: '/seo-tools/word-counter', Icon: FaWordpress },
                { name: 'Permalink Generator', href: '#', Icon: FaLink },
                { name: 'Person Schema Generator', href: '#', Icon: FaUsers },
                { name: 'Recipe Schema Generator', href: '#', Icon: FaStarHalf },
                { name: 'Schema Generator', href: '/seo-tools/schema-generator', Icon: FaSearch },
                { name: 'Video Schema Generator', href: '#', Icon: FaFileVideo },
                { name: 'Website Schema Generator', href: '#', Icon: FaLaptopCode },
            ],
        },
        {
            title: 'DISCLAIMER TOOLS',
            titleColorName: primaryColorName,
            iconBgClass: primaryIconBg,
            links: [
                { name: 'Disclaimer Generator', href: '/seo-tools/disclaimer-generator', Icon: FaFileInvoiceDollar },
                { name: 'Keywords Cluster',  href: '/seo-tools/keyword-clustering', Icon: FaChartLine },
                { name: 'XML Sitemap URL Extractor', href: '#', Icon: FaFileCode },
                { name: 'Google Auto Suggest Keyword', href: '#', Icon: FaSearch },
                { name: 'Headline Generator', href: '/seo-tools/headline-generator', Icon: FaCode },
                { name: 'HTML Heading Checker', href: '#', Icon: FaCode },
                { name: 'Job Post Schema', href: '/seo-tools/job-post-schema', Icon: FaCode },
                { name: 'Keyword Grouping', href: '/seo-tools/keyword-grouping', Icon: FaSearch },
                { name: 'Meta Tags Checker', href: '#', Icon: FaCopy },
                { name: 'Organization Schema', href: '#', Icon: FaShopify },
                { name: 'Product Schema', href: '#', Icon: FaShoppingBag },
                { name: 'Product.txt Validator', href: '#', Icon: FaRobot },
                { name: 'ULK Web Word Counter', href: '/seo-tools/ulk-web-word-counter', Icon: FaCode },
            ],
        },
        {
            title: 'AI WRITING TOOLS',
            titleColorName: secondaryColorName,
            iconBgClass: secondaryIconBg,
            links: [
                { name: 'Acronym Generator', href: '/ai-writing-tools/acronym-generator', Icon: FaRobot },
                { name: 'AI Article Generator', href: '#', Icon: FaRobot },
                { name: 'Conclusion Generator', href: '/ai-writing-tools/conclusion-generator', Icon: FaRobot },
                { name: 'Essay Writer', href: '/ai-writing-tools/essay-writer', Icon: FaRobot },
                { name: 'Thesis Statement Generator', href: '#', Icon: FaRobot },
                { name: 'Sentence Expander', href: '#', Icon: FaRobot },
                { name: 'Sentence Generator', href: '#', Icon: FaRobot },
                { name: 'Paragraph Generator', href: '#', Icon: FaRobot },
                { name: 'Thesis Generator', href: '#', Icon: FaRobot },
            ],
        },
        {
            title: 'VIDEO TOOLS',
            titleColorName: secondaryColorName,
            iconBgClass: secondaryIconBg,
            links: [
                { name: 'YouTube Video Downloader', href: '#', Icon: FaVideo },
                { name: 'Shorts Video Downloader', href: '#', Icon: FaVideo },
                { name: 'Shorts To MP3 Downloader', href: '#', Icon: FaVideo },
                { name: 'Shorts To MP4 Downloader', href: '#', Icon: FaVideo },
                { name: 'YouTube To MP3 Downloader', href: '#', Icon: FaVideo },
                { name: 'YouTube To MP4 Downloader', href: '#', Icon: FaVideo },
            ],
        },
    ],
},
];
