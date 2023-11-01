import { Type, Static } from '@sinclair/typebox'

export const TUser = Type.Object({
    _id: Type.Optional(Type.String()),
    firstname: Type.String(),
    lastname: Type.String(),
    email: Type.String({
        format: 'email'
    }),
    country: Type.String({
        maxLength: 2
    }),
    state: Type.String({
        maxLength: 2
    }),
    age: Type.Optional(Type.Number()),
}, { additionalProperties: false })

export type User = Static<typeof TUser>