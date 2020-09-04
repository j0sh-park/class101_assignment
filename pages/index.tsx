import React from 'react'
import { useRouter } from 'next/router'

export default () => {
  const router = useRouter()
  return (
    <div>
      <h2>index page</h2>
      <button
        type="button"
        onClick={() => {
          router.push('/products')
        }}
      >
        products
      </button>
    </div>
  )
}
