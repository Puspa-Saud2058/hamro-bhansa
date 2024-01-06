'use client'
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import Link from 'next/link';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import styles from '../../styles/register.module.css'
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
    role: Yup.string()
    .required('Required')
});


 const Home = () => {
  
  const [messageApi,contextHolder]=message.useMessage();

  const [loading, setLoading] = useState(false);
  const [file,setFile]=useState(null)

  const handleRegister = async(values) => {
    var formData = new FormData();
    formData.append('avatar', file) 
    Object.entries(values).map((item,id)=>{
      formData.append(item[0], item[1]) 
     });
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

  const saveImage=(e)=>{
   setFile(e.target.files[0])
  }
    
  return(
  <div>
   <h1 className={styles.h1}>Sign Up</h1>
    <Formik
      initialValues={{
        fullname:'',
        phoneNumber:'',
        email:'',
        address:'',
        password: '',
        confirmPassword:'', 
        role:''      
      }}
      validationSchema={SignupSchema}
      onSubmit={values => {
        handleRegister(values)
        
      }}
    >
      {({ errors, touched }) => (
        <Form className={styles.form}>
            <Field className={styles.input} name="fullname" type="text" placeholder="Fullname" />
          {errors.fullname && touched.fullname ? (
            <div>{errors.fullname}</div>
          ) : null}
         <br/>
          <Field className={styles.input}  name="email" type="email" placeholder="email" />
          {errors.email && touched.email ? (
            <div>{errors.email}</div>
          ) : null}
          <br/>
          <Field className={styles.input}  name="phoneNumber" type="text" placeholder="Phone no." />
          {errors.ephoneNumber&& touched.phoneNumber? (
            <div>{errors.phoneNumber}</div>
          ) : null}
          <br/>
          <Field className={styles.input}  name="address" type="address" placeholder="address" />
          {errors.address && touched.address ? (
            <div className='errors'>{errors.address}</div>
          ) : null}
          <br/>
          <Field className={styles.input}  name="password" type="password" placeholder="password" />
          {errors.password && touched.password ? (
            <div>{errors.password}</div>
          ) : null}
          <br/>
           <Field className={styles.input}  name="confirmPassword" type="password" placeholder="ConfirmPassword" />
          {errors.confirmPassword && touched.confirmPassword ? (
            <div>{errors.confirmPassword}</div>
          ) : null}
          <br/>
          <Field  className={styles.input} component='select' name='role' id='roles' placeholder='Choose your role'>
            <option disabled >Choose your role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </Field>
          {errors.role && touched.role ? (
            <div className='errors'>{errors.role}</div>
          ) : null}
          <br/>
          <input type='file' onChange={saveImage}/>
           <br/>
        <button className={styles.button}  type="submit">Sign Up</button>
        <br/>
        
        already a member? <Link href="/">Sign In</Link>
        </Form>
      )}
    </Formik>
    {contextHolder}
  </div>
)};

export default Home