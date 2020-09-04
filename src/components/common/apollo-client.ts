import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import Env from '@utils/env'

const cache = new InMemoryCache()

const uploadLink = createUploadLink({
  uri: Env.graphqlEndpoint,
})

// @ts-ignore
const link = ApolloLink.from([uploadLink])

export default new ApolloClient({
  cache,
  link,
})
