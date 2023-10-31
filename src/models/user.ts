import { Type, Static } from '@sinclair/typebox'

export const TUser = Type.Object({
    _id: Type.Optional(Type.String()),
    firstname: Type.String(),
    lastname: Type.String(),
    email: Type.String(),
    country: Type.String(),
    state: Type.String(),
})

export type User = Static<typeof TUser>