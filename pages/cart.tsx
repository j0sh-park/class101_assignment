import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  Paper,
} from '@material-ui/core'
import { useSelector } from 'react-redux'
import { RootState } from '@modules/redux'
import { fetchCoupons, fetchProducts } from '@modules/axios/store-service'
import { CartItem, Coupon, CouponType, Product } from '@models/shop'
import CartItemList from '@components/shop/CartItemList'
import { useTranslation } from 'react-i18next'
import { priceString } from '@utils/number-util'

export default () => {
  const { t } = useTranslation()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [coupon, setCoupon] = useState<null | Coupon>(null)
  const [totalAmount, setTotalAmount] = useState(0)
  const [totalDiscount, setTotalDiscount] = useState(0)
  const products = useSelector<RootState, Product[]>(
    (state) => state.shop.products
  )
  const cartItems = useSelector<RootState, CartItem[]>(
    (state) => state.shop.cartItems
  )
  const coupons = useSelector<RootState, Coupon[]>(
    (state) => state.shop.coupons
  )

  useEffect(() => {
    const total = cartItems.reduce(
      (previousTotal, cartItem) => {
        if (!cartItem.isSelected) {
          return previousTotal
        }
        const product = products.find((p) => p.id === cartItem.productId)
        if (product == null) {
          return previousTotal
        }

        previousTotal.amount += product.price * cartItem.quantity
        if (coupon != null && product.availableCoupon !== false) {
          if (coupon.type === CouponType.AMOUNT) {
            previousTotal.discount = coupon.discountAmount
          } else if (coupon.type === CouponType.RATE) {
            previousTotal.discount +=
              (product.price * cartItem.quantity * coupon.discountRate) / 100
          }
        }
        return previousTotal
      },
      { amount: 0, discount: 0 }
    )
    setTotalAmount(Math.floor(total.amount))
    setTotalDiscount(Math.floor(total.discount))
  }, [cartItems, products, coupon])

  fetchProducts()
  fetchCoupons()

  const handleOpenCouponMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const handleCouponSelected = (c: Coupon) => {
    setAnchorEl(null)
    setCoupon(c)
  }

  return (
    <Container>
      <CartItemList cartItems={cartItems} />
      <Paper>
        <Box display="flex">
          <Box display="flex">
            <Button onClick={handleOpenCouponMenu}>
              {t('text_select_coupon')}
            </Button>
            <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)}>
              {coupons.map((c) => {
                return (
                  <MenuItem
                    key={c.title}
                    onClick={() => handleCouponSelected(c)}
                  >
                    {c.title}
                  </MenuItem>
                )
              })}
              <MenuItem onClick={() => handleCouponSelected(null)}>
                {t('text_cancel')}
              </MenuItem>
            </Menu>
            <p>{`: ${coupon?.title || t('text_none')}`}</p>
          </Box>
          <Box flexGrow={1} />
          <Box display="flex" style={{ marginRight: 8 }}>
            <p>
              {`결제 금액 : ${priceString(
                totalAmount - totalDiscount
              )} (${priceString(totalAmount)} - ${priceString(totalDiscount)})`}
            </p>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}
