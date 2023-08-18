// react 依赖
import React, { useImperativeHandle } from 'react'
import {
  DownOutlined,
} from '@ant-design/icons';

import { getBackground } from '@utils'
import { OpenLink } from '@components'

// 引入样式
import './index.scss'

const Banner = (props, ref) => {
	const { title, descript, footerButtonText, config } = props

	useImperativeHandle(ref, () => props)

	return (
		<div className="banner">
			<OpenLink data={title} type={'text'} name={'title'} edit={true}>
				<div className="banner-title" dangerouslySetInnerHTML={{ __html: title.text }}></div>
			</OpenLink>
			<OpenLink data={descript} type={'text'} name={'descript'} edit={true}>
				<div className="banner-descript" dangerouslySetInnerHTML={{ __html: descript.text }}></div>
			</OpenLink>
			<OpenLink data={footerButtonText} type={'button'} name={'footerButtonText'} edit={true}>
				<div className="banner-buttonText" dangerouslySetInnerHTML={{ __html: footerButtonText.text }}></div>
			</OpenLink>
			<div className="banner-down">
				<DownOutlined />
			</div>
			<div className="banner-img" style={getBackground(config)}></div>
		</div>
	)
}

Banner.config = {
	img: {
		url: '/static/images/banner/banner_1.png',
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
		text: '机构提供一体化结局方案，解决营销募资、投资交易、运营管理、投资人服务、风险控制等方面的问题和需求，助力机构快速成长。',
		link: null,
		style: {},
		show: true,
	},
	footerButtonText: {
		text: '预约路演',
		link: null,
		style: {},
		defaultStyle: {},
		hoverStyle: {},
		type: 'primary',
		show: true,
	},
	config: {
		size: ['', ''],
		style: {
			backgroundColor: '#fff',
			backgroundImage: '/static/images/banner/banner_1.png',
		},
	},
}

Banner.NAME = 'Banner'

Banner.TYPE = 'component'

Banner.NAMECN = '全屏'

Banner.thumbnail = '/static/images/banner/thumbnail.png'

export default React.forwardRef(Banner)
