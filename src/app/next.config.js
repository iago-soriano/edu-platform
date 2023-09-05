// const withImages = require("next-images");

// module.exports = withImages({
//   esModule: true,
// });

// const withTM = require("next-transpile-modules")([
//   // "@language-app/common-core",
//   // "@language-app/common-utils",
// ]);

// module.exports = withImages(
//   withTM({
//     pageExtensions: ["jsx", "ts", "tsx"],
//     compiler: {
//       styledComponents: true,
//     },
//   })
// );

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig