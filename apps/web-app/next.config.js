/** @type {import('next').NextConfig} */

const nextConfig = {
  // experimental: {
  transpilePackages: ["@edu-platform"],
  // },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/*/*",
      },
    ],
  },
};

module.exports = nextConfig;
