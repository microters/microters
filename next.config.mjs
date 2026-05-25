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
};

export default nextConfig;