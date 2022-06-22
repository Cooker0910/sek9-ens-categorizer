import React, { useState, useEffect } from 'react'
import FirebaseService from 'services/FirebaseService'
import { useHistory } from 'react-router-dom'
import { Row, Col, Pagination, Spin, Typography } from 'antd'
import EthCard from 'components/EthCard'
import { apiGetCategoryById } from 'api/rest/category'
import { apiGetEthereums } from 'api/rest/ethereum'
import { DEFAUT_PAGINATION } from 'configs/ui'

function SingleCategory({
  match: {
    params: { category: searchTerm }
  }
}) {
  const history = useHistory()
  const [eths, setEths] = useState([])
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState({ name: '' })
  const [paginating, setPaginating] = useState(false)
  const [pagination, setPagination] = useState(DEFAUT_PAGINATION)

  const handleChangePage = (current_page, per_page) => {
    setPaginating(true)
    setPagination({ ...pagination, current_page, per_page })
  }

  useEffect(() => {
    paginating && getEthereums(searchTerm)
    setPaginating(false)
  }, [paginating, pagination])

  useEffect(() => {
    if (searchTerm) {
      setLoading(true)
      // FirebaseService.getEthereums(searchTerm, 0, '', setEthereums)
      getCategory(searchTerm)
      getEthereums(searchTerm)
    }
  }, [searchTerm])

  const getCategory = async category_id => {
    const res = await apiGetCategoryById(category_id)
    if (res && !res.error) {
      setCategory(res)
    }
  }

  const getEthereums = async category_id => {
    setLoading(true)
    const res = await apiGetEthereums({
      per_page: pagination.per_page,
      page_no: pagination.current_page,
      category_id: category_id
    })
    if (res && !res.error) {
      setEths(res.dataset)
      setPagination(res.pagination)
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
            {eths &&
              eths.length > 0 &&
              eths.map(elm => (
                <Col span={6} key={elm.id}>
                  <EthCard
                    data={elm}
                    hoverable
                    onClick={() => history.push(`/name/${elm.eth_name}`)}
                  />
                </Col>
              ))}
          </Row>
          <Pagination
            defaultCurrent={1}
            total={Number(pagination.total_count)}
            current={Number(pagination.current_page)}
            pageSize={Number(pagination.per_page)}
            showSizeChanger
            defaultPageSize={24}
            pageSizeOptions={[16, 20, 24]}
            onChange={handleChangePage}
          />
        </>
      )}
    </>
  )
}

export default SingleCategory
