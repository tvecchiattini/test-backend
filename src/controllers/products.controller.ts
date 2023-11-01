import { Product } from '../models/product'
import MongoService from '../modules/mongo'

export const find = async (upc: string) => {
    const {
        db,
    } = MongoService.instance()

    const result = await db
        .collection<Product>('products')
        .findOne({ UPC: upc }) as Product | null

    return result
}

export const get = async ({ code }: { code: string }) => {
    const {
        db,
    } = MongoService.instance()

    const result = await db
        .collection<Product>('products')
        .find({ 'brand.brand': code })
        .toArray() as Product[]

    return result
}