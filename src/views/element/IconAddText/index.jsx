import React, { useImperativeHandle } from 'react'

import { OpenLink, Image, Container } from '@components'

// 引入样式
import './index.scss'

// 图标加文本组件
const IconAddText = (props, ref) => {
	const { config } = props

	useImperativeHandle(ref, () => props)

	return (
		<Container {...props}>
			<div className="iconAddText">
				<div className="iconAddTextIn">
					<div className="center">
						{config.list &&
							config.list.map((item, index) => {
								return (
									<div className="box" key={index}>
										<div className="icon">
											<OpenLink data={item.img} type={'img'} classify={'list'} name={'img'} index={index} edit={true}>
												<Image alt={index} src={item.img.url} />
											</OpenLink>
										</div>
										<OpenLink data={item.title} type={'text'} name={'title'} edit={true} classify={'list'} index={index}>
											<h4 dangerouslySetInnerHTML={{ __html: item.title.text }}></h4>
										</OpenLink>
										<div className="text-descipt">
											<OpenLink data={item.content} type={'text'} name={'content'} edit={true} classify={'list'} index={index}>
												<div
													dangerouslySetInnerHTML={{
														__html: item.content.text,
													}}
												></div>
											</OpenLink>
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

IconAddText.config = {
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
				url: '/static/images/iconAddText/4.png',
				size: ['', ''],
				align: '',
				link: null,
				style: {
					width: 40,
					height: 40,
				},
			},
			title: {
				text: '标题',
				link: null,
				style: {},
			},
			content: {
				text: '套用模型省时省力，不用冥思苦想',
				link: null,
				style: {},
			},
		},
		list: [
			{
				img: {
					url: '/static/images/iconAddText/4.png',
					size: ['', ''],
					align: '',
					link: null,
					style: {
						width: 40,
						height: 40,
					},
				},
				title: {
					text: '标题',
					link: null,
					style: {},
				},
				content: {
					text: '套用模型省时省力，不用冥思苦想',
					link: null,
					style: {},
				},
			},
			{
				img: {
					url: '/static/images/iconAddText/4.png',
					size: ['', ''],
					align: '',
					link: null,
					style: {
						width: 40,
						height: 40,
					},
				},
				title: {
					text: '标题',
					link: null,
					style: {},
				},
				content: {
					text: '套用模型省时省力，不用冥思苦想，但是，每一个需要设计的内容和体系应该是迥然不同的',
					link: null,
					style: {},
				},
			},
			{
				img: {
					url: '/static/images/iconAddText/4.png',
					size: ['', ''],
					align: '',
					link: null,
					style: {
						width: 40,
						height: 40,
					},
				},
				title: {
					text: '标题',
					link: null,
					style: {},
				},
				content: {
					text: '套用模型省时省力，不用冥思苦想，但是，每一个需要设计的内容和体系应该是迥然不同的，所以每一个设计方案也都应该是不可复制的',
					link: null,
					style: {},
				},
			},
			{
				img: {
					url: '/static/images/iconAddText/4.png',
					size: ['', ''],
					align: '',
					link: null,
					style: {
						width: 40,
						height: 40,
					},
				},
				title: {
					text: '标题',
					link: null,
					style: {},
				},
				content: {
					text: '套用模型省时省力，不用冥思苦想，但是，每一个需要设计的内容和体系应该是迥然不同的，所以每一个设计方案也都应该是不可复制的',
					link: null,
					style: {},
				},
			},
			{
				img: {
					url: '/static/images/iconAddText/4.png',
					size: ['', ''],
					align: '',
					link: null,
					style: {
						width: 40,
						height: 40,
					},
				},
				title: {
					text: '标题',
					link: null,
					style: {},
				},
				content: {
					text: '套用模型省时省力，不用冥思苦想，但是，每一个需要设计的内容和体系应该是迥然不同的，所以每一个设计方案也都应该是不可复制的',
					link: null,
					style: {},
				},
			},
			{
				img: {
					url: '/static/images/iconAddText/4.png',
					size: ['', ''],
					align: '',
					link: null,
					style: {
						width: 40,
						height: 40,
					},
				},
				title: {
					text: '标题',
					link: null,
					style: {},
				},
				content: {
					text: '套用模型省时省力，不用冥思苦想，但是，每一个需要设计的内容和体系应该是迥然不同的，所以每一个设计方案也都应该是不可复制不可复制不可复制不可复制不可复制不可复制的',
					link: null,
					style: {},
				},
			},
		],
	},
}

IconAddText.NAME = 'IconAddText'

IconAddText.TYPE = 'component'

IconAddText.NAMECN = '卡片-图标文本组合'

IconAddText.thumbnail = '/static/images/iconAddText/thumbnail.png'

export default React.forwardRef(IconAddText)
