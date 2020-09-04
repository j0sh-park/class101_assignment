export interface Product {
  id: string
  title: string
  coverImage: string
  price: number
  score: number
  availableCoupon?: boolean
}

export enum CouponType {
  RATE = 'rate',
  AMOUNT = 'amount',
}

export interface Coupon {
  type: CouponType
  title: string
  discountRate?: number
  discountAmount?: number
}

export interface CartItem {
  productId: string
  quantity: number
  isSelected: boolean
}
