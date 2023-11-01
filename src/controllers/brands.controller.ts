import { Brand } from '../models/brand'
import MongoService from '../modules/mongo'

export const get = async () => {
    const {
        db,
    } = MongoService.instance()

    const result = await db
        .collection<Brand>('brands')
        .find()
        .toArray() as Brand[]

    return result
}