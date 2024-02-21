'use client';

import React, { useState, useEffect } from 'react';
import { Breadcrumb, Layout, Pagination } from 'antd';
import Card from '../../components/Card/page';

const { Content } = Layout;

const App = () => {
  const [productList, setProductList] = useState([]);
  const [count, setCount] = useState(0);

  const fetchProducts = async (page= 1) => {
      const res = await fetch('http://localhost:4000/product?page='+page);
      const data = await res.json();
      setProductList(data.productList);
      setCount(data.totalCount)
     };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Layout className='layout'>
      <Breadcrumb style={{ height: '0px' }}></Breadcrumb>
      <Content>
        <div className='flex'>
          {productList.length > 0 &&
            productList.map((item, id) => {
              return(
              <div key={id}>
                <Card item={item} />
           
              </div>
              )
            })}
        </div>
        <Pagination onChange={(page) => fetchProducts(page)} defaultCurrent={1} total={count} pageSize={3}/>
      </Content>
    </Layout>
  );
};

export default App;
