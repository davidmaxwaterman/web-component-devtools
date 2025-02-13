import resolve from "@rollup/plugin-node-resolve";
import html from "@open-wc/rollup-plugin-html";
import copy from "rollup-plugin-copy";

export default [
    {
        input: "html/wc-devtools-chrome.html",
        output: { dir: "dist" },
        plugins: [
            html({
                minify: false,
            }),
            copy({
                targets: [
                    { src: 'icons/*', dest: 'dist' },
                    { src: "manifest.json", dest: 'dist' }
                ]
            }),
            resolve(),
        ],
    },
    {
        input: "html/wc-devtools-chrome-init.html",
        output: { dir: "dist" },
        plugins: [resolve(), html({ minify: false })],
    },
    {
        input: "./lib/content/content_script.js",
        output: { dir: "dist" },
        plugins: [resolve()],
    },
    {
        input: "./lib/background/background.js",
        output: { dir: "dist" },
        plugins: [resolve()],
    },
];
