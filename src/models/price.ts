import { Type, Static } from '@sinclair/typebox'

export const TPrice = Type.Object({
    current: Type.Object({
        value: Type.Number(),
    }),
    currency: Type.String(),
})

export type Price = Static<typeof TPrice>