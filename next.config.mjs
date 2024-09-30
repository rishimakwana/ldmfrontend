/** @type {import('next').NextConfig} */



const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ['page.tsx', 'api.ts', 'mw.ts'],
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'emsobject.oss-me-east-1.aliyuncs.com' }
    ]
  },
  transpilePackages: ['@mui/x-charts'],
  async redirects() {
    return [{ source: '/home', destination: '/', permanent: false }]
  },
}

export default nextConfig
