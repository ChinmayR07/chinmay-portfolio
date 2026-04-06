/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'github.com' },
    ],
  },
  // Required for GitHub Pages static export (uncomment when deploying to GH Pages)
  // output: 'export',
  // basePath: '/chinmay-portfolio',
};

module.exports = nextConfig;
