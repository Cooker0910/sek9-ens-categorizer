import React from 'react'
import { Card, Typography } from 'antd'
import LoginForm from 'views/auth-views/components/LoginForm'

export default function Login(props) {
  return (
    <Card style={{ minWidth: '40vw' }}>
      <Typography.Title>Sek9 Sign In</Typography.Title>
      <p>
        Don't have an account yet? <a href="/signup">Sign Up</a>
      </p>
      <LoginForm otherSignIn={false} allowRedirect goBack />
    </Card>
  )
}
