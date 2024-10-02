import * as esbuild from 'esbuild';
import dotenv from 'dotenv';
dotenv.config();

const define = {
  'process.env.PORT': JSON.stringify(process.env['PORT']),
  'process.env.EMAIL_HOST': JSON.stringify(process.env['EMAIL_HOST']),
  'process.env.EMAIL_SECRET': JSON.stringify(process.env['EMAIL_SECRET']),
  'process.env.EMAIL_USER': JSON.stringify(process.env['EMAIL_USER']),
  'process.env.WEB_APP_URL': JSON.stringify(process.env['WEB_APP_URL']),
  'process.env.HOST_NAME': JSON.stringify(process.env['HOST_NAME']),
  'process.env.GOOGLE_CLIENT_ID': JSON.stringify(
    process.env['GOOGLE_CLIENT_ID'],
  ),
  'process.env.ACCESS_TOKEN_PRIVATE_KEY': JSON.stringify(
    process.env['ACCESS_TOKEN_PRIVATE_KEY'],
  ),
  'process.env.REFRESH_TOKEN_PRIVATE_KEY': JSON.stringify(
    process.env['REFRESH_TOKEN_PRIVATE_KEY'],
  ),
  'process.env.REFRESH_TOKEN_PUBLIC_KEY': JSON.stringify(
    process.env['REFRESH_TOKEN_PUBLIC_KEY'],
  ),
  'process.env.ACCESS_TOKEN_PUBLIC_KEY': JSON.stringify(
    process.env['ACCESS_TOKEN_PUBLIC_KEY'],
  ),
};

await esbuild.build({
  entryPoints: ['./src/index.api.ts', './src/index.sqs.ts'],
  bundle: true,
  outdir: 'build',
  platform: 'node',
  entryNames: '[dir]/[name]/index',
  target: 'node20',
  minifySyntax: true,
  minifyWhitespace: true,
  logLevel: 'info',
  define,
});
