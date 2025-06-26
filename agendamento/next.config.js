require('dotenv').config(); // carrega as variáveis do .env.local

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5236';

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${API_URL}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
