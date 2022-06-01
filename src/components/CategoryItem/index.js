import React from 'react'
import { useHistory } from 'react-router-dom'
import Loader from '../Loader'
import { Avatar, Card, Space, Typography, Row, Col } from 'antd'


const Label = ({ label, text }) => {
  return (
    <Space direction='horizontal'>
      <Typography.Text>{label}</Typography.Text>
      <Typography.Text>{text}</Typography.Text>
    </Space>
  )
}

const CategoryItem = ({  category,  domain,  className,  loading,}) => {
  console.log('category: ',category)
  const history = useHistory()
  if (loading) {
    return (
      <Card>
        <Loader />
      </Card>
    )
  }
  return (
    <Card hoverable onClick={()=>history.push(`/category/${category.name}`)} >
      <Card.Meta
      avatar={<Avatar src={category.imageUrl}/>}
      title={category.name}
      description={<Typography.Paragraph ellipsis >{category.description}</Typography.Paragraph>}
      />
      <Row>
        <Col span={8}>
          <Label label='Floor:' text={category.floorprice_decimal/ Math.pow(10, 18)} />
        </Col>
        <Col span={16}>
          <Label label='Mint Status:' text={`${category.count - category.available} / ${category.count}`} />
        </Col>
      </Row>  
    </Card>
  )
}

export default CategoryItem
