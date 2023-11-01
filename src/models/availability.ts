import { Type, Static } from '@sinclair/typebox'

export const TAvailability = Type.Object({
    stock: Type.Number(),
})

export type Availability = Static<typeof TAvailability>