import * as esbuild from 'esbuild';
import dotenv from 'dotenv';
dotenv.config();

const define = {
  'process.env.PORT': JSON.stringify(process.env['PORT']),

  'process.env.WEB_APP_URL': JSON.stringify(process.env['WEB_APP_URL']),

  'process.env.DATABASE_URL': JSON.stringify(process.env['DATABASE_URL']),
  
  'process.env.QUEUE_URL': JSON.stringify(process.env['QUEUE_URL']),

  'process.env.KEYCLOAK_CLIENT_ID': JSON.stringify(process.env['KEYCLOAK_CLIENT_ID']),
  'process.env.KEYCLOAK_CLIENT_SECRET': JSON.stringify(process.env['KEYCLOAK_CLIENT_SECRET']),
  'process.env.KEYCLOAK_CLIENT_SECRET': JSON.stringify(process.env['KEYCLOAK_CLIENT_SECRET']),
  'process.env.KEYCLOAK_URL': JSON.stringify(process.env['KEYCLOAK_URL']),
  'process.env.KEYCLOAK_WEBHOOK_SECRET': JSON.stringify(process.env['KEYCLOAK_WEBHOOK_SECRET']),
  'process.env.KEYCLOAK_RSA_PUBLIC_KEY': JSON.stringify(process.env['KEYCLOAK_RSA_PUBLIC_KEY']),

  'process.env.OPEN_AI_KEY': JSON.stringify(process.env['OPEN_AI_KEY']),

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
