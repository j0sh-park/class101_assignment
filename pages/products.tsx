import React, { useEffect, useState } from 'react'
import { Container } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@modules/redux'
import { shopActions } from '@modules/redux/shop'
import ProductList from '@components/shop/ProductList'
import useAxios from 'axios-hooks'
import { Product } from '../src/models/shop'

export default () => {
  const dispatch = useDispatch()
  const { setProducts } = shopActions
  const products = useSelector<RootState, Product[]>(
    (state) => state.shop.products
  )
  const [page, setPage] = useState(1)
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

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value)
  }

  const startIndex = (page - 1) * 5
  const endIndex = startIndex + 5
  let pageCount = Math.max(Math.floor((data?.length - 1) / 5) + 1, 1)
  if (Number.isNaN(pageCount)) pageCount = 1

  return (
    <Container>
      <ProductList products={products.slice(startIndex, endIndex)} />
      <Pagination count={pageCount} page={page} onChange={handlePageChange} />
    </Container>
  )
}
