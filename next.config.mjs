/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
    config.module.rules.push({
      test: /\.(ts|mp4|mp3|mov|avi|webm|mkv|hls|ts)$/,
      type: "asset/resource", // Указывает Webpack на работу с файлами как с ресурсами
      generator: {
        filename: "static/media/[name].[hash][ext]", // Где сохранять файлы в структуре сборки
      },
    });
    return config;
  },
};

export default nextConfig;
