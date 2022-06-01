import React, { useState, useEffect } from 'react'
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
  Spin
} from 'antd'
import {
  AppstoreOutlined,
  UnorderedListOutlined,
  PlusOutlined,
  HeartFilled
} from '@ant-design/icons'
import NumberFormat from 'react-number-format'
import Flex from 'components/shared-components/Flex'
import AvatarStatus from 'components/shared-components/AvatarStatus'

const VIEW_LIST = 'LIST'
const VIEW_GRID = 'GRID'

const ItemHeader = ({ name }) => (
  <Tooltip title={name} key={`avatar-${name}`}>
    <div className="d-flex">
      <AvatarStatus
        size={18}
        type="circle"
        src={'/img/icons/ens-144x144.png'}
        name={name}
      />
    </div>
  </Tooltip>
)

const ItemInfo = ({ price, statusColor }) => (
  <Flex alignItems="center">
    <Tag
      className={statusColor === 'none' ? 'bg-gray-lightest' : ''}
      color={statusColor !== 'none' ? statusColor : ''}
      style={{ margin: '0px', fontSize: '14px' }}
    >
      <Image
        height={13}
        src={'/img/icons/ethereum-icon-28.png'}
        name={'price'}
      />
      <NumberFormat
        displayType={'text'}
        value={(Math.round(price * 100) / 100).toFixed(2)}
        prefix={''}
        thousandSeparator={true}
        className="ml-2 font-weight-semibold"
      />
    </Tag>
  </Flex>
)

const ItemMember = ({ data }) => (
  <>
    <Tooltip title={'Buy on OpenSea'} key={`avatar-opensea`}>
      <Avatar
        size={20}
        className={`ml-1 cursor-pointer`}
        src={'/img/icons/opensea-disabled.png'}
        style={{ backgroundColor: 'gray' }}
      />
    </Tooltip>
    <Tooltip title={'Add to Watchlist'} key={`avatar-watchlist`}>
      <Avatar
        size={20}
        className={`ml-1 cursor-pointer`}
        src={<HeartFilled style={{ color: '#808080' }} />}
      />
    </Tooltip>
  </>
)

const EthCard = ({ data ,...props }) => (
  <Card {...props}>
    <Flex alignItems="center" justifyContent="between">
      <ItemHeader name={`${data.name}.eth`} />
      <ItemInfo
        price={`${data.startingPrice_decimal / Math.pow(10, 18)}`}
        statusColor={'orange'}
      />
    </Flex>
    <div className="mt-2 text-right">
      <ItemMember eth={data} />
    </div>
  </Card>
)

export default EthCard
