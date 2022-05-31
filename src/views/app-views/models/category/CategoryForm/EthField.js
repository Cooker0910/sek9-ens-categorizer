import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Radio, Button, Row, Col, Tooltip, Tag, Avatar, Card, Image, Spin } from 'antd';
import { AppstoreOutlined, UnorderedListOutlined, PlusOutlined, HeartFilled } from '@ant-design/icons';
import NumberFormat from 'react-number-format';
import FirebaseService from 'services/FirebaseService';
import Flex from 'components/shared-components/Flex';
import AvatarStatus from 'components/shared-components/AvatarStatus';

const VIEW_LIST = 'LIST';
const VIEW_GRID = 'GRID';

const ItemHeader = ({name}) => (
	<Tooltip title={name} key={`avatar-${name}`}>
		<div className="d-flex">
			<AvatarStatus
				size={18}
				type="circle"
				src={"/img/icons/ens-144x144.png"}
				name={name}
			/>
		</div>
	</Tooltip>
)

const ItemInfo = ({price, statusColor}) => (
	<Flex alignItems="center">
		<Tag
			className={statusColor === "none"? 'bg-gray-lightest' : ''}
			color={statusColor !== "none"? statusColor : ''}
			style={{margin: "0px", fontSize: "14px"}}>
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

const ItemMember = ({data}) => (
	<>
		<Tooltip title={"Buy on OpenSea"} key={`avatar-opensea`}>
			<Avatar
				size={20}
				className={`ml-1 cursor-pointer`}
				src={"/img/icons/opensea-disabled.png"}
				style={{ backgroundColor: 'gray' }}>
			</Avatar>
		</Tooltip>
		<Tooltip title={"Add to Watchlist"} key={`avatar-watchlist`}>
			<Avatar
				size={20}
				className={`ml-1 cursor-pointer`}
				src={<HeartFilled style={{ color: '#808080' }}/>}>
			</Avatar>
		</Tooltip>
	</>
)

const ListItem = ({ data }) => (
	<div className="bg-white rounded p-3 mb-3 border">
		<Row align="middle">
    	<Col xs={24} sm={24} md={8}>
				<ItemHeader name={`${data.name}.eth`} category={`${data.startingPrice_decimal / Math.pow(10, 18)}`} />
			</Col>
			<Col xs={24} sm={24} md={6}>
				<ItemInfo 
					price={`${data.startingPrice_decimal / Math.pow(10, 18)}`}
					statusColor={"orange"}
				/>
			</Col>
			<Col xs={24} sm={24} md={5}>
			</Col>
			<Col xs={24} sm={24} md={3}>
			</Col>
			<Col xs={24} sm={24} md={2}>
				<div className="text-right">
					<ItemMember eth={data}/>
				</div>
			</Col>
		</Row>
	</div>
)

const GridItem = ({ data }) => (
	<Card>
		<Flex alignItems="center" justifyContent="between">
			<ItemHeader name={`${data.name}.eth`} />
			<ItemInfo 
				price={`${data.startingPrice_decimal / Math.pow(10, 18)}`}
				statusColor={"orange"}
			/>
		</Flex>
		<div className="mt-2 text-right">
			<ItemMember eth={data}/>
		</div>
	</Card>
)

const EthFeild = (props) => {

	const [view, setView] = useState(VIEW_GRID);
	const [list, setList] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (props.category) {
			setLoading(true);
			FirebaseService.getEthereums(props.category, 0, 5, setEthereums);
		}
	}, [props]);

	const setEthereums = (data) => {
		setLoading(false);
		setList(data);
	}
	const onChangeProjectView = e => {
		setView(e.target.value)
	}

	const	deleteItem = id =>{
		const data = list.filter(elm => elm.id !== id)
		setList(data)
	}

	return (
		<>
			<PageHeaderAlt className="border-bottom">
				<div className="container-fluid">
					<Flex justifyContent="between" alignItems="center" className="py-2">
						<h2>Domains</h2>
						<div>
							<Radio.Group defaultValue={VIEW_GRID} onChange={e => onChangeProjectView(e)}>
								<Radio.Button value={VIEW_GRID}><AppstoreOutlined /></Radio.Button>
								<Radio.Button value={VIEW_LIST}><UnorderedListOutlined /></Radio.Button>
							</Radio.Group>
							<Button type="primary" className="ml-2">
								<PlusOutlined />
								<span>New</span>
							</Button>
						</div>
					</Flex>
				</div>
			</PageHeaderAlt>
			<div className={`my-4 ${view === VIEW_LIST? 'container' : 'container-fluid'}`}>
				{
					loading ? (
						<Spin />
					) : (
					view === VIEW_LIST ?
					list.map(elm => <ListItem data={elm} key={elm.id}/>)
					:
					<Row gutter={16}>
						{list.map(elm => (
							<Col xs={24} sm={24} lg={8} xl={8} xxl={6} key={elm.id}>
								<GridItem data={elm} removeId={id => deleteItem(id)}/>
							</Col>
						))}
					</Row>
					)
				}
			</div>
		</>
	)
}

export default EthFeild
