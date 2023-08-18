import React, { useImperativeHandle } from 'react'

import { OpenLink, Image, Container } from '@components'

// 引入样式
import './index.scss'

const Imgcard = (props, ref) => {
	const { config } = props

	useImperativeHandle(ref, () => props)
	return (
		<Container {...props}>
			<div className="imgCard-container-full">
				{config.list &&
					config.list.map((item, index) => {
						return (
							<div className="box" key={index}>
								<div className="img">
									<OpenLink data={item.img} type={'img'} classify={'list'} name={'img'} index={index} edit={true}>
										<Image alt={index} src={item.img.url} />
									</OpenLink>
								</div>
								<OpenLink data={item.title} type={'text'} classify={'list'} name={'title'} index={index} edit={true}>
									<div className="title" dangerouslySetInnerHTML={{ __html: item.title.text }}></div>
								</OpenLink>
								<OpenLink data={item.content} type={'text'} classify={'list'} name={'content'} index={index} edit={true}>
									<div className="detail" dangerouslySetInnerHTML={{ __html: item.content.text }}></div>
								</OpenLink>
							</div>
						)
					})}
			</div>
		</Container>
	)
}

Imgcard.config = {
	isTitle: true, // 是否显示标题
	title: {
		text: '我是大标题',
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
		appendData: {
			img: {
				url: '/static/images/imgCard/IMG-card.png',
				size: ['', ''],
				align: '',
				link: null,
				style: {
					width: 292,
					height: 208,
				},
			},
			title: {
				text: '我是标题',
				link: null,
				style: {},
			},
			content: {
				text: `我是副标题我是副标题`,
				link: null,
				style: {},
			},
		},
		list: [
			{
				img: {
					url: '/static/images/imgCard/IMG-card.png',
					size: ['', ''],
					align: '',
					link: null,
					style: {
						width: 292,
						height: 208,
					},
				},
				title: {
					text: '我是标题',
					link: null,
				},
				content: {
					text: '我是副标题我是副标题',
					link: null,
				},
			},
			{
				img: {
					url: '/static/images/imgCard/IMG-card.png',
					size: ['', ''],
					align: '',
					link: null,
					style: {
						width: 292,
						height: 208,
					},
				},
				title: {
					text: '我是标题',
					link: null,
				},
				content: {
					text: `我是副标题我是副标题`,
					link: null,
				},
			},
			{
				img: {
					url: '/static/images/imgCard/IMG-card.png',
					size: ['', ''],
					align: '',
					link: null,
					style: {
						width: 292,
						height: 208,
					},
				},
				title: {
					text: '我是标题',
					link: null,
				},
				content: {
					text: `我是副标题我是副标题`,
					link: null,
				},
			},
			{
				img: {
					url: '/static/images/imgCard/IMG-card.png',
					size: ['', ''],
					align: '',
					link: null,
					style: {
						width: 292,
						height: 208,
					},
				},
				title: {
					text: '我是标题',
					link: null,
				},
				content: {
					text: `我是副标题我是副标题`,
					link: null,
				},
			},
		],
	},
}

Imgcard.NAME = 'Imgcard'

Imgcard.TYPE = 'component'

Imgcard.NAMECN = '卡片-img'

Imgcard.thumbnail = '/static/images/imgCard/thumbnail.png'

export default React.forwardRef(Imgcard)
