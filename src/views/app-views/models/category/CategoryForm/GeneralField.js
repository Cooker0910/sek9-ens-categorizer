import React from 'react'
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  Upload,
  InputNumber,
  message,
  Select,
  Button,
  Icon
} from 'antd'
import { ImageSvg } from 'assets/svg/icon'
import CustomIcon from 'components/util-components/CustomIcon'
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons'
import momenttz from 'moment-timezone'
import FirebaseService from 'services/FirebaseService'

const { Dragger } = Upload
const { Option } = Select

const rules = {
  name: [
    {
      required: true,
      message: 'Please enter category name'
    }
  ],
  description: [
    {
      required: true,
      message: 'Please enter category description'
    }
  ],
  shortName: [
    {
      required: true,
      message: 'Please enter category short name'
    }
  ],
  floorprice_decimal: [
    {
      required: false,
      message: 'Please enter floorprice price. Default is 0.'
    }
  ],
  owners: [
    {
      required: false,
      message: 'Please enter numbers of owners. Default is 0.'
    }
  ],
  available: [
    {
      required: false,
      message: 'Please enter available numbers. Default is 0.'
    }
  ],
  communityDiscord: [
    {
      required: false,
      message: 'Please enter name of Discord.'
    }
  ],
  communityTwitter: [
    {
      required: false,
      message: 'Please enter name of Twitter.'
    }
  ],
  regularExpression: [
    {
      required: false,
      message: 'Please enter general regular expression of ETH names.'
    }
  ],
  wikiUrl: [
    {
      required: false,
      message: 'Please enter Wikipedia or website url including ETH names.'
    }
  ]
}

const beforeUpload = file => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

const customUpload = async ({ onError, onSuccess, file }) => {
  const metadata = {
    contentType: file.type
  }
  const fileName = momenttz.tz('America/New_York').format('x')
  const ext = file.name.split('.').pop()
  try {
    const imageUrl = await FirebaseService.uploadFile(
      fileName + '.' + ext,
      file,
      metadata
    )
    onSuccess && onSuccess(null, imageUrl)
  } catch (e) {
    onError && onError(e)
  }
}

const imageUploadProps = {
  name: 'file',
  multiple: true,
  listType: 'picture-card',
  showUploadList: false,
  action: ''
}

const tags = ['numbers', 'letters', 'emojis', '0x']

const GeneralField = props => {
  let fileListProps = {}
  if (props.uploadedFiles.length > 0) {
    fileListProps.fileList = props.uploadedFiles
  }
  console.log('==== fileListProps: ', fileListProps)
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Form.Item name="name" label="Category name" rules={rules.name}>
            <Input placeholder="Category Name" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={rules.description}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="shortName"
            label="Short Name"
            rules={rules.shortName}
          >
            <Input placeholder="Short Name" />
          </Form.Item>
        </Card>
        <Card title="Pricing">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                name="floorprice_decimal"
                label="Price"
                rules={rules.floorprice_decimal}
              >
                <InputNumber
                  className="w-100"
                  formatter={value =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="Other">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="count" label="Counts" rules={rules.owners}>
                <InputNumber
                  className="w-100"
                  formatter={value =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                name="available"
                label="Available"
                rules={rules.available}
              >
                <InputNumber
                  className="w-100"
                  formatter={value =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="owners" label="Owners" rules={rules.owners}>
                <InputNumber
                  className="w-100"
                  formatter={value =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Image">
          <Dragger
            {...imageUploadProps}
            beforeUpload={beforeUpload}
            onChange={e => props.handleUploadChange(e)}
            customRequest={customUpload}
          >
            {props.uploadedImg ? (
              <img src={props.uploadedImg} alt="avatar" className="img-fluid" />
            ) : (
              <div>
                {props.uploadLoading ? (
                  <div>
                    <LoadingOutlined className="font-size-xxl text-primary" />
                    <div className="mt-3">Uploading</div>
                  </div>
                ) : (
                  <div>
                    <CustomIcon className="display-3" svg={ImageSvg} />
                    <p>Click or drag file to upload</p>
                  </div>
                )}
              </div>
            )}
          </Dragger>
        </Card>
        <Card title="Organization">
          <Form.Item name="tags" label="Tags">
            <Select mode="tags" style={{ width: '100%' }} placeholder="Tags">
              {tags.map(elm => (
                <Option key={elm}>{elm}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="communityDiscord"
            label="Community Discord"
            rules={rules.communityDiscord}
          >
            <Input placeholder="Community Discord" />
          </Form.Item>
          <Form.Item
            name="communityTwitter"
            label="Community Twitter"
            rules={rules.communityTwitter}
          >
            <Input placeholder="Community Twitter" />
          </Form.Item>
        </Card>
        <Card title="List of Ethereum Names">
          <Form.Item
            name="regularExpression"
            label="Regular Expression"
            rules={rules.regularExpression}
          >
            <Input placeholder="Regular Expression" />
          </Form.Item>
          <Form.Item name="wikiUrl" label="Wiki URL" rules={rules.wikiUrl}>
            <Input placeholder="Wiki URL" />
          </Form.Item>
        </Card>
        <Card title="List files">
          <Upload
            accept=".txt, .csv"
            multiple={true}
            {...fileListProps}
            // fileList={props.uploadedFiles}
            // beforeUpload={beforeCsvUpload}
            onChange={e => props.handleCsvUploadChange(e)}
            customRequest={e => props.customCsvUpload(e)}
            onRemove={e => props.handleCsvRemove(e)}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Card>
      </Col>
    </Row>
  )
}

export default GeneralField
