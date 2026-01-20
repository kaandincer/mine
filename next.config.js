/** @type {import('next').NextConfig} */
const nextConfig = {
  // Exclude figma directory from build (it's read-only reference code)
  typescript: {
    // Ignore type errors in figma directory during build
    ignoreBuildErrors: false,
  },
  // Exclude figma from webpack processing
  webpack: (config, { isServer }) => {
    // Exclude figma directory from compilation
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      exclude: /figma/,
    })
    return config
  },
}

module.exports = nextConfig

