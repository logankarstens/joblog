/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/jobs/list',
        destination: '/jobs',
        permanent: true
      },
    ]
  },
};

export default nextConfig;
