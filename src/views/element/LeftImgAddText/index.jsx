// react 依赖
import React, {  useImperativeHandle } from 'react'

import {  getBackground } from '@utils'

import { OpenLink, Image } from '@components'

// 引入样式
import './index.scss'

// 左文右图-对半分、右边大
const LeftImgAddText = (props, ref) => {
	const { half, img, title, subtitle, descript, config } = props

	useImperativeHandle(ref, () => props)

	return (
		<div className="leftImgAddText" style={getBackground(config)}>
			<div className="leftImgAddTextIn">
				<div className="text">
					<OpenLink data={title} type={'text'} name={'title'} edit={true}>
						<h2 dangerouslySetInnerHTML={{ __html: title.text }}></h2>
					</OpenLink>
					<OpenLink data={subtitle} type={'text'} name={'subtitle'} edit={true}>
						<h3 dangerouslySetInnerHTML={{ __html: subtitle.text }}></h3>
					</OpenLink>
					<OpenLink data={descript} type={'text'} name={'descript'} edit={true}>
						<div className="content-text" dangerouslySetInnerHTML={{ __html: descript.text }}></div>
					</OpenLink>
				</div>
				<div className={`${half ? 'imgS' : 'imgB'}`}>
					<OpenLink data={img} type={'img'} name={'img'} edit={true}>
						<Image alt="" src={img.url} />
					</OpenLink>
				</div>
			</div>
		</div>
	)
}

LeftImgAddText.Settings = null

LeftImgAddText.config = {
	half: false, //图文对半分、不对半分
	img: {
		url: '/static/images/leftImgAddText/3.png',
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
	descript: {
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
	config: {
		size: ['', ''],
		style: {
			backgroundColor: '',
			backgroundImage: '',
		},
	},
}

LeftImgAddText.NAME = 'LeftImgAddText'

LeftImgAddText.TYPE = 'component'

LeftImgAddText.NAMECN = '左文右图(配置化)'

LeftImgAddText.thumbnail = '/static/images/leftImgAddText/thumbnail.png'

export default React.forwardRef(LeftImgAddText)
