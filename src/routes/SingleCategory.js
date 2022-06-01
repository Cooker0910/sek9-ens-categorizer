import React, { useState, useEffect } from 'react'
import FirebaseService from 'services/FirebaseService'
import {useHistory} from 'react-router-dom'
import {
  Radio,
  Button,
  Row,
  Col,
  Tooltip,
  Tag,
  Avatar,
  Card,
  Image,
  Spin,
  Typography
} from 'antd'
import EthCard from 'components/EthCard'

function SingleCategory({
  match: {
    params: { category: searchTerm }
  },
}) {
  const history=useHistory();
  const [domains, setDomains] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (searchTerm) {
      setLoading(true)
      FirebaseService.getEthereums(searchTerm, 0, 5, setEthereums)
    }
  }, [searchTerm])

  const setEthereums = data => {
    setLoading(false)
    console.log('ata===', data)
    setDomains(data)
  }

  return <div>
    <Typography.Title>{searchTerm}</Typography.Title>
    {loading ? 
          <Spin />:
    <Row gutter={16}>
            {domains.map(elm => (
              <Col xs={24} sm={24} lg={8} xl={8} xxl={6} key={elm.id}>
                <EthCard data={elm} hoverable onClick={()=>history.push(`/name/${elm.name}.eth`)} />
              </Col>
            ))}
    </Row>
}
  </div>

}

export default SingleCategory
