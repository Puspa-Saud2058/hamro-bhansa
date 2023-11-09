'use client'
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

export const home = () => (
  <div>
    <h1>Signup</h1>
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password:'',
      }}
      validationSchema={SignupSchema}
      onSubmit={values => {
        // same shape as initial values
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="firstName" placeholder="firstname"/>
          {errors.firstName && touched.firstName ? (
            <div>{errors.firstName}</div>
          ) : null}
          <Field name="lastName" placeholder="lastname"/>
          {errors.lastName && touched.lastName ? (
            <div>{errors.lastName}</div>
          ) : null}
          <Field name="email" type="email" placeholder="email" />
          {errors.email && touched.email ? <div>{errors.email}</div> : null}
          <Field name="passsword" type="password" placeholder="password"/>
          {errors.password && touched.password ? (
            <div>{errors.password}</div>
          ) : null}
          <button type="submit">Join now</button>
        </Form>
      )}
    </Formik>
  </div>
);
export default home 