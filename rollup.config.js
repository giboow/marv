import livereload from "rollup-plugin-livereload";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import cleaner from "rollup-plugin-cleaner";
import svelte from "rollup-plugin-svelte";

const watch = process.env.ROLLUP_WATCH;

const inputDir = "client-src";
const publicDir = "app/client";
const outputDir = `${publicDir}/js`;

export default {
  input: `${inputDir}/index.js`,
  output: {
    format: "es",
    dir: outputDir,
    sourcemap: true
  },
  plugins: [
    resolve({ browser: true, dedupe: ["svelte"] }),
    commonjs(),
    svelte({ dev: watch }),
    watch && livereload(publicDir),
    !watch && cleaner({ targets: [outputDir] }),
    !watch && terser()
  ]
};