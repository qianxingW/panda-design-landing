// react 依赖
import React, { useEffect, useMemo, useState, useImperativeHandle, useContext } from 'react'
import { useSelector } from 'react-redux'

import Settings from './Settings'
import { pidConvertTree, openLink, getBackground } from '@/utils/index'
import { OpenLink, Image, Container } from '../..'

// 引入API
import { hpIvstDisclosureArticleSelectList } from '@/request/request'
// 环境判断
import PageContext from '@/utils/pageContext'
// 获取 institutionCode
import AppContext from '@/utils/appContext'
import { getStorage } from '@/utils/storage'

const NewsList = (props, ref) => {
	const appContext = useContext(AppContext)
	// 判断环境
	const pageContext = useContext(PageContext)
	// 获取 institutionCode
	const institutionCode = pageContext.type == 'website' ? appContext.institutionCode : getStorage('institutionCode')

	// 登录信息
	// const userType = useSelector(state => state.userType) || 0

	const { config, defaultList, query, openLink } = props
	const [list, setList] = useState([])

	useImperativeHandle(ref, () => props)
	useEffect(() => {
		if (query.artTypeList.length <= 0 && pageContext.type == 'edit') {
			setList(defaultList)
			return
		}
		query.institutionCode = institutionCode //公司编码
		;(query.userType = getStorage('userInfo') ? getStorage('userInfo').userType : 0), //用户类型
			(query.artCustomizedTypeLists = query.artTypeList)
		hpIvstDisclosureArticleSelectList(query).then(res => {
			res.data.result.map((item, index) => {
				res.data.result[0].src = res.data.result[0].filePath && res.data.result[0].filePath != '[]' ? JSON.parse(res.data.result[0].filePath)[0].fileUrl : ''
				item.month = item.artDate.toString().slice(0, 4)
				item.year = `${item.artDate.toString().slice(4, 6)}-${item.artDate.toString().slice(6, 8)}`
			})
			setList(res.data.result)
		})
	}, [query.artTypeList])

	return (
		<Container {...props} style={getBackground(config)}>
			<div className="newsList">
				<div className="newsList-box">
					<div className="newsList_main ">
						{list[0] && (
							<OpenLink
								data={{
									link: {
										type: 'page',
										data: {
											page: openLink.url,
											pageType: 1,
											search: {
												newsId: list[0].primaryNum,
												artTypeList: query.artTypeList,
											},
										},
									},
								}}
							>
								<div className="main_left">
									<div className="top">
										<div className="left">
											<span>{list[0].month}</span>
											<span>{list[0].year}</span>
										</div>
										<div className="right">
											<h4>
												{list[0].artTitle || list[0].title}
												<a>→</a>
											</h4>
											<h5>{list[0].outline || list[0].memo || list[0].title}</h5>
										</div>
									</div>
									<div className="bot">
										<Image src={list[0].src} alt="" />
									</div>
								</div>
							</OpenLink>
						)}
						<div className="main_right">
							{list.map((item, index) => {
								if (index === 0 || index > 3) return null
								return (
									<OpenLink
										data={{
											link: {
												type: 'page',
												data: {
													page: openLink.url,
													pageType: 1,
													search: {
														newsId: item.primaryNum,
														artTypeList: query.artTypeList,
													},
												},
											},
										}}
										key={index}
									>
										<div className="box">
											<div className="left">
												<span>{item.month}</span>
												<span>{item.year}</span>
											</div>
											<div className="right">
												<h4>
													{item.artTitle || item.title}
													<a>→</a>
												</h4>
												<h5>{item.outline || item.memo || item.title}</h5>
											</div>
										</div>
									</OpenLink>
								)
							})}
						</div>
					</div>
				</div>
			</div>
		</Container>
	)
}

NewsList.config = {
	title: {
		text: '新闻资讯模板列表',
		link: null,
		style: {},
		show: true,
	},
	subtitle: {
		text: '副标题',
		link: null,
		style: {},
		show: true,
	},
	footerButtonText: {
		text: 'MORE',
		link: null,
		style: {},
		show: true, // 是否展示按钮
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
	query: {
		artTypeList: [],
		isEnable: 1,
	},
	openLink: {
		url: null,
	},
	defaultList: [
		{
			src: '/static/images/newsList/news3.png',
			year: '2021',
			month: '06-01',
			artTitle: '标题',
			outline: '副标题',
		},
		{
			src: '',
			year: '2021',
			month: '07-01',
			artTitle: '标题',
			outline: '副标题',
		},
		{
			src: '',
			year: '2021',
			month: '08-01',
			artTitle: '标题',
			outline: '副标题',
		},
		{
			src: '',
			year: '2021',
			month: '09-01',
			artTitle: '标题',
			outline: '副标题',
		},
	],
}

NewsList.Settings = Settings

NewsList.NAME = 'NewsList'

NewsList.TYPE = 'component'

NewsList.NAMECN = '新闻资讯动态-列表'

NewsList.thumbnail = '/static/images/newsList/thumbnail.png'

export default React.forwardRef(NewsList)
