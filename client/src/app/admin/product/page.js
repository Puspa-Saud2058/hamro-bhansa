'use client'

import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import {  message } from 'antd';


const productSchema = Yup.object().shape({

  productName: Yup.string().required('Required'),
  description:Yup.string().required('Required'),
  price:Yup.string(),
  image:Yup.string(),
  category:Yup.string()
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
        description:'',
        price:'',
        image:'',
        category:'', 
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
          <Field name="description" as="textarea" placeholder="Enter about your Product "/>
          {errors.description && touched.description? <div>{errors.description}</div> : null}
          <br />
          <br />
          <Field name="price" type="text" placeholder="Enter your Product price" />
          {errors.price && touched.price ? <div>{errors.price}</div> : null}
          <br />
          <br />
          <Field name="image" type="file" placeholder="Enter your  Product Image" />
          {errors.image && touched.image ? <div>{errors.image}</div> : null}
          <br />
          <br />
          <Field name="category" type="text" placeholder="Enter your Product Category" />
          {errors.category && touched.category ? <div>{errors.category}</div> : null}
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