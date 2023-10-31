import { User } from "../models/user"
import MongoService from '../modules/mongo'

export const create = async (data: Omit<User, '_id'>): Promise<User> => {
    const {
        db,
    } = MongoService.instance()

    const result = await db
        .collection('users')
        .insertOne(data)

    if (result.acknowledged === false) {
        throw new Error('Error')
    }

    return { _id: result.insertedId.toString(), ...data }
}

export const get = async () => {
    const {
        db,
    } = MongoService.instance()

    const result = await db
        .collection('users')
        .find()
        .toArray()

    return result
}