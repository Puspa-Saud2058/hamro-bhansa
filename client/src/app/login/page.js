'use client'
import React from 'react';
import { Formik,Field,Form } from 'formik';
import Image from 'next/image';
import * as Yup from 'yup';
import { message } from 'antd';

import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import {useRouter} from 'next/navigation'
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { setLoginDetails } from '../../redux/reducerSlices/userSlice';
import styles from '../../styles/login.module.css'


const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
 password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

 const home = () => {
  const dispatch=useDispatch()
  const router=useRouter()  
  const [messageApi,contextHolder]=message.useMessage();
  const handleLogin = async(values) => {
    const res = await fetch('http://localhost:4000/login', {
        method:'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })
      const data = await res.json()
        messageApi.open({
          type: res.status == 200 ? 'success': 'error',
          content: data.msg,
        });
      if(res.status==200){
        dispatch(setLoginDetails(data.userDetails))
        router.push('/')
      }
    }
    
  return(

  <div>
    {contextHolder}  
       <h1 className={styles.h1}>Log In</h1>
     <Formik
      initialValues={{
        email: '',
        password:'',
      }}
      validationSchema={LoginSchema}
      onSubmit={values => {
      handleLogin(values);
      }}
    >
      {({ errors, touched }) => (
       
        <Form className={styles.form}>
          <span className={styles.span}>Email</span>
          <br/>
          <Field className={styles.field} name="email" type="email"/>
          {errors.email && touched.email ? (
            <div>{errors.email}</div>
          ) : null}
          <br/>
          <span className={styles.span}>Password</span>
          <br/>
          <Field className={styles.field} name="password" type="password"/>
          {errors.password && touched.password ? (
            <div>{errors.password}</div>
          ) : null}
          <br/>
           <input type="checkbox" name="remember"/> Remember Me
          <br/>
          <button className={styles.button}type="submit">LOGIN</button>

          <Link href="/user/forget-password"><span className={styles.span1}>Forget Password?</span></Link>        
           <hr data-content="OR"/>
           <div className={styles.icons}>
           <Link href="https://www.facebook.com">
           <FacebookIcon className={styles.fb}/>
           </Link>
           <Link href="https://www.google.com">
            <GoogleIcon className={styles.google}/> 
          </Link>
          <Link href="https://www.linkedin.com"  rel="noopener noreferrer">
          <LinkedInIcon className={styles.link}/>
          </Link>
           </div>
           <br/>
          <span className={styles.do}>Don't have account? <Link href="/register">SignUp</Link></span> 
        </Form>
       
      )}
   
    </Formik> 
    </div>
)};
export default home 