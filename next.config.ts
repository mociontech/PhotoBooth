/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["storage.googleapis.com"],
    unoptimized: true,
  },
  output: 'standalone',
  experimental: {
    appDir: true
  },
};

export default nextConfig;
