import React, { useImperativeHandle, useState } from 'react'

import Settings from './Settings'
import { OpenLink, Image, CarouselSwiper, Container } from '@components'

// 引入样式
import './index.scss'

const Carousel = (props, ref) => {
	const { config } = props

	const [controlledSwiper,] = useState({})

	useImperativeHandle(ref, () => props)

	// const swiper = useRef()

	// useEffect(() => {
	// 	if (!swiper.current) return
	// 	swiper.current.slideTo(config.tabList.activeTabKey)
	// }, [config])

	return (
		<Container {...props}>
			<div className="carousel">
				<div className="swiperWrap">
					<CarouselSwiper
						controller={{
							control: controlledSwiper,
						}}
						// onSwiper={e => {
						// 	swiper.current = e
						// 	setControlledSwiper(e)
						// }}
						activeTabKey = {config.tabList.activeTabKey}

						data={config.tabList.list.map((item, index) => {
							return (
								<div className="slider slider1" key={index} >
									<div className="slider-top">
										<div className="left">
											<div className="left-pic">
												<OpenLink data={item.src} type={'img'} classify={'tabList'} index={index} name={'src'} edit={true}>
													<Image src={item.src.url} alt="" />
												</OpenLink>
											</div>
										</div>
										<div className="right">
											<OpenLink data={item.username} type={'text'} classify={'tabList'} index={index} name={'username'} edit={true}>
												<h4
													dangerouslySetInnerHTML={{
														__html: item.username.text,
													}}
												></h4>
											</OpenLink>
											<OpenLink data={item.text} type={'text'} classify={'tabList'} index={index} name={'title'} edit={true}>
												<div
													className="title"
													dangerouslySetInnerHTML={{
														__html: item.title.text,
													}}
												></div>
											</OpenLink>
										</div>
									</div>
									<OpenLink data={item.text} type={'text'} classify={'tabList'} index={index} name={'text'} edit={true}>
										<div className="slider-bot" dangerouslySetInnerHTML={{ __html: item.text.text }}></div>
									</OpenLink>
								</div>
							)
						})}
					></CarouselSwiper>
				</div>
			</div>
		</Container>
	)
}

Carousel.config = {
	type: 1,
	title: {
		text: '标题',
		link: null,
		style: {},
		show: true,
	},
	subtitle: {
		text: '内容内容',
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
			src: {
				url: '/static/images/carousel/logo.png',
				size: ['', ''],
				align: '',
				link: null,
				style: {
					width: 120,
					height: 48,
				},
			},
			name: '卡片一',
			username: {
				text: '常伟1',
				link: null,
				style: {},
			},
			title: {
				text: '巨杉资产 客户服务部 负责人',
				link: null,
				style: {},
			},
			text: {
				text: '“AMS交易系统提供全流程优化管理，基金经理可以通过系统进行精细化管理，丰富策略支持，提高策略组合交易效率，获得准确的执行结果评价，从而加强资金的合理配置，提升产品盈利水平”',
				link: null,
				style: {},
			},
		},
		tabList: {
			activeTabKey: 0,
			list: [
				{
					src: {
						url: '/static/images/carousel/logo.png',
						size: ['', ''],
						align: '',
						link: null,
						style: {
							width: 120,
							height: 48,
						},
					},
					name: '卡片一',
					username: {
						text: '常伟1',
						link: null,
						style: {},
					},
					title: {
						text: '巨杉资产 客户服务部 负责人',
						link: null,
						style: {},
					},
					text: {
						text: '“AMS交易系统提供全流程优化管理，基金经理可以通过系统进行精细化管理，丰富策略支持，提高策略组合交易效率，获得准确的执行结果评价，从而加强资金的合理配置，提升产品盈利水平”',
						link: null,
						style: {},
					},
				},
				{
					src: {
						url: '/static/images/carousel/logo.png',
						size: ['', ''],
						align: '',
						link: null,
						style: {
							width: 120,
							height: 48,
						},
					},
					name: '卡片二',
					username: {
						text: '常伟2',
						link: null,
						style: {},
					},
					title: {
						text: '巨杉资产 客户服务部 负责人',
						link: null,
						style: {},
					},
					text: {
						text: '“AMS交易系统提供全流程优化管理，基金经理可以通过系统进行精细化管理，丰富策略支持，提高策略组合交易效率，获得准确的执行结果评价，从而加强资金的合理配置，提升产品盈利水平”',
						link: null,
						style: {},
					},
				},
				{
					src: {
						url: '/static/images/carousel/logo.png',
						size: ['', ''],
						align: '',
						link: null,
						style: {
							width: 120,
							height: 48,
						},
					},
					name: '卡片三',
					username: {
						text: '常伟3',
						link: null,
						style: {},
					},
					title: {
						text: '巨杉资产 客户服务部 负责人',
						link: null,
						style: {},
					},
					text: {
						text: '“AMS交易系统提供全流程优化管理，基金经理可以通过系统进行精细化管理，丰富策略支持，提高策略组合交易效率，获得准确的执行结果评价，从而加强资金的合理配置，提升产品盈利水平”',
						link: null,
						style: {},
					},
				},
				{
					src: {
						url: '/static/images/carousel/logo.png',
						size: ['', ''],
						align: '',
						link: null,
						style: {
							width: 120,
							height: 48,
						},
					},
					name: '卡片四',
					username: {
						text: '常伟4',
						link: null,
						style: {},
					},
					title: {
						text: '巨杉资产 客户服务部 负责人',
						link: null,
						style: {},
					},
					text: {
						text: '“AMS交易系统提供全流程优化管理，基金经理可以通过系统进行精细化管理，丰富策略支持，提高策略组合交易效率，获得准确的执行结果评价，从而加强资金的合理配置，提升产品盈利水平”',
						link: null,
						style: {},
					},
				},
			],
		},
	},
}

Carousel.Settings = Settings

Carousel.NAME = 'Carousel'

Carousel.TYPE = 'component'

Carousel.NAMECN = '轮播-卡片'

Carousel.thumbnail = '/static/images/carousel/thumbnail.png'

export default React.forwardRef(Carousel)
