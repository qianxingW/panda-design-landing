// react 依赖
import React, { useImperativeHandle } from 'react'

// 引入工具类
import { getBackground } from '@utils'

// 引入组件
import { OpenLink } from '@components'

// 引入样式
import './index.scss'

const RecruitInfo = (props, ref) => {
	const { config } = props

	useImperativeHandle(ref, () => props)

	return (
		<div className="recruitInfo-body" style={getBackground(config)}>
			<div className="recruitInfo-con">
				{config.tabList.list &&
					config.tabList.list.map((item, index) => {
						return (
							<div className="recruitInfo-item" key={index}>
								<OpenLink data={item.title} type={'text'} classify={'tabList'} name={'title'} index={index} edit={true}>
									<h2 dangerouslySetInnerHTML={{ __html: item.title.text }}></h2>
								</OpenLink>
								<div className="recruit-interval"></div>
								<div className="recruit-outline">
									<div className="recruit-desc">
										<OpenLink data={item.recruitDescTitle} type={'text'} classify={'tabList'} name={'recruitDescTitle'} index={index} edit={true}>
											<h3
												dangerouslySetInnerHTML={{
													__html: item.recruitDescTitle.text,
												}}
											></h3>
										</OpenLink>
										<OpenLink data={item.recruitDescCon} type={'text'} classify={'tabList'} name={'recruitDescCon'} index={index} edit={true}>
											<div
												className="content-text"
												dangerouslySetInnerHTML={{
													__html: item.recruitDescCon.text,
												}}
											></div>
										</OpenLink>
									</div>
									<div className="recruit-ask">
										<OpenLink data={item.recruitAskTitle} type={'text'} classify={'tabList'} name={'recruitAskTitle'} index={index} edit={true}>
											<h3
												dangerouslySetInnerHTML={{
													__html: item.recruitAskTitle.text,
												}}
											></h3>
										</OpenLink>
										<OpenLink data={item.recruitAskCon} type={'text'} classify={'tabList'} name={'recruitAskCon'} index={index} edit={true}>
											<div
												className="content-text"
												dangerouslySetInnerHTML={{
													__html: item.recruitAskCon.text,
												}}
											></div>
										</OpenLink>
									</div>
								</div>
								<OpenLink data={item.footer} type={'text'} classify={'tabList'} name={'footer'} index={index} edit={true}>
									<div className="content-text" dangerouslySetInnerHTML={{ __html: item.footer.text }}></div>
								</OpenLink>
							</div>
						)
					})}
			</div>
		</div>
	)
}

RecruitInfo.config = {
	config: {
		size: ['', ''],
		style: {
			backgroundColor: '',
			backgroundImage: '',
		},
		appendData: {
			name: '岗位名称',
			title: {
				text: '岗位名称',
				link: null,
			},
			recruitDescTitle: {
				text: '职位描述',
				link: null,
			},
			recruitAskTitle: {
				text: '职位要求',
				link: null,
			},
			recruitDescCon: {
				text: '1. 我是职位描述内容我是职位描述内容我是职位描述内容我是职位描述内容',
				link: null,
			},
			recruitAskCon: {
				text: '2. 我是职位描述内容我是职位描述内容我是职位描述内容我是职位描述内容',
				link: null,
			},
			footer: {
				text: '简历投递至： hr@c.com',
				link: null,
			},
		},
		tabList: {
			activeTabKey: 0,
			list: [
				{
					name: '岗位名称',
					title: {
						text: '岗位名称',
						link: null,
					},
					recruitDescTitle: {
						text: '职位描述',
						link: null,
					},
					recruitAskTitle: {
						text: '职位要求',
						link: null,
					},
					recruitDescCon: {
						text: '1. 我是职位描述内容我是职位描述内容我是职位描述内容我是职位描述内容',
						link: null,
					},
					recruitAskCon: {
						text: '2. 我是职位描述内容我是职位描述内容我是职位描述内容我是职位描述内容',
						link: null,
					},
					footer: {
						text: '简历投体至： hr@c.com',
						link: null,
					},
				},
				{
					name: '岗位名称',
					title: {
						text: '岗位名称',
						link: null,
					},
					recruitDescTitle: {
						text: '职位描述',
						link: null,
					},
					recruitAskTitle: {
						text: '职位要求',
						link: null,
					},
					recruitDescCon: {
						text: '1. 我是职位描述内容我是职位描述内容我是职位描述内容我是职位描述内容',
						link: null,
					},
					recruitAskCon: {
						text: '2. 我是职位描述内容我是职位描述内容我是职位描述内容我是职位描述内容',
						link: null,
					},
					footer: {
						text: '简历投体至： hr@cr.com',
						link: null,
					},
				},
			],
		},
	},
}

RecruitInfo.NAME = 'RecruitInfo'

RecruitInfo.TYPE = 'component'

RecruitInfo.NAMECN = '招聘信息'

RecruitInfo.thumbnail = '/static/images/recruitInfo/thumbnail.png'

export default React.forwardRef(RecruitInfo)
