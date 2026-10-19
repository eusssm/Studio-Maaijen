/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  async redirects() {
    return [
      { source: '/cv', destination: '/portfolio', permanent: true },
    ]
  },
  /* config options here */
};

export default nextConfig;
