/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!config.experiments) {
      config.experiments = {}
    }
    config.experiments.topLevelAwait = true
    // Add the graphql-tag/loader to the list of transpiled modules
    config.resolve.alias['graphql-tag'] = require.resolve('graphql-tag/loader')
    // Add a rule to use the graphql-tag/loader for GraphQL files
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      use: [
        {
          loader: 'graphql-tag/loader',
        },
      ],
    })

    return config
  },
}

module.exports = nextConfig
