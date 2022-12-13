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
  env: {
    NEXT_PUBLIC_GRAPHCMS_URL: 'https://api-sa-east-1.graphcms.com/v2/ckysnx6ty05mp01z608ub6w03/master'
  }
}

module.exports = nextConfig
