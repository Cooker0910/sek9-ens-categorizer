import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd'
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import EthField from './EthField'
import FirebaseService from 'services/FirebaseService'
import moment from 'moment'
import { setCategories, showCategoryLoading } from 'redux/actions/Category'

const { TabPane } = Tabs

const ADD = 'ADD'
const EDIT = 'EDIT'

const CategoryForm = props => {
  const { mode = ADD, param, propsCategories } = props

  const [form] = Form.useForm()
  const [uploadedImg, setImage] = useState('')
  const [uploadedFiles, setFiles] = useState([])
  const [uploadLoading, setUploadLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [category, setCategory] = useState(null)

  useEffect(() => {
    console.log('param', param)
    console.log('props', props)
    if (mode === EDIT) {
      console.log('is edit')
      const { id } = param
      const produtId = parseInt(id)
      const categoryData = propsCategories.categories.filter(
        category => category.id === produtId
      )
      const cat = categoryData[0]
      if (!cat) return
      form.setFieldsValue({
        ...cat,
        floorprice_decimal: cat.floorprice_decimal / Math.pow(10, 18)
      })
      setImage(cat.imageUrl)
      setFiles(cat.files ? cat.files : [])
      setCategory(cat)
    }
  }, [form, mode, param, props])

  const handleUploadChange = info => {
    if (info.file.status === 'uploading') {
      setUploadLoading(true)
      return
    }
    if (info.file.status === 'done') {
      setImage(info.file.xhr)
    }
  }

  const handleCsvCustomUpload = async ({ onError, onSuccess, file }) => {
    const metadata = {
      contentType: file.type
    }
    const categoryName = category
      ? category.name
      : momenttz.tz('America/New_York').format('x')
    let existFile = uploadedFiles.find(uf => uf.name == file.name)
    if (existFile && existFile.status == 'done') {
      onError && onError('File already exist')
      message.error('File already exist. Please upload other file.')
      return
    }
    try {
      const csvUrl = await FirebaseService.uploadCsvFile(
        categoryName,
        file.name,
        file,
        metadata
      )
      console.log('==== csvUrl: ', csvUrl)
      onSuccess && onSuccess(null, csvUrl)
    } catch (e) {
      onError && onError(e)
    }
  }

  const handleCsvUploadChange = info => {
    const file = info.file
    let tmpFiles = [...uploadedFiles]
    let existFile = tmpFiles.find(uf => uf.name == file.name)
    if (file.status === 'uploading') {
      if (!existFile) {
        tmpFiles.push({
          name: file.name,
          url: '',
          type: file.type,
          size: file.size,
          uid: file.uid,
          status: 'uploading'
        })
        setFiles(tmpFiles)
        setUploadLoading(true)
      }
      return
    }
    if (file.status === 'done') {
      // Check the status of all files.
      if (existFile) {
        existFile.status = file.status
        existFile.url = file.xhr
        setFiles(tmpUploadedFiles)
      }
    }
    if (file.status === 'removed') {
      let tmpFiles = [...uploadedFiles]
      let index = tmpFiles.findIndex(uf => uf.name == file.name)
      if (index >= 0) {
        tmpFiles.splice(index, 1)
        setFiles(tmpFiles)
        return true
      }
    }
  }

  const onFinish = () => {
    setSubmitLoading(true)
    form
      .validateFields()
      .then(values => {
        if (mode === ADD) {
          let newValue = {
            objectId: '',
            category: 0,
            frontendSorting: 0,
            name: '',
            description: '',
            shortName: '',
            imageUrl: '',
            listed: true,
            synced: true,
            createdAt: '',
            updatedAt: '',
            available: 0,
            count: 0,
            owners: 0,
            totalVolume: 0,
            tags: [],
            communityDiscord: '',
            communityTwitter: '',
            floorprice: '',
            floorprice_decimal: 0,
            regularExpression: '',
            wikiUrl: '',
            ...values
          }
          newValue.floorprice_decimal =
            values.floorprice_decimal * Math.pow(10, 18)
          newValue.floorprice = `${newValue.floorprice_decimal}`
          newValue.createdAt = `${moment().format('YYYY-mm-DDTHH:MM:SS')}.00Z`
          newValue.updatedAt = newValue.createdAt
          if (!!uploadedImg) {
            newValue.imageUrl = uploadedImg
          }
          if (uploadedFiles && uploadedFiles.length > 0) {
            newValue.files = uploadedFiles
          }
          FirebaseService.addCategory(newValue)
        }
        if (mode === EDIT) {
          const { id } = param
          const produtId = parseInt(id)
          const categoryData = propsCategories.categories.filter(
            cat => cat.id === produtId
          )
          const cat = categoryData[0]
          let updatedValue = {
            ...cat,
            ...values
          }
          updatedValue.floorprice_decimal =
            values.floorprice_decimal * Math.pow(10, 18)
          updatedValue.floorprice = `${updatedValue.floorprice_decimal}`
          updatedValue.updatedAt = `${moment().format(
            'YYYY-mm-DDTHH:MM:SS'
          )}.00Z`
          updatedValue.communityDiscord = updatedValue.communityDiscord || ''
          updatedValue.communityTwitter = updatedValue.communityTwitter || ''
          updatedValue.wikiUrl = updatedValue.wikiUrl || ''
          updatedValue.regularExpression = updatedValue.regularExpression || ''
          if (!!uploadedImg) {
            updatedValue.imageUrl = uploadedImg
          }
          if (uploadedFiles && uploadedFiles.length >= 0) {
            updatedValue.files = uploadedFiles
          }
          console.log('==== updatedValue: ', updatedValue)
          FirebaseService.updateCategory(updatedValue)
        }

        setTimeout(() => {
          setSubmitLoading(false)
          if (mode === ADD) {
            message.success(`Created ${values.name} to category list`)
          }
          if (mode === EDIT) {
            message.success(`Category saved`)
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
        initialValues={{
          heightUnit: 'cm',
          widthUnit: 'cm',
          weightUnit: 'kg'
        }}
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
                {mode === 'ADD' ? 'Add New Category' : `Edit Category`}{' '}
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
              <GeneralField
                uploadedImg={uploadedImg}
                uploadedFiles={uploadedFiles}
                uploadLoading={uploadLoading}
                handleUploadChange={handleUploadChange}
                handleCsvUploadChange={handleCsvUploadChange}
                handleCsvCustomUpload={handleCsvCustomUpload}
              />
            </TabPane>
            <TabPane tab="ETH" key="2">
              <EthField category={category ? category.name : ''} />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  )
}

const mapStateToProps = ({ category }) => {
  return { propsCategories: category }
}

const mapDispatchToProps = {
  setCategories,
  showCategoryLoading
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryForm)
