import dotenv from 'dotenv';
dotenv.config(); // call this before importing main, because that will use env variables
import 'express-async-errors';

import * as awilix from 'awilix';

import { registerServer } from '@edu-platform/common/platform';

import { registerDependencies as registereApiDependencies } from './main/api.register-dependencies';

import { pgClient as modulePgClient } from './adapters/infrastructure/persistence/schema/db-client';

export const moduleContainer = awilix.createContainer();

registereApiDependencies(moduleContainer);

const server = registerServer([
  {
    container: moduleContainer,
    pgClient: modulePgClient,
    basePath: 'src/',
  },
]);

(async () => {
  try {
    await server.start();
  } catch (e) {
    console.error('Server instanciation failed', e);
  }
})();

export const handler = server.getApiGatewayHandler();
