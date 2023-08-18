import React, { useImperativeHandle } from 'react'

import { OpenLink, Image, Container } from '@components'

import './index.scss'

const BotImgAddTitle = (props, ref) => {
	const { img } = props
	useImperativeHandle(ref, () => props)

	return (
		<Container {...props}>
			<div className="BotImgAddTitle-bot">
				<OpenLink data={img} type={'img'} name={'img'} edit={true}>
					<Image alt="" src={img.url} />
				</OpenLink>
			</div>
		</Container>
	)
}

BotImgAddTitle.config = {
	img: {
		url: '/static/images/botImgAddTitle/5.png',
		size: ['', ''],
		align: '',
		link: null,
		style: {},
		show: true,
	},
	title: {
		text: '大标题',
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
			backgroundColor: '',
			backgroundImage: '',
		},
	},
}

BotImgAddTitle.NAME = 'BotImgAddTitle'

BotImgAddTitle.TYPE = 'component'

BotImgAddTitle.NAMECN = '单图'

BotImgAddTitle.thumbnail = '/static/images/botImgAddTitle/thumbnail.png'

export default React.forwardRef(BotImgAddTitle)
