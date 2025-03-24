import vue from "@vitejs/plugin-vue";

export default ({ command }) => {
  if (command === "serve") {
    return {
      plugins: [vue()],
      resolve: {
        alias: [{ find: "@", replacement: "/src" }],
      },
      server: {
        host: true,
        port: 3000,
        hmr: { clientPort: 3000 },
      },
      base: "./", // Adicionado para desenvolvimento (opcional)
    };
  } else if (command === "build") {
    return {
      plugins: [vue()],
      resolve: {
        alias: [{ find: "@", replacement: "/src" }],
      },
      server: {
        host: "0.0.0.0",
        port: 5000,
        https: true,
        hmr: { host: "localhost", port: 443 },
      },
      build: {
        target: "esnext",
        chunkSizeWarningLimit: 2000,
      },
      base: "./", // Adicionado para produção
    };
  } else if (command === "testbuild") {
    return {
      plugins: [vue()],
      resolve: {
        alias: [{ find: "@", replacement: "/src" }],
      },
      server: {
        host: "0.0.0.0",
        port: 8087,
        https: true,
        hmr: { host: "localhost", port: 8087 },
      },
      build: {
        target: "esnext",
        chunkSizeWarningLimit: 2000,
      },
      base: "./", // Adicionado para teste de build
    };
  }
};
