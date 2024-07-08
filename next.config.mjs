/** @type {import('next').NextConfig} */
const nextConfig = {
  unstable_allowDynamic: ['*lodash.js'],
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
