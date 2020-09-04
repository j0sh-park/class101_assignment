import { GridListTile, GridListTileBar, IconButton } from '@material-ui/core'
import React from 'react'
import { priceString } from '@utils/number-util'
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@modules/redux'
import { shopActions } from '@modules/redux/shop'
import { CartItem, Product } from '../../models/shop'

interface Props {
  product: Product
}

export default ({ product }: Props) => {
  const dispatch = useDispatch()
  const { addCartItem, removeCartItem } = shopActions
  const cartItems = useSelector<RootState, CartItem[]>(
    (state) => state.shop.cartItems
  )
  const isInCart =
    cartItems.filter((cartItem) => cartItem.productId === product.id).length > 0

  const handleCartButton = () => {
    if (isInCart) {
      dispatch(removeCartItem(product.id))
    } else {
      dispatch(addCartItem(product.id))
    }
  }

  return (
    <GridListTile style={{ width: '100%', height: 400 }}>
      <img src={product.coverImage} alt={product.title} />
      <GridListTileBar
        title={product.title}
        subtitle={priceString(product.price)}
        actionIcon={
          <IconButton onClick={handleCartButton}>
            {isInCart ? (
              <RemoveShoppingCartIcon style={{ fill: 'white' }} />
            ) : (
              <ShoppingCart style={{ fill: 'white' }} />
            )}
          </IconButton>
        }
      />
    </GridListTile>
  )
}
