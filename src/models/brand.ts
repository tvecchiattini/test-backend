import { Type, Static } from '@sinclair/typebox'

export const TBrand = Type.Object({
    _id: Type.Optional(Type.String()),
    name: Type.String(),
    code: Type.String(),
})

export type Brand = Static<typeof TBrand>