'use client'
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
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

export const home = () => (
  <div>
       <h1>Log In</h1>
    <Formik
      initialValues={{
        email: '',
        password:'',
      }}
      validationSchema={LoginSchema}
      onSubmit={values => {
        // same shape as initial values
        console.log(values);
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
);
export default home 