import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // pages that moved when the docs were split into sections
  async redirects() {
    return [
      { source: '/docs/building', destination: '/docs/development/building', permanent: true },
      { source: '/docs/sdk-dependencies', destination: '/docs/development/sdk-dependencies', permanent: true },
      { source: '/docs/crash-handler', destination: '/docs/guides/crash-handler', permanent: true },
      { source: '/docs/hooking', destination: '/docs/hooks', permanent: true },
      // enums declared in the SDK headers are documented on their header's page now
      { source: '/docs/enums/:name', destination: '/docs/core-api', permanent: true },
    ];
  },
};

export default withMDX(config);
