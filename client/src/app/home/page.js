'use client';
import React,{useState,useEffect} from 'react';
import { Breadcrumb, Layout, Menu, theme, Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import Card from '../../components/Card/page';
import Image from 'next/image';
import {useSelector} from 'react-redux';
const { Search } = Input;
const { Header, Content, Footer } = Layout;
import { Avatar, Divider,Tooltip,Button, Popover, ConfigProvider } from 'antd';
import Link from 'next/link'

const App = () => {
  const {userDetails}=useSelector(state=>state.user)
const [productList,setProductList]=useState([])
const [searchList,setSearchList]=useState([])
  const fetchProducts=async()=>{
  const res=await fetch('http://localhost:4000/product')
  const data =await res.json()
  setProductList(data.productList)
  }

  useEffect(()=>{
    fetchProducts()
  },[])
  const text = <span>{userDetails.email}</span>;
const content = (
  <div>
    <Link href="/profile"><span>Profile</span></Link>
    <p>Logout</p>
  </div>
);
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
  const onSearch = async(value, _e, info) => {
   const res=await fetch('http://localhost:4000/search-products?name='+value)
   const data=await res.json()
   setSearchList(data.productList)
   
  };
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
        <Menu 
        theme="dark" mode="horizontal"
         
         >
             <Link href="/login">
            <Menu.Item key="alipay">
            Login
            </Menu.Item>
            </Link>
            <Link href="/register">
            <Menu.Item key="alipay">
            Register
            </Menu.Item>
            </Link>  
         
         <div
        style={{
          marginInlineStart:80,
          clear: 'both',
          whiteSpace: 'nowrap',
        }}
      >
          <Popover placement="bottomRight" title={text} content={content}>
          <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
        </Popover>
      </div>    
        </Menu>
      </Header>
      <Content
        style={{
          padding: '0 50px',
          background: `url(${'public/burger-black_181624-884.jpg'}}) center/cover no-repeat fixed`,
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
          <div>
            {searchList.length > 0 && searchList.map((item) => {
     return <li>{item.productName}</li>
            })}
            </div>
          
          

        </Breadcrumb>
        <div
          className="site-layout-content"
          style={{
            background: '',
            display:'flex'
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
        Hamro-bhansa-2023
      ></Footer>
    </Layout>
  );
};

export default App;