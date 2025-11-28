/** @type {import(\"next\").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  generateBuildId: () => `slate360-${Date.now()}`,
  images: {
    domains: ['images.unsplash.com', 'raw.githubusercontent.com', 'pannellum.org', 'commondatastorage.googleapis.com'],
  },
  headers: () => [
    { source: '/:path*', headers: [{ key: 'Cache-Control', value: 'no-store' }] }
  ],
};
export default nextConfig;
