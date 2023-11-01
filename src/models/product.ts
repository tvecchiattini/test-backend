import { Type, Static } from '@sinclair/typebox'
import { TBrand } from './brand'
import { TPrice } from './price'
import { TAvailability } from './availability'

export const TProductBase = Type.Object({
    UPC: Type.String(),
    brand: TBrand,
    name: Type.String(),
    price: TPrice,
    availability: TAvailability,
})

export const TProduct = Type.Composite([
    Type.Object({
        _id: Type.Optional(Type.String()),
        variants: Type.Array(TProductBase),
    }), TProductBase])

export type ProductBase = Static<typeof TProductBase>
export type Product = Static<typeof TProduct>