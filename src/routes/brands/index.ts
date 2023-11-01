import { Type } from "@sinclair/typebox"
import { FastifyPluginAsync } from "fastify"
import * as BrandsController from '../../controllers/brands.controller'
import { TBrand } from "../../models/brand"

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', {
    schema: {
      tags: ["Brands"],
      response: {
        200: Type.Array(TBrand)
      }
    }
  }, async function (request, reply) {
    const brands = await BrandsController.get()
    return brands
  })
}

export default example;
