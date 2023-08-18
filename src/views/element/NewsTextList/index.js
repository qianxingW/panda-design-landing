// react 依赖
import React, { useEffect, useMemo, useState, useImperativeHandle, useContext } from 'react'
import { useSelector } from 'react-redux'

import Settings from './Settings'
import { pidConvertTree, openLink, getBackground } from '@/utils/index'
import { OpenLink, Container } from '../..'

// 引入API
import { hpIvstDisclosureArticleSelectList } from '@/request/request'
// 环境判断
import PageContext from '@/utils/pageContext'
// 获取 institutionCode
import AppContext from '@/utils/appContext'
import { getStorage } from '@/utils/storage'

const NewsTextList = (props, ref) => {
	const appContext = useContext(AppContext)
	// 判断环境
	const pageContext = useContext(PageContext)
	// 获取 institutionCode
	const institutionCode = pageContext.type == 'website' ? appContext.institutionCode : getStorage('institutionCode')

	const { config, defaultList, query, openLink } = props
	const [list, setList] = useState([])

	useImperativeHandle(ref, () => props)
	useEffect(() => {
		if (query.artTypeList.length <= 0 && pageContext.type == 'edit') {
			setList(defaultList)
			return
		}
		query.institutionCode = institutionCode //公司编码
		userType: getStorage('userInfo') ? getStorage('userInfo').userType : 0, //用户类型
			(query.artCustomizedTypeLists = query.artTypeList)
		hpIvstDisclosureArticleSelectList(query).then(res => {
			res.data.result.map((item, index) => {
				item.time = `${item.artDate.toString().slice(0, 4)}-${item.artDate.toString().slice(4, 6)}-${item.artDate.toString().slice(6, 8)}`
			})
			setList(res.data.result)
		})
	}, [query.artTypeList])

	return (
		<Container {...props} style={getBackground(config)}>
			<div className="newsTextList">
				<div className="newsTextList-box">
					{list.map((item, index) => {
						if (index > 12) return null
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
									<em>{item.title || item.artTitle}</em>
									<span>{item.time}</span>
									<a>&gt;</a>
								</div>
							</OpenLink>
						)
					})}
				</div>
			</div>
		</Container>
	)
}

NewsTextList.config = {
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
			time: '2021-06-01',
			artTitle: '标题',
			outline: '副标题',
		},
		{
			time: '2021-07-01',
			artTitle: '标题',
			outline: '副标题',
		},
		{
			time: '2021-08-01',
			artTitle: '标题',
			outline: '副标题',
		},
		{
			time: '2021-09-01',
			artTitle: '标题',
			outline: '副标题',
		},
		{
			time: '2021-09-01',
			artTitle: '标题',
			outline: '副标题',
		},
		{
			time: '2021-09-02',
			artTitle: '标题',
			outline: '副标题',
		},
		{
			time: '2021-09-03',
			artTitle: '标题',
			outline: '副标题',
		},
		{
			time: '2021-09-04',
			artTitle: '标题',
			outline: '副标题',
		},
		{
			time: '2021-09-05',
			artTitle: '标题',
			outline: '副标题',
		},
		{
			time: '2021-09-06',
			artTitle: '标题',
			outline: '副标题',
		},
		{
			time: '2021-09-07',
			artTitle: '标题',
			outline: '副标题',
		},
		{
			time: '2021-09-08',
			artTitle: '标题',
			outline: '副标题',
		},
	],
}

NewsTextList.Settings = Settings

NewsTextList.NAME = 'NewsTextList'

NewsTextList.TYPE = 'component'

NewsTextList.NAMECN = '新闻资讯动态-列表(无图)'

NewsTextList.thumbnail = '/static/images/newsTextList/thumbnail.png'

export default React.forwardRef(NewsTextList)
