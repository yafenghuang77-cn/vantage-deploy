import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
      '*.less': {
        condition: { not: { path: '*.module.less' } },
        loaders: [{ loader: 'less-loader', options: { webpackImporter: false } }],
        as: '*.css',
      },
      '*.module.less': {
        loaders: [{ loader: 'less-loader', options: { webpackImporter: false } }],
        as: '*.module.css',
      },
    },
  },
};

export default nextConfig;
