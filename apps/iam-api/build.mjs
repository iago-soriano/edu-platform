import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["./src/main/index.ts"],
  bundle: true,
  outdir: "build",
  platform: "node",
  entryNames: "[dir]/index",
  target: "node20",
  minifySyntax: true,
  minifyWhitespace: true,
  logLevel: "info",
});
