import { FastifyPluginAsync } from "fastify"
import * as UsersController from '../../controllers/users.controller'
import { TUser, User } from "../../models/user"
import { Static, Type } from "@sinclair/typebox"

const TParams = Type.Object({
  id: Type.String(),
})

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

  fastify.get<{
    Params: Static<typeof TParams>
  }>('/:id', {
    schema: {
      tags: ["Users"],
      params: TParams,
      response: {
        200: TUser,
        404: { $ref: 'HttpError' }
      }
    }
  }, async function (request, reply) {
    const user = await UsersController.find(request.params.id)
    if (!user) {
      return reply.notFound()
    }
    return user
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
