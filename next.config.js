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
    NEXT_PUBLIC_GRAPHCMS_URL: 'https://api-sa-east-1.graphcms.com/v2/ckysnx6ty05mp01z608ub6w03/master',
    STRIPE_SECRET_KEY: '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',
  }
}

module.exports = nextConfig
