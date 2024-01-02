'use client';
import React,{useState,useEffect} from 'react';
import { Breadcrumb, Layout, Menu, theme, Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import styles from '../../styles/home.module.css'
import Image from 'next/image';
import { PiShoppingCartBold } from "react-icons/pi";
import {useSelector} from 'react-redux';
const { Search } = Input;
const { Header, Content, Footer } = Layout;
import { Avatar,Button, Popover } from 'antd';
import Link from 'next/link'

const App = () => {
  
  const {userDetails}=useSelector(state=>state.user)
  const [searchList,setSearchList]=useState([])
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
    
    <Layout className={styles.container}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'black',
          border: '1px solid black',
          
        }}
      >
         
          <div className={styles.logo}>
          <Image
          src="/hh.jpeg"
          width={80}
          height={60}
          alt="Picture of the hamro bhansa"
          style={{ border: '2px solid black', 
          borderRadius: '50%' ,
          height: 'auto',
          width: 'auto',
          marginTop: '25px',
          marginRight: '800px', 
         }}
        />
        </div>
        <Menu 
        theme="dark-black" mode="horizontal"
         
         >
           <Link href="/home">
            <Menu.Item key="alipay">
            Home
            </Menu.Item>
            </Link>
            <Link href="/map">
            <Menu.Item key="alipay">
            Location
            </Menu.Item>
            </Link>
            <Link href="/map">
            <Menu.Item key="alipay">
            Contact
            </Menu.Item>
            </Link>
            <PiShoppingCartBold className={styles.cart}/>

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
           }}
        >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >

          
          <Search className={styles.search}
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
          <div className={styles.sdiv}>
          <div className={styles.text}>
          <h3>Are you hungry</h3>
          <h1>Don't Wait!</h1>
          <h4>Let's start to Your Food Now</h4>
          </div>
          <div className={styles.button}>
          <Link href="/categories" passHref>
           <Button type="default" size="large" style={{ margin: '10px' }}>
            Order Now
          </Button>
          </Link>
          <Link href="/menu" passHref>
          <Button  type="primary" size="large" style={{ margin: '10px' }}>
            View Menu
          </Button>
          </Link>
          </div>
        </div>
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