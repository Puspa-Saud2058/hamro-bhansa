'use client'
import { Field } from 'formik'
import React from 'react'

const page=()=> {
  return (
    <div>
        <h1>Reset Password</h1>
        Email
        <input type="email"/>
        <div>
        <button>Send OTP</button>
        <button>Back</button>
        </div>
    </div>
  )
}

export default page