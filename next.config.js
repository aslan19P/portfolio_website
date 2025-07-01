/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    domains: ['localhost', 'aslan19p.uz',],
  },
  // experimental: {
  //   serverActions: true,
  // },
};

module.exports = nextConfig;
