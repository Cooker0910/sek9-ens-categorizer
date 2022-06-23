import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styled from '@emotion/styled/macro'
import { Input, Form, Button, Card, Typography } from 'antd'
import { Link } from 'react-router-dom'

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
      <Typography.Paragraph style={{ textAlign: 'center', marginBottom: 20 }}>
        SeK9 was built to help our users better find their favorite domains
        based on 100's of different categories. If you have any category
        requests, feedback, or questions feel free to email us at{' '}
        <a href={'mailto:contact@sek9.com'}>contact@sek9.com</a>.
      </Typography.Paragraph>
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
