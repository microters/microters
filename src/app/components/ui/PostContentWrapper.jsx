'use client';

import { useEffect, useRef } from 'react';

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '');

export function PostContentWrapper({ contentHtml }) {
  const contentRef = useRef(null);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const headings = container.querySelectorAll("h1, h2, h3");
    headings.forEach(heading => {
      const text = heading.textContent || '';
      const id = slugify(text);
      heading.id = id;
      heading.classList.add('scroll-mt-24');
    });

    const tables = container.querySelectorAll('table');
    tables.forEach(table => {
      if (table.parentNode.classList.contains('table-wrapper')) return;

      const wrapper = document.createElement('div');
      wrapper.className = 'table-wrapper overflow-x-auto my-8 rounded-lg border border-gray-100 shadow-sm';
      
      table.classList.add('w-full', 'text-left', 'border-collapse');
      
      // Style table cells
      const cells = table.querySelectorAll('th, td');
      cells.forEach(cell => cell.classList.add('p-4', 'border-b', 'border-gray-100', 'text-sm'));
      
      // Style headers
      const headers = table.querySelectorAll('th');
      headers.forEach(th => th.classList.add('bg-[#f9fafb]', 'text-[#212c4a]', 'font-bold', 'uppercase', 'text-xs', 'tracking-wider'));

      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });

    // 3. Style External Links (Optional but nice for SaaS)
    const links = container.querySelectorAll('a');
    links.forEach(link => {
       if (link.getAttribute('href')?.startsWith('http')) {
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener noreferrer');
       }
    });

  }, [contentHtml]);

  if (!contentHtml) return null;

  return (
    <div 
      ref={contentRef}
      id='tinyMCE' 
      className="prose lg:prose-xl max-w-none space-y-4"
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  );
}