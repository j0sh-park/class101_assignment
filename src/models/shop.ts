export interface Product {
  id: string
  title: string
  coverImage: string
  price: number
  score: number
  availableCoupon?: boolean
}

export enum CouponTYpe {
  RATE = 'rate',
  AMOUNT = 'amount',
}

export interface Coupon {
  type: CouponTYpe
  title: string
  discountRate?: number
  discountAmount?: number
}

export interface CartItem {
  productId: string
  quantity: number
}
