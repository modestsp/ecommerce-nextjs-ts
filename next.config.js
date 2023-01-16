/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
    loader: 'custom',
    path: '/',
  },
};

module.exports = nextConfig;
