import React, { useImperativeHandle } from 'react'

// 引入工具类
import { getBackground } from '@utils'

import { OpenLink, Image, Button } from '@components'

// 引入样式
import './index.scss'

// 左文右图-右大尺寸图
const ImgAddTextSuperImg = (props, ref) => {
	const { img, title, subtitle, content, config, contentButtonText } = props

	useImperativeHandle(ref, () => props)

	return (
		<div className="imgAddTextSuperImg" style={getBackground(config)}>
			<div className="text">
				<OpenLink data={title} type={'text'} name={'title'} edit={true}>
					<h2 dangerouslySetInnerHTML={{ __html: title.text }}></h2>
				</OpenLink>
				<OpenLink data={subtitle} type={'text'} name={'subtitle'} edit={true}>
					<h3 dangerouslySetInnerHTML={{ __html: subtitle.text }}></h3>
				</OpenLink>
				<OpenLink data={content} type={'text'} name={'content'} edit={true}>
					<div className="content-text" dangerouslySetInnerHTML={{ __html: content.text }}></div>
				</OpenLink>
				<OpenLink data={contentButtonText} type={'button'} name={'contentButtonText'} edit={true}>
					<Button {...contentButtonText} htmlType="submit" />
				</OpenLink>
			</div>
			<div className="imgSuper">
				<OpenLink data={img} type={'img'} name={'img'} edit={true}>
					<Image alt="" src={img.url} />
				</OpenLink>
			</div>
		</div>
	)
}
ImgAddTextSuperImg.config = {
	half: false, //图文对半分、不对半分
	img: {
		url: '/static/images/imgAddTextSuperImg/3.png',
		size: ['', ''],
		align: '',
		link: null,
		style: {},
		show: true,
	},
	title: {
		text: '标题',
		link: null,
		style: {},
		show: true,
	},
	subtitle: {
		text: '副标题副标题',
		link: null,
		style: {},
		show: true,
	},
	content: {
		text: `助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风险，创造
        价值助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风险，
        创造价值助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风
        助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风险，创造
        价值助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风险，
        创造价值助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风
        助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风险，创造
        价值助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风险，
        创造价值助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风
        助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风险，创造
        价值助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风险，
        创造价值助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风
        助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风险，创造
        价值助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风险，
        创造价值助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风
        助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风险，创造
        价值助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风险，
        创造价值助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风`,
		link: null,
		style: {},
		show: true,
	},
	contentButtonText: {
		text: '申请试用',
		link: null,
		style: {},
		defaultStyle: {},
		hoverStyle: {},
		type: 'default',
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
		style: {
			backgroundColor: '',
			backgroundImage: '',
		},
	},
}

ImgAddTextSuperImg.NAME = 'ImgAddTextSuperImg'

ImgAddTextSuperImg.TYPE = 'component'

ImgAddTextSuperImg.NAMECN = '左文右图-右大尺寸图'

ImgAddTextSuperImg.thumbnail = '/static/images/imgAddTextSuperImg/thumbnail.png'

export default React.forwardRef(ImgAddTextSuperImg)
