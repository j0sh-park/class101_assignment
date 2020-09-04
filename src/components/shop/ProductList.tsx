import { GridList } from '@material-ui/core'
import React from 'react'
import ProductItem from '@components/shop/ProductItem'
import { Product } from '@models/shop'

interface Props {
  products: Product[]
}

export default ({ products }: Props) => {
  return (
    <GridList>
      {products.map((product) => {
        return <ProductItem key={product.id} product={product} />
      })}
    </GridList>
  )
}
