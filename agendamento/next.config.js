// require('dotenv').config(); // carrega as variáveis do .env.local

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5236';

// const nextConfig = {
//   async rewrites() {
//     return [
//       {
//         source: '/api/:path*',
//         destination: `${API_URL}/api/:path*`,
//       },
//     ];
//   },
// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */

// DENTRO do container do site, o serviço da API se chama "api"
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://api:8080';

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

