const prod = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['aidstat.kg'], // Разрешаем домен 'aidstat.kg'
  },
  // output: "export",
  // assetPrefix: prod ? "/concept/front/" : undefined,
};

export default nextConfig;
