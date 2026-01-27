'use client';

import { useState, useEffect } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaLink, FaCheck } from 'react-icons/fa';

export default function BlogSocialMedia({ postSlug, postTitle }) {
  const [copied, setCopied] = useState(false);
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBaseUrl(window.location.origin);
    }
  }, []);

  const fullUrl = `${baseUrl}/blog/${postSlug}`;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(postTitle);

  const shareLinks = [
    {
      name: 'Facebook',
      icon: <FaFacebookF />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white',
    },
    {
      name: 'Twitter',
      icon: <FaTwitter />,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'hover:bg-[#1DA1F2] hover:border-[#1DA1F2] hover:text-white',
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedinIn />,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
      color: 'hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white',
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-3">
      {shareLinks.map((platform) => (
        <a
          key={platform.name}
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${platform.name}`}
          className={`
            w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 
            text-gray-500 transition-all duration-300 ease-in-out
            ${platform.color}
          `}
        >
          {platform.icon}
        </a>
      ))}

      {/* Copy Link Button */}
      <button
        onClick={handleCopy}
        aria-label="Copy Link"
        className={`
          w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-300 ease-in-out
          ${copied 
            ? 'bg-green-500 border-green-500 text-white' 
            : 'border-gray-200 text-gray-500 hover:border-[#f35d36] hover:bg-[#f35d36] hover:text-white'
          }
        `}
      >
        {copied ? <FaCheck /> : <FaLink />}
      </button>
    </div>
  );
}