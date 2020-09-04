import React from 'react'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { RootState } from '@modules/redux'
import { CartItem } from '@models/shop'

export default () => {
  const cartItems = useSelector<RootState, CartItem[]>(
    (state) => state.shop.cartItems
  )
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link href="/products">
        <a href="/products">Products</a>
      </Link>
      <Link href="/cart">
        <a href="/cart">{`Cart(${cartItems.length})`}</a>
      </Link>
    </Breadcrumbs>
  )
}
