import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import Env from '@utils/env'
import { setContext } from '@apollo/client/link/context'
import reduxStore from '@modules/redux'
import { authActions } from '@modules/redux/auth'

const cache = new InMemoryCache()

const authLink = setContext((_, { headers }) => {
  const { accessToken, tokenType } = reduxStore.getState().auth.token
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `${tokenType} ${accessToken}` : '',
    },
  }
})

let refreshingTokenPromise: undefined | Promise<Response>

const uploadLink = createUploadLink({
  uri: Env.graphqlEndpoint,
  fetch: (uri: RequestInfo, options: RequestInit | undefined) => {
    return fetch(uri, options).then(async (response) => {
      const json = await response.clone().json()
      const { token } = reduxStore.getState().auth
      if (
        json &&
        json.errors &&
        json.errors[0] &&
        json.errors[0].message === 'Not authorized' &&
        token != null
      ) {
        if (refreshingTokenPromise == null) {
          refreshingTokenPromise = fetch(`${Env.restEndpoint}/oauth/token/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              grant_type: 'refresh_token',
              client_id: Env.oauthClientId,
              client_secret: Env.oauthClientSecret,
              refresh_token: token.refreshToken,
            }),
          })
        }
        return refreshingTokenPromise.then(async (refreshResponse) => {
          refreshingTokenPromise = undefined
          const newToken = await refreshResponse.clone().json()
          if ('access_token' in newToken) {
            const { saveAccessToken } = authActions
            reduxStore.dispatch(saveAccessToken(newToken))
            if (options != null) {
              options = {
                ...options,
                headers: {
                  ...options.headers,
                  authorization: token
                    ? `${token.tokenType} ${token.accessToken}`
                    : '',
                },
              }
            }
          }
          return fetch(uri, options)
        })
      }
      return response
    })
  },
})

// @ts-ignore
const link = ApolloLink.from([authLink, uploadLink])

export default new ApolloClient({
  cache,
  link,
})
