/** @type {import('next').NextConfig} */

const nextConfig = {
  // outputFileTracing: false,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  transpilePackages: ["@edu-platform"],
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/*/*",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
