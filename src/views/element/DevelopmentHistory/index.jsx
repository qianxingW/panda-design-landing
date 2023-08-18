// react 依赖
import React, { useEffect, useMemo, useState, useImperativeHandle, useContext } from 'react'

import _ from 'lodash'

import { OpenLink, Container } from '@components'

import './index.scss'

const DevelopmentHistory = (props, ref) => {
	const { config } = props
	let length = _.size(config.tabList.list)
	let maxWidth = (10 - length) * 124
	const [activeTabKey, setActiveTabKey] = useState(0)
	const [positionRight, setPositionRight] = useState(0)
	useImperativeHandle(ref, () => props)
	const pageContext = useContext()
	const flag = useMemo(() => {
		return pageContext.type === 'preview' ? true : false
	}, [pageContext])
	useEffect(() => {
		if (flag) {
			setActiveTabKey(length - 1)
		} else {
			setActiveTabKey(config.tabList.activeTabKey)
		}
	}, [config])
	useEffect(() => {
		if (!flag) {
			let tabPositionRight = length - activeTabKey >= 10 ? -(length - activeTabKey - 10) * 124 : 0
			setPositionRight(tabPositionRight)
		}
	}, [activeTabKey])

	const tabList = useMemo(() => {
		return config.tabList.list.map((item, index) => {
			return {
				...item,
				key: index,
			}
		})
	}, [config])

	const scrollLeft = () => {
		if (length <= 10 || positionRight === maxWidth) return
		let rightPosition = positionRight - 124 * 5
		let scrollWidth = rightPosition <= maxWidth ? maxWidth : rightPosition
		setPositionRight(scrollWidth)
	}

	const scrollRight = () => {
		if (length <= 10 || positionRight === 0) return
		let rightPosition = positionRight + 124 * 5
		let scrollWidth = rightPosition >= 0 ? 0 : rightPosition
		setPositionRight(scrollWidth)
	}

	return (
		<Container {...props}>
			<div className="development-history">
				<div className="beside-box">
					<div className={`click-box left ${length <= 10 || positionRight === maxWidth ? 'forbidden' : ''}`} onClick={() => scrollLeft()}>
						←
					</div>
				</div>
				<div className="development-history-box">
					<div className="swiperWrap">
						<div className="major-events-header">
							<div className={`swiper-header ${length <= 10 ? 'not-fill' : 'fill-scroll'}`} style={{ right: positionRight }}>
								{_.map(tabList, (x, i) => {
									return (
										<div className={`major-events-tabs ${activeTabKey === i ? 'active' : 'normal'}`} key={i}>
											<div className="text" onClick={() => setActiveTabKey(i)}>
												{x.name}
											</div>
											<div className="speed-progress">
												<div className="line"></div>
												<div className="point" onClick={() => setActiveTabKey(i)}></div>
											</div>
										</div>
									)
								})}
							</div>
						</div>
						<div className="major-events-container">
							{_.map(tabList, (x, i) => {
								return (
									<div key={i} className={i === activeTabKey ? 'active' : 'hidden'}>
										<div>
											<OpenLink data={x.title} type={'text'} classify={'tabList'} index={i} name={'title'} edit={true}>
												<div dangerouslySetInnerHTML={{ __html: x.title.text }}></div>
											</OpenLink>
											<OpenLink data={x.desc} type={'text'} classify={'tabList'} index={i} name={'desc'} edit={true}>
												<div dangerouslySetInnerHTML={{ __html: x.desc.text }}></div>
											</OpenLink>
											<OpenLink data={x.text} type={'text'} classify={'tabList'} index={i} name={'text'} edit={true}>
												<div dangerouslySetInnerHTML={{ __html: x.text.text }}></div>
											</OpenLink>
											<OpenLink data={x.h4} type={'text'} classify={'tabList'} index={i} name={'h4'} edit={true}>
												<div dangerouslySetInnerHTML={{ __html: x.h4 ? x.h4.text : '' }}></div>
											</OpenLink>
											<OpenLink data={x.h5} type={'text'} classify={'tabList'} index={i} name={'h5'} edit={true}>
												<div dangerouslySetInnerHTML={{ __html: x.h5 ? x.h5.text : '' }}></div>
											</OpenLink>
											<OpenLink data={x.h6} type={'text'} classify={'tabList'} index={i} name={'h6'} edit={true}>
												<div dangerouslySetInnerHTML={{ __html: x.h6 ? x.h6.text : '' }}></div>
											</OpenLink>
										</div>
									</div>
								)
							})}
						</div>
					</div>
				</div>
				<div className="beside-box">
					<div className={`click-box right ${length <= 10 || positionRight === 0 ? 'forbidden' : ''}`} onClick={() => scrollRight()}>
						→
					</div>
				</div>
			</div>
		</Container>
	)
}

DevelopmentHistory.config = {
	title: {
		text: '发展历程',
		link: null,
		style: {},
		show: true,
	},
	subtitle: {
		text: 'Development path',
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
			backgroundColor: '#FFFFFF',
			backgroundImage: '',
		},
		appendData: {
			name: '2021',
			src: {
				url: '/static/images/developmentHistory/01.png',
				size: ['', ''],
				align: '',
				link: null,
			},
			title: {
				text: '2021一',
				link: null,
			},
			desc: {
				text: '2021二',
				link: null,
			},
			text: {
				text: '2021三',
				link: null,
			},
			h4: {
				text: '2021四',
				link: null,
			},
			h5: {
				text: '2021五',
				link: null,
			},
			h6: {
				text: '2021六',
				link: null,
			},
		},
		tabList: {
			activeTabKey: 3,
			list: [
				{
					name: '2019',
					src: {
						url: '/static/images/developmentHistory/01.png',
						size: ['', ''],
						align: '',
						link: null,
					},
					title: {
						text: '2019一',
						link: null,
					},
					desc: {
						text: '2019二',
						link: null,
					},
					text: {
						text: '2019三',
						link: null,
					},
					h4: {
						text: '2019四',
						link: null,
					},
					h5: {
						text: '2019五',
						link: null,
					},
					h6: {
						text: '2019六',
						link: null,
					},
				},
				{
					name: '2020',
					src: {
						url: '/static/images/developmentHistory/02.png',
						size: ['', ''],
						align: '',
						link: null,
					},
					title: {
						text: '2020一',
						link: null,
					},
					desc: {
						text: '2020二',
						link: null,
					},
					text: {
						text: '2020三',
						link: null,
					},
					h4: {
						text: '2020四',
						link: null,
					},
					h5: {
						text: '2020五',
						link: null,
					},
					h6: {
						text: '2020六',
						link: null,
					},
				},
				{
					name: '2021',
					src: {
						url: '/static/images/developmentHistory/03.png',
						size: ['', ''],
						align: '',
						link: null,
					},
					title: {
						text: '2021一',
						link: null,
					},
					desc: {
						text: '2021二',
						link: null,
					},
					text: {
						text: '2021三',
						link: null,
					},
					h4: {
						text: '2021四',
						link: null,
					},
					h5: {
						text: '2021五',
						link: null,
					},
					h6: {
						text: '2021六',
						link: null,
					},
				},
				{
					name: '2022',
					src: {
						url: '/static/images/developmentHistory/04.png',
						size: ['', ''],
						align: '',
						link: null,
					},
					title: {
						text: '2022一',
						link: null,
					},
					desc: {
						text: '2022二',
						link: null,
					},
					text: {
						text: '2022三',
						link: null,
					},
					h4: {
						text: '2022四',
						link: null,
					},
					h5: {
						text: '2022五',
						link: null,
					},
					h6: {
						text: '2022六',
						link: null,
					},
				},
			],
		},
	},
}

DevelopmentHistory.NAME = 'DevelopmentHistory'

DevelopmentHistory.TYPE = 'component'

DevelopmentHistory.NAMECN = '发展历程'

DevelopmentHistory.thumbnail = '/static/images/developmentHistory/thumbnail.png'

export default React.forwardRef(DevelopmentHistory)
