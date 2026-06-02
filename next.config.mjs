import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const oldSlugs = require('./redirects.json');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.microters.com',
        pathname: '/uploads/**',
      },
    ],
  },
  async redirects() {
    return oldSlugs.flatMap((slug) => [
      { source: `/${slug}`,  destination: `/blog/${slug}`, permanent: true },
      { source: `/${slug}/`, destination: `/blog/${slug}`, permanent: true },
    ]);
  },
};

export default nextConfig;