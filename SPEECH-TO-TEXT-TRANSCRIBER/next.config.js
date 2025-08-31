/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for better audio handling
  experimental: {
    serverComponentsExternalPackages: [],
  },
  
  // API routes configuration
  api: {
    bodyParser: {
      sizeLimit: '50mb', // Increase limit for audio files
    },
    responseLimit: false,
  },
  
  // Headers for CORS and security
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ]
  },

  // Webpack configuration for audio processing
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        os: false,
        path: false,
      };
    }
    return config;
  },
}

module.exports = nextConfig