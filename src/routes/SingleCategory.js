import React, { useState, useEffect } from 'react'
import FirebaseService from 'services/FirebaseService'
import { useHistory } from 'react-router-dom'
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
  Pagination,
  Spin,
  Typography
} from 'antd'
import EthCard from 'components/EthCard'

function SingleCategory({
  match: {
    params: { category: searchTerm }
  }
}) {
  const history = useHistory()
  const [domains, setDomains] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(24)

  const handleChangePage = value => {
    setCurrentPage(value)
  }
  const handleSizeChange = (current, pageSize) => {
    setCurrentPage(current)
    setPageSize(pageSize)
  }
  const currentDomains = domains.filter(
    (_, index) =>
      index >= (currentPage - 1) * pageSize && index < currentPage * pageSize
  )

  useEffect(() => {
    if (searchTerm) {
      setLoading(true)
      FirebaseService.getEthereums(searchTerm, 0, '', setEthereums)
    }
  }, [searchTerm])

  const setEthereums = data => {
    setLoading(false)
    setDomains(data)
  }

  return (
    <>
      <Typography.Title style={{ textAlign: 'center', color: '#FFF' }}>
        {searchTerm}
      </Typography.Title>
      {loading ? (
        <Spin
          style={{ margin: 'auto', width: '100%' }}
          size="large"
          className="white-spin"
        />
      ) : (
        <>
          <Row gutter={16}>
            {currentDomains.map(elm => (
              <Col span={6} key={elm.id}>
                <EthCard
                  data={elm}
                  hoverable
                  onClick={() => history.push(`/name/${elm.name}.eth`)}
                />
              </Col>
            ))}
          </Row>
          <Pagination
            defaultCurrent={1}
            total={domains.length}
            current={currentPage}
            pageSize={pageSize}
            showSizeChanger
            defaultPageSize={24}
            pageSizeOptions={[15, 18, 24]}
            onShowSizeChange={handleSizeChange}
            onChange={handleChangePage}
          />
        </>
      )}
    </>
  )
}

export default SingleCategory
