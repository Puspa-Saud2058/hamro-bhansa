'use client'
import React from 'react';
import { Formik,Field } from 'formik';
import * as Yup from 'yup';
import { message } from 'antd';
import {useRouter} from 'next/navigation'
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { Button, Checkbox, Form, Input } from 'antd';
import { setLoginDetails } from '../../redux/reducerSlices/userSlice';
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
const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

 const home = () => {
  const dispatch=useDispatch()
  const router=useRouter()
  const [messageApi,contextHolder]=message.useMessage();
  const onFinish = async(values) => {
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
       <h1>Log In</h1>
    {/* <Formik
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
          <Field name="password" type="password" placeholder="Password"/>
          {errors.password && touched.password ? (
            <div>{errors.password}</div>
          ) : null}
          <br/>
          <button type="submit">Login</button>
          <br/>
          Don't have account? <Link href="/register">SignUp</Link>
        </Form>
      )}
    </Formik> */}
  <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
      <br/>
          Don't have account? <Link href="/register">SignUp</Link>
    </Form.Item>
  </Form>
  </div>
)};
export default home 