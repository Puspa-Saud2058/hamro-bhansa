'use client'
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { message } from 'antd';
import Link from 'next/link';

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
      console.log(res)
    }
  
  
  return(

  <div>
    {contextHolder}  
       <h1>Log In</h1>
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
        <Form>
          <Field name="email" placeholder="Email/Username"/>
          {errors.email && touched.email ? (
            <div>{errors.email}</div>
          ) : null}
          <br/>
          <Field name="password" placeholder="Password"/>
          {errors.password && touched.password ? (
            <div>{errors.password}</div>
          ) : null}
          <br/>
          <button type="submit">Login</button>
          <br/>
          Don't have account? <Link href="/register">SignUp</Link>
        </Form>
      )}
    </Formik>
  </div>
)};
export default home 