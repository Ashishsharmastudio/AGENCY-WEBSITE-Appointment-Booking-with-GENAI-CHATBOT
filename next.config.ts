/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "addons.mozilla.org",
      "fiverr-res.cloudinary.com",
      "us.v-cdn.net", // ✅ Added this domain to fix your error
    ],
  },
  webpack: (config) => {
    config.cache = false;
    return config;
  },
};

module.exports = nextConfig;
