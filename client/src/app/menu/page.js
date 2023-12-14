
'use client'// Import 'client' should be 'next'
import React, { useEffect, useState } from 'react';

function Page({ params }) {
  const [productDetail, setProductDetail] = useState({});

  const fetchProduct = async () => {
    const res = await fetch(`http://localhost:4000/products/${params._id}`);
    const data = await res.json();
    setProductDetail(data.productList);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <div>{JSON.stringify(productDetail)} Hello it is page</div>
    </>
  );
}

export default Page;
