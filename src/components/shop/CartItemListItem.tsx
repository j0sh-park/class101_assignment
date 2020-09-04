import React, { useEffect, useState } from 'react'
import {
  ListItem,
  IconButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  Paper,
} from '@material-ui/core'
import { priceString } from '@utils/number-util'
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@modules/redux'
import { shopActions } from '@modules/redux/shop'
import { CartItem, Product } from '@models/shop'
import Add from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove'

interface Props {
  cartItem: CartItem
}

export default ({ cartItem }: Props) => {
  const dispatch = useDispatch()
  const {
    removeCartItem,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
    selectCartItem,
    deselectCartItem,
  } = shopActions
  const products = useSelector<RootState, Product[]>(
    (state) => state.shop.products
  )
  const [product, setProduct] = useState<null | Product>(null)
  useEffect(() => {
    setProduct(products.find((p) => p.id === cartItem.productId))
  }, [products])
  if (product == null) {
    return <div />
  }

  const handleCartButton = () => {
    dispatch(removeCartItem(product.id))
  }

  const handleSelectCheckbox = () => {
    if (cartItem.isSelected) {
      dispatch(deselectCartItem(product.id))
    } else {
      dispatch(selectCartItem(product.id))
    }
  }

  const handleIncrease = () => {
    dispatch(increaseCartItemQuantity(product.id))
  }

  const handleDecrease = () => {
    dispatch(decreaseCartItemQuantity(product.id))
  }

  return (
    <Paper style={{ marginBottom: 8 }}>
      <ListItem>
        <Checkbox
          checked={cartItem.isSelected}
          onChange={handleSelectCheckbox}
        />
        <ListItemAvatar>
          <Avatar src={product.coverImage} alt={product.title} />
        </ListItemAvatar>
        <ListItemText
          primary={product.title}
          secondary={priceString(product.price)}
        />
        <IconButton onClick={handleDecrease}>
          <Remove style={{ fill: 'black' }} />
        </IconButton>
        <p>{cartItem.quantity}</p>
        <IconButton onClick={handleIncrease} style={{ marginRight: 8 }}>
          <Add style={{ fill: 'black' }} />
        </IconButton>
        <ListItemSecondaryAction>
          <IconButton onClick={handleCartButton}>
            <RemoveShoppingCartIcon style={{ fill: 'black' }} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </Paper>
  )
}
