// react 依赖
import React, { useImperativeHandle } from 'react'

// 引入组件
import Settings from './Settings'
import { OpenLink, Image, Container } from '@components'

// 引入样式
import './index.scss'

const TeamIntroduction = (props, ref) => {
	const { config } = props

	useImperativeHandle(ref, () => props)

	return (
		<Container {...props}>
			<div className="TeamIntroduction">
				<div className="TeamIntroductionIn">
					<div className="center">
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
										<OpenLink data={item.descript} type={'text'} classify={'list'} name={'descript'} index={index} edit={true}>
											<div className="descript" dangerouslySetInnerHTML={{ __html: item.descript.text }}></div>
										</OpenLink>
										<div className="border"></div>
										<OpenLink data={item.content} type={'text'} classify={'list'} name={'content'} index={index} edit={true}>
											<div className="detail" dangerouslySetInnerHTML={{ __html: item.content.text }}></div>
										</OpenLink>
									</div>
								)
							})}
					</div>
				</div>
			</div>
		</Container>
	)
}

TeamIntroduction.config = {
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
			header: true,
			footer: true,
		},
		style: {
			backgroundColor: '',
			backgroundImage: '',
		},
		appendData: {
			img: {
				url: '/static/images/teamIntroduction/4.png',
				size: ['', ''],
				align: '',
				link: null,
				style: {
					width: 240,
					height: 240,
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
			content: {
				text: `套用模型省时省力，不用冥思苦想，但是，每一个需要设计的内容和体系应该是迥然不同的，
              所以每一个设计方案也都应该是不可复制的想想想想想想想1
              所以每一个设计方案也都应该是不可复制的想想想想想想想223
              所以每一个设计方案也都应该是不可复制的想想想想想想想3`,
				link: null,
				style: {},
			},
		},
		list: [
			{
				img: {
					url: '/static/images/teamIntroduction/4.png',
					size: ['', ''],
					align: '',
					link: null,
					style: {
						width: 240,
						height: 240,
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
				content: {
					text: `套用模型省时省力，不用冥思苦想，但是，每一个需要设计的内容和体系应该是迥然不同的，
                所以每一个设计方案也都应该是不可复制的想想想想想想想1
                所以每一个设计方案也都应该是不可复制的想想想想想想想223
                所以每一个设计方案也都应该是不可复制的想想想想想想想3`,
					link: null,
					style: {},
				},
			},
			{
				img: {
					url: '/static/images/teamIntroduction/4.png',
					size: ['', ''],
					align: '',
					link: null,
					style: {
						width: 240,
						height: 240,
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
				content: {
					text: `套用模型省时省力，不用冥思苦想，但是，每一个需要设计的内容和体系应该是迥然不同的，
                所以每一个设计方案也都应该是不可复制的想想想想想想想1
                所以每一个设计方案也都应该是不可复制的想想想想想想想223
                所以每一个设计方案也都应该是不可复制的想想想想想想想3`,
					link: null,
					style: {},
				},
			},
			{
				img: {
					url: '/static/images/teamIntroduction/4.png',
					size: ['', ''],
					align: '',
					link: null,
					style: {
						width: 240,
						height: 240,
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
				content: {
					text: `套用模型省时省力，不用冥思苦想，但是，每一个需要设计的内容和体系应该是迥然不同的，
                所以每一个设计方案也都应该是不可复制的想想想想想想想1
                所以每一个设计方案也都应该是不可复制的想想想想想想想223
                所以每一个设计方案也都应该是不可复制的想想想想想想想3`,
					link: null,
					style: {},
				},
			},
		],
	},
}

TeamIntroduction.Settings = Settings

TeamIntroduction.NAME = 'TeamIntroduction'

TeamIntroduction.TYPE = 'component'

TeamIntroduction.NAMECN = '团队介绍-多人'

TeamIntroduction.thumbnail = '/static/images/teamIntroduction/thumbnail.png'

export default React.forwardRef(TeamIntroduction)
