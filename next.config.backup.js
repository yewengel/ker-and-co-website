/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // For Node.js deployment on cPanel
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/asset/:path*',
        destination: '/asset/:path*',
      },
    ]
  },
}

module.exports = nextConfig
