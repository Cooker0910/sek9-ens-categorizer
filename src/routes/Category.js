import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from '@emotion/styled/macro'
import DomainItem from '../components/DomainItem/DomainItem'
import mq from '../mediaQuery'

import { H2 as DefaultH2 } from '../components/Typography/Basic'
import LargeHeart from '../components/Icons/LargeHeart'
import FirebaseService from 'services/FirebaseService'
// import {apiGetCategories} from 'api/category'
import {
  NonMainPageBannerContainer,
  DAOBannerContent
} from '../components/Banner/DAOBanner'
import CategoryItem from 'components/CategoryItem'
import { Row, Col } from 'antd'

const NoDomainsContainer = styled('div')`
  display: flex;
  padding: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  box-shadow: 3px 4px 6px 0 rgba(229, 236, 241, 0.3);
  border-radius: 6px;
  margin-bottom: 40px;

  h2 {
    color: #adbbcd;
    font-weight: 100;
    margin-bottom: 0;
    padding: 0;
    margin-top: 20px;
    text-align: center;
    max-width: 500px;
  }

  p {
    color: #2b2b2b;
    font-size: 18px;
    font-weight: 300;
    margin-top: 20px;
    line-height: 1.3em;
    text-align: center;
    max-width: 400px;
  }
`

const H2 = styled(DefaultH2)`
  margin-top: 50px;
  margin-left: 20px;
  ${mq.medium`
    margin-left: 0;
  `}
`

const NoDomains = () => {
  const { t } = useTranslation()
  return (
    <NoDomainsContainer>
      <LargeHeart />
      <h2>{t('category.noCategories.title')}</h2>
      <p>{t('category.noCategories.text')}</p>
    </NoDomainsContainer>
  )
}

function Category() {
  const { t } = useTranslation()
  useEffect(() => {
    document.title = 'ENS Category'
  }, [])

  const [categories, setCategories] = useState([])

  useEffect(() => {
		// showCategoryLoading();
    FirebaseService.getCategories(setCategories)
  }, [])

  if (!categories || categories.length === 0 ) {
    return (
      <CategoryContainer data-testid="favourites-container">
        <H2>{t('category.categoryTitle')}</H2>
        <NoDomains>
          <LargeHeart />
          <h2>{t('category.noCategories.title')}</h2>
          <p>{t('category.noCategories.text')}</p>
        </NoDomains>
      </CategoryContainer>
    )
  }

  return (
    <CategoryContainer data-testid="favourites-container">
      <NonMainPageBannerContainer>
        <DAOBannerContent />
      </NonMainPageBannerContainer>
      <H2>{t('category.categoryTitle')}</H2>
      <Row>
      {categories && categories.length>0 &&
        categories.map(category => 
          <Col span={8}>
            <CategoryItem category={category} />
          </Col>
      )}
      </Row>
    </CategoryContainer>
  )
}

const CategoryContainer = styled('div')`
  padding-bottom: 60px;
`

export default Category
