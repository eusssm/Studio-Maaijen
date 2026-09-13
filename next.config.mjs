/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/cv', destination: '/portfolio', permanent: true },
      
      
    ]
  },
  /* config options here */
};

export default nextConfig;
