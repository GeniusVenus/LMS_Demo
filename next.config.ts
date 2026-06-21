import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hcm44.sapsf.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
