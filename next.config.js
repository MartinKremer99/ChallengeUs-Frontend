/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "",
  },
  reactStrictMode: true,
  images: {
    domains: ["cdn-icons-png.flaticon.com"],
  },
};

module.exports = nextConfig;
