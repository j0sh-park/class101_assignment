import React from 'react'
import { Container, List, ListItem, ListItemText } from '@material-ui/core'
import { gql, useQuery } from '@apollo/client'
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
  const { data } = useQuery<{ products: Product[] }>(PRODUCTS_QUERY)

  return (
    <Container>
      <List>
        {data &&
          data.products.map((product) => {
            return (
              <ListItem key={product.id} role={undefined} dense button>
                <ListItemText primary={product.title} />
                <ListItemText primary={product.price.toLocaleString()} />
              </ListItem>
            )
          })}
      </List>
    </Container>
  )
}
