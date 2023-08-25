import React, { useImperativeHandle } from 'react'

import Settings from './Settings'
import { OpenLink, ImagePic, Container } from '@components'

import './index.scss'

const Card = (props, ref) => {
	const { config } = props

	useImperativeHandle(ref, () => props)

	return (
		<Container {...props}>
			<div className="Card">
				<div className="CardIn">
					<div className="center">
						{config.list.map((item, index) => {
							return (
								<div className="box" key={index}>
									<div className="boxIn">
										<div className="box-top">
											<OpenLink data={item.title} type={'text'} classify={'list'} name={'title'} index={index} edit={true}>
												<h4 dangerouslySetInnerHTML={{ __html: item.title.text }}></h4>
											</OpenLink>
											<OpenLink data={item.descript} type={'text'} classify={'list'} name={'descript'} index={index} edit={true}>
												<div
													className="content-text"
													dangerouslySetInnerHTML={{
														__html: item.descript.text,
													}}
												></div>
											</OpenLink>
										</div>
										<div className="box-bot">
											<OpenLink data={item.img} type={'img'} classify={'list'} name={'img'} index={index} edit={true}>
												<ImagePic alt={index} src={item.img.url} />
											</OpenLink>
										</div>
										<div className="box-bot-hover">
											<OpenLink data={item.hover}>
												<div dangerouslySetInnerHTML={{ __html: item.hover.text }}></div>
											</OpenLink>
										</div>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</Container>
	)
}

Card.config = {
	title: {
		text: '标题',
		link: null,
		style: {},
	},
	subtitle: {
		text: '我是副标题',
		link: null,
		style: {},
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
			header: true,
			footer: true,
		},
		style: {
			backgroundColor: '#fff',
			backgroundImage: '',
		},
		appendData: {
			img: {
				url: '/static/images/card/4.png',
				size: ['', ''],
				align: '',
				link: null,
				style: {
					width: 240,
					height: 175,
				},
			},
			title: {
				text: '标题',
				link: null,
				style: {},
			},
			descript: {
				text: '我是副标题',
				link: null,
				style: {},
			},
			hover: {
				text: '专属客户服务1',
				link: null,
				style: {},
			},
		},
		list: [
			{
				img: {
					url: '/static/images/card/4.png',
					size: ['', ''],
					align: '',
					link: null,
					style: {
						width: 240,
						height: 175,
					},
				},
				title: {
					text: '标题',
					link: null,
					style: {},
				},
				descript: {
					text: '我是副标题',
					link: null,
					style: {},
				},
				hover: {
					text: '专属客户服务1',
					link: null,
					style: {},
				},
			},
			{
				img: {
					url: '/static/images/card/4.png',
					size: ['', ''],
					align: '',
					link: null,
					style: {
						width: 240,
						height: 175,
					},
				},
				title: {
					text: '标题',
					link: null,
					style: {},
				},
				descript: {
					text: '我是副标题',
					link: null,
					style: {},
				},
				hover: {
					text: '专属客户服务1',
					link: null,
					style: {},
				},
			},
			{
				img: {
					url: '/static/images/card/4.png',
					size: ['', ''],
					align: '',
					link: null,
					style: {
						width: 240,
						height: 175,
					},
				},
				title: {
					text: '标题',
					link: null,
					style: {},
				},
				descript: {
					text: '我是副标题',
					link: null,
					style: {},
				},
				hover: {
					text: '专属客户服务1',
					link: null,
					style: {},
				},
			},
			{
				img: {
					url: '/static/images/card/4.png',
					size: ['', ''],
					align: '',
					link: null,
					style: {
						width: 240,
						height: 175,
					},
				},
				title: {
					text: '标题',
					link: null,
					style: {},
				},
				descript: {
					text: '我是副标题',
					link: null,
					style: {},
				},
				hover: {
					text: '专属客户服务1',
					link: null,
					style: {},
				},
			},
		],
	},
}

Card.Settings = Settings

Card.NAME = 'Card'

Card.TYPE = 'component'

Card.NAMECN = '卡片-hover显示文字'

Card.thumbnail = '/static/images/card/thumbnail.png'

export default React.forwardRef(Card)
