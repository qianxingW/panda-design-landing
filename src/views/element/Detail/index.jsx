// react 依赖
import React, { useImperativeHandle } from 'react'

import { getBackground } from '@utils'

import { OpenLink, ImagePic } from '@components'

// 引入样式
import './index.scss';

const Detail = (props, ref) => {
	const { img, name, describe, title, content, config } = props

	useImperativeHandle(ref, () => props)

	return (
		<div className="detailWrap" style={getBackground(config)} >
			<div className="detailWrapIn">
				<div className="detailWrapIn-pic">
					<OpenLink data={img} type={'img'} name={'img'} edit={true}>
						<ImagePic src={img.url} alt="" />
					</OpenLink>
				</div>
				<div className="right">
					<OpenLink data={name} type={'text'} name={'name'} edit={true}>
						<h3 className="name" dangerouslySetInnerHTML={{ __html: name.text }}></h3>
					</OpenLink>
					<OpenLink data={describe} type={'text'} name={'describe'} edit={true}>
						<h5 dangerouslySetInnerHTML={{ __html: describe.text }}></h5>
					</OpenLink>
					<hr />
					<OpenLink data={title} type={'text'} name={'title'} edit={true}>
						<h6 dangerouslySetInnerHTML={{ __html: title.text }}></h6>
					</OpenLink>
					<OpenLink data={content} type={'text'} name={'content'} edit={true}>
						<div data-edit={true} className="content-text" dangerouslySetInnerHTML={{ __html: content.text }}></div>
					</OpenLink>
				</div>
			</div>
		</div>
	)
}

Detail.config = {
	img: {
		url: '/static/images/detail/4.png',
		link: null,
		style: {
			width: 240,
			height: 240,
		},
		size: ['', ''],
		align: '',
		show: true,
	},
	name: {
		text: '刁苑雅',
		link: null,
		style: {},
		show: true,
	},
	describe: {
		text: '投资总监',
		link: null,
		style: {},
		show: true,
	},
	title: {
		text: '基本信息介绍',
		link: null,
		style: {},
		show: true,
	},
	content: {
		text: `
        中欧国际工商管理学院EMBA，清华大学工学硕士，16年证券从业经历。 历任海通证券研究所分析师，
        汇添富基金管理有限公司分析师、基金经理、投资副总监。连续荣获“2012年度股票型金牛基金奖”、
        “2013年度股票型金牛基金奖”、“2014年度股票型金牛基金奖”；“上海证报三年期股票型金基金奖”（2014）；
        “上海证报第九届金阳光三年卓越基金经理奖”（2018），“第五届中国基金业英华奖-基金三年期最佳投资经理奖”
        （2018），“Wind最强公司（五年期）”（2019）。 2014年创办巨杉（上海）资产管理有限公司。
        秉持“正直、谦虚、精进、求真”的价值观，“为持有人服务和创造价值”的使命，力争为客户创造持久稳定的回报。
        力求成长为有责任、有格局，有担当、有坚守，有核心竞争力的资产管理公司。`,
		link: null,
		style: {},
		show: true,
	},
	config: {
		size: ['', ''],
		style: {
			backgroundColor: '',
			backgroundImage: '',
		},
	},
}

Detail.NAME = 'Detail'

Detail.TYPE = 'component'

Detail.NAMECN = '团队介绍-单人'

Detail.thumbnail = '/static/images/detail/thumbnail.png'

export default React.forwardRef(Detail)
