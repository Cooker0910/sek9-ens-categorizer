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
import { apiGetCategoryById } from 'api/rest/category'
import { apiGetEthereums } from 'api/rest/ethereum'

function SingleCategory({
  match: {
    params: { category: searchTerm }
  }
}) {
  const history = useHistory()
  const [eths, setEths] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(24)
  const [category, setCategory] = useState({ name: '' })
  // const [eths, setEths] = useState([])

  const handleChangePage = value => {
    setCurrentPage(value)
  }
  const handleSizeChange = (current, pageSize) => {
    setCurrentPage(current)
    setPageSize(pageSize)
  }
  const currentDomains = eths.filter(
    (_, index) =>
      index >= (currentPage - 1) * pageSize && index < currentPage * pageSize
  )

  useEffect(() => {
    if (searchTerm) {
      setLoading(true)
      // FirebaseService.getEthereums(searchTerm, 0, '', setEthereums)
      getCategory(searchTerm)
      getEthereums(searchTerm)
    }
  }, [searchTerm])

  const getCategory = async category_id => {
    const res = await apiGetCategoryById(category_id, {
      per_page: 1000
    })
    if (res && !res.error) {
      setCategory(res)
    }
  }

  const getEthereums = async category_id => {
    const res = await apiGetEthereums({
      per_page: 1000,
      category_id: category_id
    })
    if (res && !res.error) {
      setEths(res.dataset)
    }
    setLoading(false)
  }

  return (
    <>
      <Typography.Title style={{ textAlign: 'center', color: '#FFF' }}>
        {category.name}
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
            total={eths.length}
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
