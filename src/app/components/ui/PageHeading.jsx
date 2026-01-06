// src/app/components/ui/PageHeading.jsx
import Link from 'next/link';

export default function PageHeading({ title, breadcrumbs, actions }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-6 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-[#212c4a]">{title}</h1>
        
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center text-sm text-gray-500 mt-1">
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;

              return (
                <div key={index} className="flex items-center">
                  {index > 0 && (
                    <span className="mx-2 text-gray-400">/</span>
                  )}

                  {/* Breadcrumb Item */}
                  {isLast ? (
                    <span className="text-[#f35d36] font-medium">
                      {crumb.label}
                    </span>
                  ) : (
                    crumb.href ? (
                      <Link 
                        href={crumb.href} 
                        className="hover:text-[#212c4a] transition-colors"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span>{crumb.label}</span>
                    )
                  )}
                </div>
              );
            })}
          </nav>
        )}
      </div>

      {actions && (
        <div className="flex gap-3">
          {actions}
        </div>
      )}
    </div>
  );
}