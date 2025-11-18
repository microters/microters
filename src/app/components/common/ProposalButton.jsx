import Link from "next/link";
import React from "react";
const ProposalButton = ({ href, children, className = "" }) => {
  const baseClasses = `
    px-8 py-4 text-lg font-semibold rounded-full border-[3px] 
    transition-all duration-300 ease-in-out 
    cursor-pointer whitespace-nowrap
    text-[#15151e] 
    bg-transparent 
    border-[#333] 
    shadow-lg
    hover:bg-[#f35d36] 
    hover:text-white
    hover:border-[#dddddd] 
    hover:shadow-xl
  `;

  return (
    <Link href={href} target="_blank" className={`${baseClasses} ${className}`}>
      {children}
    </Link>
  );
};

export default ProposalButton;
