/** @type {import(\"next\").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  generateBuildId: () => `slate360-${Date.now()}`,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'pannellum.org',
      },
      {
        protocol: 'https',
        hostname: 'commondatastorage.googleapis.com',
      },
    ],
  },
  headers: () => [
    { source: '/:path*', headers: [{ key: 'Cache-Control', value: 'no-store' }] }
  ],
};
export default nextConfig;
