export default {
  graphqlEndpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || '',
  restEndpoint: process.env.NEXT_PUBLIC_REST_ENDPOINT || '',
  oauthClientId: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID || '',
  oauthClientSecret: process.env.NEXT_PUBLIC_OAUTH_CLIENT_SECRET || '',
}
