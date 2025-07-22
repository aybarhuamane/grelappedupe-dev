/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APP_NAME: process.env.APP_NAME,
    API_URL: process.env.API_URL,
    API_URL_PROD: process.env.API_URL_PROD,
    API_URL_DEV: process.env.API_URL_DEV,
    API_URL_DOWN: process.env.API_URL_DOWN,
  },
}

export default nextConfig
