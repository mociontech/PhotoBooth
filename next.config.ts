/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["storage.googleapis.com"],
    unoptimized: true,
  },
  output: 'standalone',
};

export default nextConfig;
