import { FastifyPluginAsync } from "fastify"
import * as UsersController from '../../controllers/users.controller'
import { TUser, User } from "../../models/user"
import { Type } from "@sinclair/typebox"

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', {
    schema: {
      tags: ["Users"],
      response: {
        200: Type.Array(TUser)
      }
    }
  }, async function (request, reply) {
    const users = await UsersController.get()
    return users
  })

  fastify.post<{
    Body: User
  }>('/', {
    schema: {
      tags: ["Users"],
      body: TUser,
      response: {
        201: TUser
      }
    }
  }, async function (request, reply) {
    const newUser = await UsersController.create(request.body)
    reply.statusCode = 201
    return newUser
  },)
}

export default example;
