"use client"
import React,{useEffect, useState} from 'react'

function page({params}) {
  const [productDetail, setProductDetail] = useState({})
  const fetchProducts = async()=> {
    const res = await fetch(`http://localhost:4000/products/${params._id}`)
    const data = await res.json()
    setProductDetail(data.productList) 
  }
  useEffect(()=>{
  fetchProducts()
  },[])
  return (
    <div>
    {productDetail.productName}
    {productDetail.description}
    </div>
  )
}

export default page