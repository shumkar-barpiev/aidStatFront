
const prod = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
    assetPrefix: prod ? "/concept/front/" : undefined,
};

export default nextConfig;
