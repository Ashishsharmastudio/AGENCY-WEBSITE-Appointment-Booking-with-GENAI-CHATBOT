// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "addons.mozilla.org",
      "fiverr-res.cloudinary.com",
    ], // 👈 add your domain here
  },
};

module.exports = nextConfig;
