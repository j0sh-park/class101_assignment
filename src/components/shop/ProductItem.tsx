import { GridListTile, GridListTileBar, IconButton } from '@material-ui/core'
import React from 'react'
import { priceString } from '@utils/number-util'
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import { Product } from '../../models/shop'

interface Props {
  product: Product
}
export default ({ product }: Props) => {
  return (
    <GridListTile style={{ width: 400, height: 400 }}>
      <img src={product.coverImage} alt={product.title} />
      <GridListTileBar
        title={product.title}
        subtitle={priceString(product.price)}
        actionIcon={
          <IconButton>
            <ShoppingCart />
          </IconButton>
        }
      />
    </GridListTile>
  )
}
