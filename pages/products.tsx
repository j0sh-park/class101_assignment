import React, { useEffect, useState } from 'react'
import { Container, GridList } from '@material-ui/core'
import { gql, useQuery } from '@apollo/client'
import ProductItem from '@components/shop/ProductItem'
import Pagination from '@material-ui/lab/Pagination'
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
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const { data } = useQuery<{ products: Product[] }>(PRODUCTS_QUERY)

  useEffect(() => {
    if (data?.products?.length > 0) {
      const startIndex = (page - 1) * 5
      const endIndex = startIndex + 5
      setProducts(
        [...data.products]
          .sort((a, b) => {
            return Math.max(Math.min(b.score - a.score, 1), -1)
          })
          .slice(startIndex, endIndex)
      )
    }
  }, [data, page])

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value)
  }

  return (
    <Container>
      <GridList cols={3}>
        {data &&
          products.map((product) => {
            return <ProductItem key={product.id} product={product} />
          })}
      </GridList>
      <Pagination
        count={Math.floor((data?.products?.length - 1) / 5) + 1}
        page={page}
        onChange={handlePageChange}
      />
    </Container>
  )
}
