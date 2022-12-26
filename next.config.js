/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'via.placeholder.com',
      'media.graphcms.com',
      "media.graphassets.com/uwOPvJhrQIGk8kbTx5gq"
    ]
  },
  "presets": ["next/babel"],
  env: {
  }
}

module.exports = nextConfig
