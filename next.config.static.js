/** @type {import('next').NextConfig} */
// ALTERNATIVE CONFIG FOR STATIC EXPORT
// Use this if you want to deploy as static HTML files
// To use: Rename this file to 'next.config.js' (backup the original first)

const nextConfig = {
  output: 'export', // Static export mode
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // Better compatibility with Apache
  // Note: rewrites() doesn't work with static export
}

module.exports = nextConfig

