'use client'
import React, { useState } from 'react';
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
    address: Yup.string()
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
    //role: Yup.string()
    //.required('Required')
});

 const Home = () => {
  
  const [messageApi,contextHolder]=message.useMessage();
  const [file,setFile]=useState(null)
  const saveImage=(e)=>{
   setFile(e.target.files[0])
  }
const handleRegister = async(values) => {
  var formData=new FormData();
  formData.append('avatar',file)

  Object.entries(values).map((item,id)=>{
   formData.append(item[0],item[1])
  })

  const res = await fetch('http://localhost:4000/register', {
      method:'POST', 
     body: formData
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
          <Field name="address" type="address" placeholder="address" />
          {errors.address && touched.address ? (
            <div className='errors'>{errors.address}</div>
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
          <Field component='select' name='role' id='roles' placeholder='Choose your role'>
            <option disabled >Choose your role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </Field>
          {errors.role && touched.role ? (
            <div className='errors'>{errors.role}</div>
          ) : null}
          <br/>
          <label>Upload Avatar</label><input type="file" onChange={saveImage}/>
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