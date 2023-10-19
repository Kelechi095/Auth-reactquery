import React from 'react'
import { customFetch } from '../helpers/customFetch'
import { useQuery } from 'react-query'

const fetchProducts = async () => {
  const res = await customFetch.get('/products')
  return res.data
}

export default function Profile() {
  const {data: products, isLoading, error} = useQuery("products", fetchProducts)
  return (
    <div>{products?.map(product => (
      <div key={product.id}>
        <h4>{product.title}</h4>
      </div>
    ))}</div>
  )
}
