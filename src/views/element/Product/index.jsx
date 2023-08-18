// react 依赖
import React, { useEffect, useMemo, useState, useImperativeHandle } from 'react'
import _ from 'lodash'
import { Tabs } from 'antd'

import { OpenLink, Image, Container } from '@components'

// 引入样式
import './index.scss'

const Product = (props, ref) => {
	const { config } = props
	const [activeTabKey, setActiveTabKey] = useState(config.tabList.activeTabKey)

	useImperativeHandle(ref, () => props)

	useEffect(() => {
		setActiveTabKey(config.tabList.activeTabKey)
	}, [config])

	const tabList = useMemo(() => {
		return config.tabList.list.map((item, index) => {
			return {
				...item,
				key: index,
			}
		})
	}, [config])

	return (
		<Container {...props}>
			<div className="box-content product-box">
				<div className="swiperWrap">
					<Tabs key={activeTabKey} tabList={tabList} activeKey={activeTabKey} onChange={key => setActiveTabKey(key)}>
						{_.map(tabList, (x, i) => {
							return (
								<div key={i}>
									<div>
										<OpenLink data={x.src} type={'img'} classify={'tabList'} name={'src'} index={i} edit={true}>
											<Image src={x.src.url} alt="" />
										</OpenLink>
									</div>
									<div>
										<OpenLink data={x.title} type={'text'} classify={'tabList'} index={i} name={'title'} edit={true}>
											<div dangerouslySetInnerHTML={{ __html: x.title.text }}></div>
										</OpenLink>
										<OpenLink data={x.desc} type={'text'} classify={'tabList'} index={i} name={'desc'} edit={true}>
											<div dangerouslySetInnerHTML={{ __html: x.desc.text }}></div>
										</OpenLink>
										<OpenLink data={x.text} type={'text'} classify={'tabList'} index={i} name={'text'} edit={true}>
											<div dangerouslySetInnerHTML={{ __html: x.text.text }}></div>
										</OpenLink>
									</div>
								</div>
							)
						})}
					</Tabs>
				</div>
			</div>
		</Container>
	)
}

Product.config = {
	title: {
		text: '一体化方案赋能机构高效运营',
		link: null,
		style: {},
		show: true,
	},
	subtitle: {
		text: '改变传统资管行业单体系统的构建逻辑，为基金管理人提供一站式前中后台云解决方案满足管理人交易、风控、组合管理、运营管理、合规、信息披露、投资者服务等一些列的业务场景，交易、运营的效率可达90%以上',
		link: null,
		style: {},
		show: true,
	},
	footerButtonText: {
		text: '查看详情',
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
			backgroundColor: '',
			backgroundImage: '',
		},
		appendData: {
			name: '投资交易',
			src: {
				url: '/static/images/product/01.png',
				size: ['', ''],
				align: '',
				link: null,
				style: {
					width: 756,
					height: 460,
				},
			},
			title: {
				text: 'AMS投资交易系统',
				link: null,
				style: {},
			},
			desc: {
				text: '从分散到集中',
				link: null,
				style: {},
			},
			text: {
				text: '全品种支持 多券商接入 高性能执行',
				link: null,
				style: {},
			},
		},

		tabList: {
			activeTabKey: 0,
			list: [
				{
					name: '投资交易',
					src: {
						url: '/static/images/product/01.png',
						size: ['', ''],
						align: '',
						link: null,
						style: {
							width: 756,
							height: 460,
						},
					},
					title: {
						text: 'AMS投资交易系统',
						link: null,
						style: {},
					},
					desc: {
						text: '从分散到集中',
						link: null,
						style: {},
					},
					text: {
						text: '全品种支持 多券商接入 高性能执行',
						link: null,
						style: {},
					},
				},
				{
					name: '运营管理',
					src: {
						url: '/static/images/product/02.png',
						size: ['', ''],
						align: '',
						link: null,
						style: {
							width: 756,
							height: 460,
						},
					},
					title: {
						text: 'FAS运行管理系统',
						link: null,
						style: {},
					},

					desc: {
						text: '助力管理人提升效能、降低风险，创造价值',
						link: null,
						style: {},
					},
					text: {
						text: '采用专业会计估值方法，结合全面的辅助数据，可以做到实时准确估值，支持不同维度的数据报表自动生成，自定义报表内容和样式，用时还提供估值核对服务，帮助机构提升效率，避免损失。',
						link: null,
						style: {},
					},
				},
				{
					name: '营销&服务',
					src: {
						url: '/static/images/product/03.png',
						size: ['', ''],
						align: '',
						link: null,
						style: {
							width: 756,
							height: 460,
						},
					},
					title: {
						text: '管理系统',
						link: null,
						style: {},
					},

					desc: {
						text: '助力管理人提升品牌、完善信被，优化营销管理、投资者服务',
						link: null,
						style: {},
					},
					text: {
						text: '系统支持快速搭建官网，模板丰富，操作简单，且包含了投资者服务功能，数据可自动获取，降低门户搭建难度同时大幅提升日常市场运营效率。市场部可以通过系统进行营销管理和投资者服务，支持定向推送消息，给特定客户展示对应的营销内容。',
						link: null,
						style: {},
					},
				},
				{
					name: '风控管理',
					src: {
						url: '/static/images/product/04.png',
						size: ['', ''],
						align: '',
						link: null,
						style: {
							width: 756,
							height: 460,
						},
					},
					title: {
						text: '风控管理系统',
						link: null,
						style: {},
					},

					desc: {
						text: '实现跨券商多产品联合统一风控，降低风控难度',
						link: null,
						style: {},
					},
					text: {
						text: '使用可以将多券商产品联合进行统一风控管理，支持自定义风控点，灵活配置风控指标，且支持盘中实时预警。全面支持机构风控需求。',
						link: null,
						style: {},
					},
				},
			],
		},
	},
}

Product.NAME = 'Product'

Product.TYPE = 'component'

Product.NAMECN = '轮播-图文标签切换'

Product.thumbnail = '/static/images/product/thumbnail.png'

export default React.forwardRef(Product)
