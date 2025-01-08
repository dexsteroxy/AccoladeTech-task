// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;


// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["upload.wikimedia.org", "flagcdn.com"], // Add other domains if necessary
  },
  eslint: {
    // Warning: Disabling ESLint may lead to bad practices in your code
    ignoreDuringBuilds: true, // Bypass ESLint during builds
  },
};

export default nextConfig;

