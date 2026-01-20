/** @type {import('next').NextConfig} */
const nextConfig = {
  // Exclude figma directory from build (it's read-only reference code)
  // TypeScript exclusion is handled in tsconfig.json
  // Next.js automatically ignores files outside app/, pages/, components/, etc.
  // But we add webpack config to ensure figma is excluded from compilation
  webpack: (config) => {
    // Ensure figma directory is excluded from webpack compilation
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/figma/**', '**/node_modules/**'],
    }
    return config
  },
}

module.exports = nextConfig

