import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled/macro'
import { motion } from 'framer-motion'
import FirebaseService from 'services/FirebaseService'
import { useTranslation } from 'react-i18next'
import { Row, Col, Card, List, Avatar, Layout, Menu, Button } from 'antd'
import mq from '../mediaQuery'

import SearchInput from '../components/SearchName/SearchInput'
import Search from '../components/SearchName/Search'
import NoAccountsDefault from '../components/NoAccounts/NoAccountsModal'
import bg from '../assets/heroBG.jpg'
import TextBubbleDefault from '../components/Icons/TextBubble'
import QuestionMarkDefault from '../components/Icons/QuestionMark'
import HowToUseDefault from '../components/HowToUse/HowToUse'
import ENSLogo from '../components/HomePage/images/sek9-white-logo.png'
import { aboutPageURL } from '../utils/utils'
import { connectProvider, disconnectProvider } from '../utils/providerUtils'
import { gql } from '@apollo/client'
import {
  MainPageBannerContainer,
  DAOBannerContent
} from '../components/Banner/DAOBanner'
import EthCard from 'components/EthCard'

const HeroTop = styled(Layout.Header)`
  padding: 20px;
  position: fixed;
`

const NoAccounts = styled(NoAccountsDefault)``

const Network = styled('div')`
  margin-bottom: 5px;
`
const Name = styled('span')`
  margin-left: 5px;
  text-transform: none;
  display: inline-block;
  width: 100px;
`

const NetworkStatus = styled('div')`
  color: white;
  font-weight: 200;
  text-transform: capitalize;
  margin-bottom: 20px;
  display: none;
  ${mq.small`
    display: block;
  `}
  ${mq.medium`
    left: 40px;
  `}

  &:before {
    position: absolute;
    right: 100%;
    top: 50%;
    transform: translate(-5px, -50%);
    content: '';
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #fff;
  }
`

const Nav = styled('nav')`
  display: flex;
  margin-left: 20px;
  justify-content: center;
  ${mq.small`
    justify-content: flex-end;
  `}
  a {
    font-weight: 300;
    color: white;
  }
`

const NavLink = styled(Link)`
  margin-left: 20px;
  &:first-child {
    margin-left: 0;
  }
`

const ExternalLink = styled('a')`
  margin-left: 20px;
  &:first-child {
    margin-left: 0;
  }
`

const Announcement = styled('div')`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: #5284ff;
  padding: 0 10px;
  border-bottom: #5284ff solid 3px;
  h3 {
    color: white;
    font-weight: 400;
    text-align: center;
    padding: 0 20px;
    margin-bottom: 10px;
  }
  p {
    text-align: center;
    color: white;
  }
  a {
    color: white;
    text-decoration: none;
  }
`

const HowToUse = styled(HowToUseDefault)`
  padding: 70px;
`

const Hero = styled(Layout)`
  background: url(${bg});
  background-size: cover;
  min-height: 100vh !important;
  background-attachment: fixed;
`

const Content = styled(Layout.Content)`
  margin: 0 auto 0;
  display: flex;
  flex-direction: column;
  min-width: 100%;
  ${mq.medium`
    min-width: auto;
    max-width: 90%;
  `}
  > h2 {
    color: white;
    font-size: 38px;
    font-weight: 100;
    margin-bottom: 10px;
  }

  > h3 {
    color: white;
    font-weight: 100;
    font-size: 24px;
    margin-top: 0;
  }
`

// const Search = styled(SearchDefault)`
//   min-width: 250;
//   ${mq.medium`
//     min-width: 150px;
//   `}

//   input {
//     width: 100%;
//     border-radius: 0px;
//     padding: 5px 0 5px 25px;
//     ${mq.medium`
//       border-radius: 6px 0 0 6px;
//       font-size: 14px;
//     `}
//   }

//   &:before {
//     content: '';
//     position: absolute;
//     left: 5px;
//     width: 15px;
//     height: 15px;
//   }

//   button {
//     border-radius: 0 6px 6px 0;
//     height: auto;
//   }
// `

const Explanation = styled('div')`
  display: grid;
  width: 100%;

  grid-template-columns: 1fr;
  grid-template-rows: auto;
  ${mq.medium`
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
  `}
  grid-gap: 0;
`

const H2 = styled('h2')`
  font-size: 30px;
  font-weight: 500;
`

const Section = styled('section')`
  display: flex;
  justify-content: center;
  align-items: center;
`

const WhatItIs = styled(Section)`
  padding: 40px 20px 80px;
  p {
    font-size: 18px;
  }
`

const HowItWorks = styled(Section)`
  background: #f0f6fa;
  padding: 40px 20px 80px;
`

const Inner = styled('div')`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 350px;

  > p {
    font-weight: 300;
    font-size: 20px;
    margin-bottom: 1.5em;
  }
`
const NameAnimation = styled(Section)`
  display: block;
  height: 100%;
`

const TextBubble = styled(TextBubbleDefault)`
  margin-right: 10px;
`

const QuestionMark = styled(QuestionMarkDefault)`
  transform: scale(1.18);
  margin-right: 10px;
`

const LogoLarge = styled(motion.img)`
  width: 200px;
  object-fit: cover;
  ${mq.medium`
    width: 150px;
  `}
`

const PermanentRegistrarLogo = styled(motion.h1)`
  font-family: Overpass;
  font-weight: 800;
  font-size: 18px;
  text-transform: uppercase;
  color: #4258d3;
  letter-spacing: 1.8px;
  text-align: right;
  line-height: 24px;
  margin-top: 10px;
  margin-bottom: 50px;
  text-align: center;
`

const ReadOnly = styled('span')`
  margin-left: 1em;
`

export const HOME_DATA = gql`
  query getHomeData($address: string) @client {
    network
    displayName(address: $address)
    isReadOnly
    isSafeApp
  }
`

export const GET_ACCOUNT = gql`
  query getAccounts @client {
    accounts
  }
`

const animation = {
  initial: {
    scale: 0,
    opacity: 0
  },
  animate: {
    opacity: 1,
    scale: 1
  }
}

const MAIN_CATEGORIES = [
  {
    key: 'general',
    label: 'General'
  },
  {
    key: 'art/culture',
    label: 'Art/Culture'
  },
  {
    key: 'geography/places',
    label: 'Geography/Places'
  },
  {
    key: 'history',
    label: 'History'
  },
  {
    key: 'math',
    label: 'Math'
  },
  {
    key: 'science',
    label: 'Science'
  },
  {
    key: 'people',
    label: 'People'
  },
  {
    key: 'Religion',
    label: 'Religion'
  },
  {
    key: 'society',
    label: 'Society'
  },
  {
    key: 'technology',
    label: 'Technology'
  },
  {
    key: 'misc',
    label: 'Misc'
  }
]
export default ({ match, history }) => {
  const { url } = match
  const { t } = useTranslation()
  const [categories, setCategories] = useState([])
  const [allCategories, setAllCategories] = useState([])
  const [mainCaegories, setMainCategories] = useState(MAIN_CATEGORIES)
  const [eths, setETHs] = useState([])

  const {
    data: { accounts }
  } = useQuery(GET_ACCOUNT)

  const {
    data: { network, displayName, isReadOnly, isSafeApp }
  } = useQuery(HOME_DATA, {
    variables: { address: accounts?.[0] }
  })

  useEffect(() => {
    // showCategoryLoading();
    FirebaseService.getCategories(setAllCategories)
    FirebaseService.getCategories(setCategories, 'createdAt')
  }, [])

  useEffect(() => {
    const CATGORIES = MAIN_CATEGORIES.map((cat, index) => {
      let children = allCategories.filter(
        (_, _index) => _index >= (index - 1) * 3 && _index < index * 3
      )
      children = children.map(ele => ({
        key: ele.name,
        label: ele.name
      }))
      return {
        ...cat,
        children
      }
    })

    setMainCategories(CATGORIES)
  }, [allCategories.length])

  const HEADER_MENUS = [
    {
      key: 'categories',
      label: t('c.category')
    },
    {
      key: 'favourites',
      label: t('c.category')
    },
    {
      key: 'aboutPageURL()',
      label: t('c.category')
    }
  ]

  const [current, setCurrent] = useState()
  const handleClickMenu = e => {
    console.log('click ', e.key)
    setCurrent(e.key)
    FirebaseService.getEthereums(e.key, 0, 24, setETHs)
  }

  const handleClickMore = () => {
    history.push(`/category/${current}`)
  }

  return (
    <Hero>
      <Layout.Header
        className="header"
        style={{ background: 'transparent', alignItems: 'center', height: 90 }}
      >
        <LogoLarge
          initial={animation.initial}
          animate={animation.animate}
          src={ENSLogo}
          alt="SEK9 logo"
        />
        <SearchInput />
        <Nav>
          {accounts?.length > 0 && !isReadOnly && (
            <NavLink
              active={url === '/address/' + accounts[0]}
              to={'/address/' + accounts[0]}
            >
              {t('c.mynames')}
            </NavLink>
          )}
          <NavLink to="/categories">{t('c.category')}</NavLink>
          <NavLink to="/favourites">{t('c.favourites')}</NavLink>
          <ExternalLink href={aboutPageURL()}>{t('c.about')}</ExternalLink>
        </Nav>
        {/* <MainPageBannerContainer>
          <DAOBannerContent />
        </MainPageBannerContainer> */}
      </Layout.Header>
      <Content style={{ padding: 20 }}>
        {/* <NetworkStatus>
          <Network>
            {`${network} ${t('c.network')}`}
            {isReadOnly && <ReadOnly>({t('c.readonly')})</ReadOnly>}
            {!isReadOnly && displayName && (
              <Name data-testid="display-name">({displayName})</Name>
            )}
          </Network>
          {!isSafeApp && (
            <NoAccounts
              onClick={isReadOnly ? connectProvider : disconnectProvider}
              buttonText={isReadOnly ? t('c.connect') : t('c.disconnect')}
            />
          )}
        </NetworkStatus> */}
        <Row gutter={16}>
          <Col span={6}>
            <Card title="Newest Categories" bordered={false}>
              <List
                itemLayout="horizontal"
                dataSource={categories}
                renderItem={category => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={category.imageUrl} />}
                      title={category.name}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              title="Most Viewed Categories - Last 24 hours"
              bordered={false}
            >
              <List
                itemLayout="horizontal"
                dataSource={categories}
                renderItem={category => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={category.imageUrl} />}
                      title={category.name}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              title="Most Viewed Categories - Last 24 hours"
              bordered={false}
            >
              <List
                itemLayout="horizontal"
                dataSource={categories}
                renderItem={category => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={category.imageUrl} />}
                      title={category.name}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              title="Most Purchased Categories - Last 24 hours"
              bordered={false}
            >
              <List
                itemLayout="horizontal"
                dataSource={categories}
                renderItem={category => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={category.imageUrl} />}
                      title={category.name}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
        <PermanentRegistrarLogo
          initial={animation.initial}
          animate={animation.animate}
        />
        <Search />
        <Menu mode="horizontal" style={{ marginTop: 20 }}>
          {mainCaegories.map(category => (
            <Menu.SubMenu key={category.key} title={category.label}>
              {category.children &&
                category.children.length > 0 &&
                category.children.map(ecat => (
                  <Menu.Item key={ecat.key} onClick={handleClickMenu}>
                    {ecat.label}
                  </Menu.Item>
                ))}
            </Menu.SubMenu>
          ))}
        </Menu>
        <Row gutter={16} style={{ marginTop: 20 }}>
          {eths &&
            eths.length > 0 &&
            eths.map(elm => (
              <Col xs={12} sm={12} lg={6} xl={6} xxl={6} key={elm.id}>
                <EthCard
                  data={elm}
                  hoverable
                  onClick={() => history.push(`/name/${elm.name}.eth`)}
                />
              </Col>
            ))}
        </Row>
        {eths.length > 0 && (
          <Button onClick={handleClickMore} style={{ alignSelf: 'center' }}>
            See more
          </Button>
        )}
      </Content>
    </Hero>
  )
}
