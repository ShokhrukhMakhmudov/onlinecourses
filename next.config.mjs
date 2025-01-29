/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.ts$/,
      include: /public\/videos\/hls/,
      type: "asset/resource", // Обрабатывает файлы как статические ресурсы
    });
    return config;
  },
};

export default nextConfig;
