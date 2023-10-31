"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.create = void 0;
const mongo_1 = __importDefault(require("../modules/mongo"));
const create = async (data) => {
    const { db, } = mongo_1.default.instance();
    const result = await db
        .collection('users')
        .insertOne(data);
    if (result.acknowledged === false) {
        throw new Error('Error');
    }
    return { _id: result.insertedId.toString(), ...data };
};
exports.create = create;
const get = async () => {
    const { db, } = mongo_1.default.instance();
    const result = await db
        .collection('users')
        .find()
        .toArray();
    return result;
};
exports.get = get;
//# sourceMappingURL=users.controller.js.map