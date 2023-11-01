import dotenv from 'dotenv'
dotenv.config()
dotenv.config({ path: `.env.local`, override: true })

import { join } from 'path';
import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload';
import { FastifyPluginAsync, FastifyServerOptions } from 'fastify';
import { DbInit } from './modules/mongo';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'

export interface AppOptions extends FastifyServerOptions, Partial<AutoloadPluginOptions> {

}
// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {
}

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  fastify.withTypeProvider<TypeBoxTypeProvider>()

  const swaggerOptions = {
    swagger: {
      info: {
        title: "My Title",
        description: "My Description.",
        version: "1.0.0",
      },
      host: "localhost",
      schemes: ["http", "https"],
      consumes: ["application/json"],
      produces: ["application/json"],
      tags: [
        { name: "Users", description: "Default" },
        { name: "Brands", description: "Default" },
        { name: "Products", description: "Default" },
        { name: "Root", description: "Default" }
      ],
    },
  };

  const swaggerUiOptions = {
    routePrefix: "/docs",
    exposeRoute: true,
  };

  await fastify.register(swagger, swaggerOptions)
  await fastify.register(swaggerUi, swaggerUiOptions)

  const username = process.env.MONGO_USER
  const password = process.env.MONGO_PASSWORD
  const url = 'cluster0.deos3n2.mongodb.net'
  const DbInstance = DbInit({
    dbName: 'ecommerce',
    env: 'local',
    url: `mongodb+srv://${username}:${password}@${url}/`
  })
  DbInstance.connect()


  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts
  })
};

export default app;
export { app, options }
