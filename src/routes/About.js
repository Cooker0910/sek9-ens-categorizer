import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styled from '@emotion/styled/macro'
import { Input, Form, Button, Card, Typography } from 'antd'

function About() {
  const { t } = useTranslation()

  const onFinish = values => {
    console.log('Success:', values)
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }
  return (
    <FaqContainer>
      <Typography.Title level={1} style={{ textAlign: 'center' }}>
        Contact Us
      </Typography.Title>
      <Form
        name="basic"
        labelCol={{
          span: 4
        }}
        wrapperCol={{
          span: 20
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Message"
          name="message"
          rules={[
            {
              required: true,
              message: 'Please input your message!'
            }
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 20
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </FaqContainer>
  )
}

const FaqContainer = styled(Card)`
  padding: 20px 40px;
  background-color: white;
  width: 50vw;
`

export default About
