import { FaBezierCurve, FaChartLine, FaCode, FaCopy, FaFileCode, FaFileInvoiceDollar, FaFileVideo, FaLaptopCode, FaLink, FaMedkit, FaRobot, FaSearch, FaShopify, FaShoppingBag, FaStarHalf, FaVideo, FaVideoSlash, FaWordpress } from "react-icons/fa";
import { FaArrowUpRightFromSquare, FaClapperboard, FaPhotoFilm, FaSquareUpRight, FaWebflow } from "react-icons/fa6";
import Frame1Image from '@assets/images/Frame1.png'; 
import Frame19Bg from '@assets/images/Frame-19.png';

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
];
