'use client';
import React,{useState,useEffect} from 'react';
import { Breadcrumb, Layout, Menu, theme, Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import Card from './components/Card/page';
import Image from 'next/image';
const { Search } = Input;
const { Header, Content, Footer } = Layout;


const App = () => {
const [productList,setProductList]=useState([])
  const fetchProducts=async()=>{
  const res=await fetch('http://localhost:4000/product')
  const data =await res.json()
  setProductList(data.productList)
  }

  useEffect(()=>{
    fetchProducts()
  },[])
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1677ff',
      }}
    />
  );
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  return (
    <Layout className="layout">
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'white',
          border: '1px solid black',
        }}
      >
        <div className="demo-logo" />
       
          <Image
          src="/hh.jpeg"
          width={100}
          height={100}
          alt="Picture of the hamro bhansa"
          style={{ border: '2px solid black', borderRadius: '50%' }}
        />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">Login</Menu.Item>
          <Menu.Item key="2">Signup</Menu.Item>
        </Menu>
      </Header>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Search
            placeholder="Enter Your food order"
            enterButton="Search"
            size="large"
            suffix={suffix}
            onSearch={onSearch}
          />
        </Breadcrumb>
        <div
          className="site-layout-content"
          style={{
            background: '',
          }}
        >
           {productList.length>0 && productList.map((item,id)=>{
            return(
              <Card item={item}/>
            )
           })}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      ></Footer>
    </Layout>
  );
};

export default App;