import React, { useState } from 'react'
import { Container, Paper } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import { useSelector } from 'react-redux'
import { RootState } from '@modules/redux'
import ProductList from '@components/shop/ProductList'
import { fetchProducts } from '@modules/axios/store-service'
import { Product } from '@models/shop'

export default () => {
  const products = useSelector<RootState, Product[]>(
    (state) => state.shop.products
  )
  const [page, setPage] = useState(1)
  fetchProducts()

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value)
  }

  const startIndex = (page - 1) * 5
  const endIndex = startIndex + 5
  let pageCount = Math.max(Math.floor((products.length - 1) / 5) + 1, 1)
  if (Number.isNaN(pageCount)) pageCount = 1

  return (
    <Container>
      <Paper>
        <ProductList products={products.slice(startIndex, endIndex)} />
        <Pagination count={pageCount} page={page} onChange={handlePageChange} />
      </Paper>
    </Container>
  )
}
