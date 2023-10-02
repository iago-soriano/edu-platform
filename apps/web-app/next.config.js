/** @type {import('next').NextConfig} */

const nextConfig = {
  // experimental: {
  transpilePackages: ["@edu-platform"],
  // },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
