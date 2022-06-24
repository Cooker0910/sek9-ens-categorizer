import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd'
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import {
  apiGetDomainById,
  apiCreateDomain,
  apiUpdateDomainById
} from 'api/rest/domain'
import { apiCreateFeedback, apiGetFeedbackById } from 'api/rest/feedback'
import AnswerField from './AnswerField'

const { TabPane } = Tabs

const ADD = 'ADD'
const EDIT = 'EDIT'

const FeedbackForm = props => {
  const { mode = ADD, param, propsTag } = props

  const [form] = Form.useForm()
  const [submitLoading, setSubmitLoading] = useState(false)
  const [feedback, setFeedback] = useState({})

  useEffect(() => {
    if (mode === EDIT) {
      param.id && getFeedback(param.id)
    }
  }, [form, mode, param, props])

  const getFeedback = async id => {
    const res = await apiGetFeedbackById(id)
    if (res && !res.error) {
      form.setFieldsValue(res)
      setFeedback(res)
    }
  }

  const onFinish = () => {
    setSubmitLoading(true)
    form
      .validateFields()
      .then(async values => {
        if (mode === ADD) {
          let newValue = {
            name: '',
            description: '',
            ...values
          }
          const res = await apiCreateFeedback(newValue)
        }

        setTimeout(() => {
          setSubmitLoading(false)
          if (mode === ADD) {
            message.success(`Created ${values.name} to domain list`)
          }
          if (mode === EDIT) {
            message.success(`Domain saved`)
          }
        }, 1500)
      })
      .catch(info => {
        setSubmitLoading(false)
        console.log('info', info)
        message.error('Please enter all required field ')
      })
  }

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
      >
        <PageHeaderAlt className="border-bottom" overlap>
          <div className="container">
            <Flex
              className="py-2"
              mobileFlex={false}
              justifyContent="between"
              alignItems="center"
            >
              <h2 className="mb-3">
                {mode === 'ADD' ? 'Add New Domain' : `View Domain`}{' '}
              </h2>
              <div className="mb-3">
                <Button className="mr-2">Discard</Button>
                <Button
                  type="primary"
                  onClick={() => onFinish()}
                  htmlType="submit"
                  loading={submitLoading}
                >
                  {mode === 'ADD' ? 'Add' : `Save`}
                </Button>
              </div>
            </Flex>
          </div>
        </PageHeaderAlt>
        <div className="container">
          <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
            <TabPane tab="General" key="1">
              <GeneralField disabled />
            </TabPane>
            <TabPane tab="Answer" key="2">
              <AnswerField />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  )
}

export default FeedbackForm
