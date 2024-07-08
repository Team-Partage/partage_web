/** @type {import('next').NextConfig} */
const nextConfig = {
  runtime: 'edge',
  unstable_allowDynamic: ['lodash/merge.js'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
    ],
  },
};

export default nextConfig;
