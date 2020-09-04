import React, { useEffect } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import { userActions } from '@modules/redux/user'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@modules/redux'
import { AuthState } from '@modules/redux/auth'

const GET_ME = gql`
  query {
    me: getMe {
      name
    }
  }
`
export default () => {
  const token = useSelector<RootState, AuthState['token']>(
    (state) => state.auth.token
  )
  const dispatch = useDispatch()
  const { setMe } = userActions
  const [getMe, { data: getMeData }] = useLazyQuery(GET_ME)

  useEffect(() => {
    if (getMeData) {
      dispatch(setMe(getMeData.me))
    } else if (token != null) {
      getMe()
    }
  }, [token, getMeData])

  return <></>
}
