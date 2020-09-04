import React, { useEffect, useState } from 'react'
import { Container } from '@material-ui/core'
import { gql, useQuery } from '@apollo/client'
import Pagination from '@material-ui/lab/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@modules/redux'
import { shopActions } from '@modules/redux/shop'
import ProductList from '@components/shop/ProductList'
import { Product } from '../src/models/shop'

export const PRODUCTS_QUERY = gql`
  query {
    products {
      id
      title
      coverImage
      price
      score
    }
  }
`

export default () => {
  const dispatch = useDispatch()
  const { setProducts } = shopActions
  const products = useSelector<RootState, Product[]>(
    (state) => state.shop.products
  )
  const [page, setPage] = useState(1)
  const { data } = useQuery<{ products: Product[] }>(PRODUCTS_QUERY)

  useEffect(() => {
    if (data?.products?.length > 0) {
      dispatch(
        setProducts(
          [...data.products].sort((a, b) => {
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

  return (
    <Container>
      <ProductList products={products.slice(startIndex, endIndex)} />
      <Pagination
        count={Math.floor((data?.products?.length - 1) / 5) + 1}
        page={page}
        onChange={handlePageChange}
      />
    </Container>
  )
}
