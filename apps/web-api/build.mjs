import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["./src/index.api.ts", "./src/index.sqs.ts"],
  bundle: true,
  outdir: "build",
  platform: "node",
  entryNames: "[dir]/[name]/index",
  target: "node20",
  minifySyntax: true,
  minifyWhitespace: true,
  logLevel: "info",
});
