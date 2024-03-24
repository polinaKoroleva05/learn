import { defineConfig } from "vite";
import { resolve } from 'path'


export default defineConfig({
    build: {
        target: "esnext",
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                game: resolve(__dirname, 'main.html'),
            },
            output: {
                assetFileNames: 'assets/[name].[ext]' // Определяет папку, в которую будут скопированы файлы
            }
        },
    },
    //experimental: {
    //    renderBuiltUrl(filename) {
    //        return "./" + filename;
    //    },
    //},
});
