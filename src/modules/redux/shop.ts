import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItem, Coupon, Product } from '../../models/shop'

export interface ShopStore {
  products: Product[]
  coupons: Coupon[]
  cartItems: CartItem[]
}

const initialState: ShopStore = {
  products: [],
  coupons: [],
  cartItems: [],
}

const shopSlick = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload
    },
    setCoupons: (state, action: PayloadAction<Coupon[]>) => {
      state.coupons = action.payload
    },
    addCartItem: (state, action: PayloadAction<string>) => {
      if (state.cartItems.length < 3) {
        state.cartItems.push({
          productId: action.payload,
          quantity: 1,
        })
      }
    },
    removeCartItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.productId !== action.payload
      )
    },
    increaseCartItemQuantity: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.map((cartItem) => {
        if (cartItem.productId === action.payload) {
          cartItem.quantity = Math.min(
            Number.MAX_SAFE_INTEGER - 1,
            cartItem.quantity + 1
          )
        }
        return cartItem
      })
    },
    decreaseCartItemQuantity: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.map((cartItem) => {
        if (cartItem.productId === action.payload) {
          cartItem.quantity = Math.max(1, cartItem.quantity - 1)
        }
        return cartItem
      })
    },
  },
})

export default shopSlick.reducer
export const shopActions = shopSlick.actions
