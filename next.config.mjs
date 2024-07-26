/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://58.233.84.92:9090/api/v1/:path*',
      },
      {
        source: '/ws/:path*',
        destination: 'http://58.233.84.92:9090/:path*',
      },
    ];
  },
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
