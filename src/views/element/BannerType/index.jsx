// react 依赖
import React, { useImperativeHandle } from 'react'

import {
  DownOutlined,
} from '@ant-design/icons';

import { getBackground } from '@utils'

import { OpenLink } from '@components'

// 引入样式
import './index.scss'

const BannerType = (props, ref) => {
	const { title, descript, config } = props

	useImperativeHandle(ref, () => props)

	return (
		<div className="banner">
			<div className="banner-img" style={getBackground(config)}></div>
			<OpenLink data={title} type={'text'} name={'title'} edit={true}>
				<div className="banner-title" dangerouslySetInnerHTML={{ __html: title.text }}></div>
			</OpenLink>
			<div className="banner-line"></div>
			<OpenLink data={descript} type={'text'} name={'descript'} edit={true}>
				<div className="banner-titleDec" dangerouslySetInnerHTML={{ __html: descript.text }}></div>
			</OpenLink>
			<div className="banner-down">
				<DownOutlined />
			</div>
		</div>
	)
}

BannerType.config = {
	img: {
		url: '/static/images/bannerType/banner_1.png',
		size: ['', ''],
		align: '',
		link: null,
		style: {},
		show: true,
	},
	title: {
		text: '一体化解决方案',
		link: null,
		style: {},
		show: true,
	},
	descript: {
		text: '融惟云为机构提供一体化结局方案。',
		link: null,
		style: {},
		show: true,
	},
	config: {
		size: ['', ''],
		style: {
			backgroundColor: '#fff',
			backgroundImage: '/static/images/bannerType/banner_1.png',
		},
	},
}

BannerType.NAME = 'BannerType'

BannerType.TYPE = 'component'

BannerType.NAMECN = '全屏模板2'

BannerType.thumbnail = '/static/images/bannerType/thumbnail.png'

export default React.forwardRef(BannerType)
