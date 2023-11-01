import { Static, Type } from "@sinclair/typebox"
import { FastifyPluginAsync } from "fastify"
import * as ProductsController from '../../controllers/products.controller'
import { TProduct } from "../../models/product"

const TParams = Type.Object({
  upc: Type.String(),
})

const TQuery = Type.Object({
  code: Type.String(),
})

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get<{
    Querystring: Static<typeof TQuery>
  }>('/', {
    schema: {
      tags: ["Products"],
      querystring: TQuery,
      response: {
        200: Type.Array(TProduct)
      }
    }
  }, async function (request, reply) {
    const products = await ProductsController.get({ code: request.query.code })
    return products
  })

  fastify.get<{
    Params: Static<typeof TParams>
  }>('/:upc', {
    schema: {
      tags: ["Products"],
      params: TParams,
      response: {
        200: TProduct,
        404: { $ref: 'HttpError' }
      }
    }
  }, async function (request, reply) {
    const product = await ProductsController.find(request.params.upc)
    if (!product) {
      return reply.notFound()
    }
    return product
  })
}

export default example;
