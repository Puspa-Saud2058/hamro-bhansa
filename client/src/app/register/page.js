'use client'

import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import Link from 'next/link'
import { message } from 'antd';

const SignupSchema = Yup.object().shape({
    fullname: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    email: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    confirmPassword: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

 const Home = () => {
  const [messageApi,contextHolder]=message.useMessage();
const handleRegister = async(values) => {
  const res = await fetch('http://localhost:4000/register', {
      method:'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
    const data = await res.json()
      messageApi.open({
        type: res.status == 200 ? 'success': 'error',
        content: data.msg,
      });
    console.log(res)
  }
  return(

  <div>
    <Image
      src="/hh.jpeg"
      width={100}
      height={100}
      alt="Picture of the hamro bhansa"
      style={{ border: '2px solid black', borderRadius: '50%' }}
    />
    <h1>Sign Up</h1>
    <Formik
      initialValues={{
        fullname:'',
        email:'',
        password: '',
        confirmPassword:'',       
      }}
      validationSchema={SignupSchema}
      onSubmit={values => {
        handleRegister(values)
        
      }}
    >
      {({ errors, touched }) => (
        <Form>
            <Field name="fullname" type="text" placeholder="Fullname" />
          {errors.fullname && touched.fullname ? (
            <div>{errors.fullname}</div>
          ) : null}
         <br/>
          <Field name="email" type="email" placeholder="email" />
          {errors.email && touched.email ? (
            <div>{errors.email}</div>
          ) : null}
          <br/>
          <Field name="password" type="password" placeholder="password" />
          {errors.password && touched.password ? (
            <div>{errors.password}</div>
          ) : null}
          <br/>
           <Field name="confirmPassword" type="password" placeholder="ConfirmPassword" />
          {errors.confirmPassword && touched.confirmPassword ? (
            <div>{errors.confirmPassword}</div>
          ) : null}
          <br/>
        <button type="submit">Sign Up</button>
        <br/>
        already a member? <Link href="/">Sign In</Link>
        </Form>
      )}
    </Formik>
    {contextHolder}
  </div>
)};

export default Home