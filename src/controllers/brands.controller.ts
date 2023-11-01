import MongoService from '../modules/mongo'

export const get = async () => {
    const {
        db,
    } = MongoService.instance()

    const result = await db
        .collection('brands')
        .find()
        .toArray()

    return result
}