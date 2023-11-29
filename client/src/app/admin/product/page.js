'use client'

import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import {  message } from 'antd';


const productSchema = Yup.object().shape({

  productName: Yup.string().required('Required'),
  Description:Yup.string().required('Required'),
  price:Yup.string(),
  Image:Yup.string(),
  Category:Yup.string()
});

export const index = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const productHandle = async(values) => {
    const res = await fetch('http://localhost:4000/product', {
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
  <div className='form'>
    <h1>Product Information</h1>
    
    
    <Formik
      initialValues={{
       
        productName : '',
        Description:'',
        price:'',
        Image:'',
        Category:'', 
      }}
      // validationSchema={SignupSchema}
      onSubmit={values => {
        // same shape as initial values
        productHandle(values)
      }}
    >
      {({ errors, touched }) => (
        <Form >
         {contextHolder}
          <Field name="productName" type="text" placeholder="Enter your  Prouct name" />
          {errors.productName && touched.productName ? <div>{errors. productName}</div> : null}
          <br />
          <br />
          <Field name="Description" type="text" placeholder="Enter about your Product "/>
          {errors.Description && touched.Description? <div>{errors.Description}</div> : null}
          <br />
          <br />
          <Field name="price" type="text" placeholder="Enter your Product price" />
          {errors.price && touched.price ? <div>{errors.price}</div> : null}
          <br />
          <br />
          <Field name="Image" type="file" placeholder="Enter your  Product Image" />
          {errors.Image && touched.Image ? <div>{errors.Image}</div> : null}
          <br />
          <br />
          <Field name="Category" type="text" placeholder="Enter your Product Category" />
          {errors.Category && touched.Category ? <div>{errors.Category}</div> : null}
          <br />
          
          <br />
          <button type="submit">Submit</button>
          <br />
          </Form>
      )}
    </Formik>
  </div>
)};
export default index 