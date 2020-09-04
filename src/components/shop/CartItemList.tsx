import { List } from '@material-ui/core'
import React from 'react'
import { CartItem } from '@models/shop'
import CartItemListItem from '@components/shop/CartItemListItem'

interface Props {
  cartItems: CartItem[]
}

export default ({ cartItems }: Props) => {
  return (
    <List>
      {cartItems.map((cartItem) => {
        return <CartItemListItem key={cartItem.productId} cartItem={cartItem} />
      })}
    </List>
  )
}
