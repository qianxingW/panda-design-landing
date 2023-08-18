// react 依赖
import React, { useImperativeHandle } from 'react'

import _ from 'lodash'
import { Grid } from 'antd'

// 引入组件
import Settings from './Settings'
import { OpenLink, Image, Container } from '@components'

import './index.scss'

const { Row, Col } = Grid

const EnterprisePartner = (props, ref) => {
	const { config } = props
	useImperativeHandle(ref, () => props)
	return (
		<Container {...props}>
			<div className="enterprisepartner">
				<div className="box-content">
					<div className="box-body">
						<Row gutter={[50, 50]}>
							{_.map(config.list, (x, i) => {
								return (
									<Col span={4} key={i}>
										<div className="pic">
											<OpenLink data={x.img} type={'img'} classify={'list'} name={'img'} index={i} edit={true}>
												<Image alt={i} src={x.img.url} />
											</OpenLink>
										</div>
									</Col>
								)
							})}
						</Row>
					</div>
				</div>
			</div>
		</Container>
	)
}

EnterprisePartner.config = {
	title: {
		text: '企业合作伙伴',
		link: null,
		style: {},
		show: true,
	},
	subtitle: {
		text: '我是副标题',
		link: null,
		style: {},
		show: true,
	},
	footerButtonText: {
		text: 'MORE',
		link: null,
		style: {},
		defaultStyle: {},
		hoverStyle: {},
		type: 'primary',
		show: true,
	},
	config: {
		size: ['', ''],
		layout: {
			header: true,
			footer: true,
		},
		style: {
			backgroundColor: '#fff',
			backgroundImage: '',
		},
		appendData: {
			name: '1',
			img: {
				url: '/static/images/enterprisePartner/logo.png',
				size: ['', ''],
				align: '',
				link: null,
				style: {
					width: 165,
					height: 80,
				},
			},
		},
		list: [
			{
				name: '1',
				img: {
					url: '/static/images/enterprisePartner/logo.png',
					size: ['', ''],
					align: '',
					link: null,
					style: {
						width: 165,
						height: 80,
					},
				},
			},
			{
				name: '2',
				img: {
					url: '/static/images/enterprisePartner/logo.png',
					size: ['', ''],
					align: '',
					link: null,
					style: {
						width: 165,
						height: 80,
					},
				},
			},
			{
				name: '3',
				img: {
					url: '/static/images/enterprisePartner/logo.png',
					size: ['', ''],
					align: '',
					link: null,
					style: {
						width: 165,
						height: 80,
					},
				},
			},
			{
				name: '4',
				img: {
					url: '/static/images/enterprisePartner/logo.png',
					size: ['', ''],
					align: '',
					link: null,
					style: {
						width: 165,
						height: 80,
					},
				},
			},
			{
				name: '5',
				img: {
					url: '/static/images/enterprisePartner/logo.png',
					size: ['', ''],
					align: '',
					link: null,
					style: {
						width: 165,
						height: 80,
					},
				},
			},
			{
				name: '6',
				img: {
					url: '/static/images/enterprisePartner/logo.png',
					size: ['', ''],
					align: '',
					link: null,
					style: {
						width: 165,
						height: 80,
					},
				},
			},
			{
				name: '7',
				img: {
					url: '/static/images/enterprisePartner/logo.png',
					size: ['', ''],
					align: '',
					link: null,
					style: {
						width: 165,
						height: 80,
					},
				},
			},
			{
				name: '8',
				img: {
					url: '/static/images/enterprisePartner/logo.png',
					size: ['', ''],
					align: '',
					link: null,
					style: {
						width: 165,
						height: 80,
					},
				},
			},
			{
				name: '9',
				img: {
					url: '/static/images/enterprisePartner/logo.png',
					size: ['', ''],
					align: '',
					link: null,
					style: {
						width: 165,
						height: 80,
					},
				},
			},
			{
				name: '10',
				img: {
					url: '/static/images/enterprisePartner/logo.png',
					size: ['', ''],
					align: '',
					link: null,
					style: {
						width: 165,
						height: 80,
					},
				},
			},
			{
				name: '11',
				img: {
					url: '/static/images/enterprisePartner/logo.png',
					size: ['', ''],
					align: '',
					link: null,
					style: {
						width: 165,
						height: 80,
					},
				},
			},
			{
				name: '12',
				img: {
					url: '/static/images/enterprisePartner/logo.png',
					size: ['', ''],
					align: '',
					link: null,
					style: {
						width: 165,
						height: 80,
					},
				},
			},
			{
				name: '13',
				img: {
					url: '/static/images/enterprisePartner/logo.png',
					size: ['', ''],
					align: '',
					link: null,
					style: {
						width: 165,
						height: 80,
					},
				},
			},
			{
				name: '14',
				img: {
					url: '/static/images/enterprisePartner/logo.png',
					size: ['', ''],
					align: '',
					link: null,
					style: {
						width: 165,
						height: 80,
					},
				},
			},
			{
				name: '15',
				img: {
					url: '/static/images/enterprisePartner/logo.png',
					size: ['', ''],
					align: '',
					link: null,
					style: {
						width: 165,
						height: 80,
					},
				},
			},
			{
				name: '16',
				img: {
					url: '/static/images/enterprisePartner/logo.png',
					size: ['', ''],
					align: '',
					link: null,
					style: {
						width: 165,
						height: 80,
					},
				},
			},
			{
				name: '17',
				img: {
					url: '/static/images/enterprisePartner/logo.png',
					size: ['', ''],
					align: '',
					link: null,
					style: {
						width: 165,
						height: 80,
					},
				},
			},
			{
				name: '18',
				img: {
					url: '/static/images/enterprisePartner/logo.png',
					size: ['', ''],
					align: '',
					link: null,
					style: {
						width: 165,
						height: 80,
					},
				},
			},
		],
	},
}

EnterprisePartner.Settings = Settings

EnterprisePartner.NAME = 'EnterprisePartner'

EnterprisePartner.TYPE = 'component'

EnterprisePartner.NAMECN = '合作伙伴'

EnterprisePartner.thumbnail = '/static/images/enterprisePartner/thumbnail.png'

export default React.forwardRef(EnterprisePartner)
