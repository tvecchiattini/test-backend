import { ObjectId } from "mongodb"
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

    const newUser = { _id: result.insertedId.toString(), ...data } as User

    return newUser
}

export const get = async () => {
    const {
        db,
    } = MongoService.instance()

    const result = await db
        .collection<User>('users')
        .find()
        .toArray() as User[]

    return result
}

export const find = async (id: string) => {
    const {
        db,
    } = MongoService.instance()

    const result = await db
        .collection('users')
        .findOne({ _id: new ObjectId(id) }) as User | null

    return result
}