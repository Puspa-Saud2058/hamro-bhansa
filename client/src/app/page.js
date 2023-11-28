// Importing Dependencies
'use client';
import React, { useState, useEffect } from 'react';
import { Breadcrumb, Layout, Menu, theme, Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Card from './components/Card/page'

// Destructuring antd components
const { Search } = Input;
const { Header, Content, Footer } = Layout;

// Main functional component for the application
const App = () => {
  // State for storing the list of products
  const [productList, setProductList] = useState([]);

  // Function to fetch products from the server
  const fetchProducts = async () => {
    const res = await fetch('http://localhost:4000/product');
    const data = await res.json();
    setProductList(data.productList);
  };

  // useEffect to fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Accessing theme token from the theme package
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // Icon for the search input
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1677ff',
      }}
    />
  );

  // Function to handle search
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  // JSX structure for the main layout
  return (
    <Layout className="layout">
      {/* Header section */}
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'white',
          border: '1px solid black',
        }}
      >
        {/* Placeholder for the logo */}
        <div className="demo-logo" />
        {/* Image component with Next.js Image for logo */}
        
        <Image
          src="/hh.jpeg"
          width={100}
          height={100}
          alt="Picture of the hamro bhansa"
          style={{ border: '2px solid black', borderRadius: '50%' }}
        />
        {/* Menu for login and signup */}
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">Login</Menu.Item>
          <Menu.Item key="2">Signup</Menu.Item>
        </Menu>
      </Header>
      {/* Content section */}
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        {/* Breadcrumb section with search input */}
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
        {/* Main content area */}
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer, // Use the color from your theme
          }}
        >
          {JSON.stringify(productList)}
          {productList.length>0 && productList.map((item,id)=>{
            return(

              <Card item={item}/>
            )
          })}
        </div>
      </Content>
      {/* Footer section */}
      <Footer
        style={{
          textAlign: 'center',
        }}
      ></Footer>
    </Layout>
  );
};

// Exporting the main component
export default App;
