import React from 'react'
import RegisterForm from 'views/auth-views/components/RegisterForm'
import { Card, Typography } from 'antd'

export default function Signup(props) {
  return (
    <Card>
      <Typography.Title>Sek9 Sign Up</Typography.Title>
      <RegisterForm />
    </Card>
  )
}
