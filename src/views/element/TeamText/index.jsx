import React, { useImperativeHandle } from 'react'

// 引入组件
import { OpenLink, Container } from '@components'

import './index.scss'

const TeamText = (props, ref) => {
	const { config } = props

	useImperativeHandle(ref, () => props)

	return (
		<Container {...props}>
			<div className="TeamText">
				<div className="TeamTextIn">
					{config.list &&
						config.list.map((item, index) => {
							return (
								<div className="box" key={index}>
									<OpenLink data={item.title} type={'text'} classify={'list'} name={'title'} index={index} edit={true}>
										<div className="title" dangerouslySetInnerHTML={{ __html: item.title.text }}></div>
									</OpenLink>
									<OpenLink data={item.descript} type={'text'} classify={'list'} name={'descript'} index={index} edit={true}>
										<div className="descript" dangerouslySetInnerHTML={{ __html: item.descript.text }}></div>
									</OpenLink>
									<div className="border"></div>
									<OpenLink data={item.content} type={'text'} classify={'list'} name={'content'} index={index} edit={true}>
										<div className="contents" dangerouslySetInnerHTML={{ __html: item.content.text }}></div>
									</OpenLink>
									<OpenLink data={item.detail} type={'text'} classify={'list'} name={'detail'} index={index} edit={true}>
										<div className="detail" dangerouslySetInnerHTML={{ __html: item.detail.text }}></div>
									</OpenLink>
								</div>
							)
						})}
				</div>
			</div>
		</Container>
	)
}

TeamText.config = {
	title: {
		text: '标题',
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
		text: '按钮',
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
			header: false,
			footer: false,
		},
		style: {
			backgroundColor: '',
			backgroundImage: '',
		},
		appendData: {
			name: '名字',
			title: {
				text: '名字',
				link: null,
				style: {},
			},
			descript: {
				text: '职位',
				link: null,
				style: {},
			},
			content: {
				text: `厦门大学 金融工程学硕士，超10年证券基金从业经验`,
				link: null,
				style: {},
			},
			detail: {
				text: `拥有10年A股和海外研究投资经验，历任太平洋资产管理有限公司交易员、兴业证券研究所资深策略研究员。现任千合资本投资经理兼策略研究员，同时负责金融行业研究等`,
				link: null,
				style: {},
			},
		},
		list: [
			{
				name: '名字',
				title: {
					text: '名字',
					link: null,
					style: {},
				},
				descript: {
					text: '职位',
					link: null,
					style: {},
				},
				content: {
					text: `复旦大学 经济学硕士，超10年证券基金从业经验。`,
					link: null,
					style: {},
				},
				detail: {
					text: `拥有10年A股和海外研究投资经验，历任太平洋资产管理有限公司交易员、兴业证券研究所资深策略研究员。现任千合资本投资经理兼策略研究员，同时负责金融行业研究等`,
					link: null,
					style: {},
				},
			},
			{
				name: '名字',
				title: {
					text: '名字',
					link: null,
					style: {},
				},
				descript: {
					text: '职位',
					link: null,
					style: {},
				},
				content: {
					text: `外交学院 经济学硕士，超10年证券基金从业经验`,
					link: null,
					style: {},
				},
				detail: {
					text: `。历任东兴证券机械、军工行业研究员、中金公司机械、装备制造高级研究员。现负责千合资本机械、汽车、军工、电力设备等行业研究`,
					link: null,
					style: {},
				},
			},
			{
				name: '名字',
				title: {
					text: '名字',
					link: null,
					style: {},
				},
				descript: {
					text: '职位',
					link: null,
					style: {},
				},
				content: {
					text: `厦门大学 金融工程学硕士，超10年证券基金从业经验`,
					link: null,
					style: {},
				},
				detail: {
					text: `。2011年加入华夏基金管理有限公司，历任华夏基金地产行业研究员、首席策略分析师，宏观策略金融研究小组组长。于2015年4月加入千合资本，担任千合紫荆系列产品投资经理助理，擅长行业比较和个股精选。现任千合资本投资经理`,
					link: null,
					style: {},
				},
			},
			{
				name: '名字',
				title: {
					text: '名字',
					link: null,
					style: {},
				},
				descript: {
					text: '职位',
					link: null,
					style: {},
				},
				content: {
					text: `清华大学 电子系博士，超9年证券基金从业经验`,
					link: null,
					style: {},
				},
				detail: {
					text: `。历任长盛基金研究员、基金经理助理、源乐晟投资、正和新融资产管理有限公司投资经理。现任千合资本投资经理，负责带领团队进行TMT深度研究，负责主动和量化相结合的策略开发`,
					link: null,
					style: {},
				},
			},
		],
	},
}

TeamText.NAME = 'TeamText'

TeamText.TYPE = 'component'

TeamText.NAMECN = '团队介绍-多人（无图）'

TeamText.thumbnail = '/static/images/teamText/thumbnail.png'

export default React.forwardRef(TeamText)
