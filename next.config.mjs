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
      {
        source: '/jobs/edit',
        destination: '/jobs/new',
        permanent: true
      }
    ] 
  }
};

export default nextConfig;
