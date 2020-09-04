import useAxios from 'axios-hooks'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { shopActions } from '@modules/redux/shop'
import { Coupon, Product } from '@models/shop'

export const fetchProducts = () => {
  const dispatch = useDispatch()
  const { setProducts } = shopActions
  const [{ data }] = useAxios<Product[]>('/products.json')

  useEffect(() => {
    if (data?.length > 0) {
      dispatch(
        setProducts(
          [...data].sort((a, b) => {
            return Math.max(Math.min(b.score - a.score, 1), -1)
          })
        )
      )
    }
  }, [data])
}

export const fetchCoupons = () => {
  const dispatch = useDispatch()
  const { setCoupons } = shopActions
  const [{ data }] = useAxios<Coupon[]>('/coupons.json')

  useEffect(() => {
    if (data?.length > 0) {
      dispatch(setCoupons(data))
    }
  }, [data])
}
