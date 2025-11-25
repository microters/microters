import React from 'react';
import Link from 'next/link';

const MegaMenuItem = ({ name, href, Icon, iconBgClass, onClick }) => {
  return (
    <Link 
      href={href} 
      className="flex items-center text-sm font-medium text-gray-700 transition-colors duration-200 py-1 group hover:text-(--color-primary)"
      onClick={onClick}
    >
      <div 
        className={`flex items-center justify-center w-8 h-8 rounded-lg text-white mr-3 shrink-0 ${iconBgClass}`}
      >
        <Icon className="w-4 h-4" />
      </div>
      <span>{name}</span>
    </Link>
  );
};

export default MegaMenuItem;