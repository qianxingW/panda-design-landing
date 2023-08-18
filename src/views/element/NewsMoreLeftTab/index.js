// react 依赖
import React, { useEffect, useMemo, useState, useImperativeHandle, useRef, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'


import { Drawer, Select, util, Popup, Icon, Form, Input, Message, Pagination } from 'panda-design'
// 数据请求
import { hpIvstDisclosureArticleSelectList, hpIvstDisclosureArticleClassifyGetList } from '@/request/request'
// 环境判断
import PageContext from '@/utils/pageContext'
// 获取 institutionCode
import AppContext from '@/utils/appContext'
import { getStorage } from '@/utils/storage'
import Settings from './Settings'
import { pidConvertTree, openLink, getBackground } from '@/utils/index'
import { useRouter } from 'next/router'
import { OpenLink, Image } from '../..'

import clsx from 'clsx'

const NewsMoreLeftTab = (props, ref) => {
	const appContext = useContext(AppContext)
	// 判断环境
	const pageContext = useContext(PageContext)
	// 获取 institutionCode
	const institutionCode = pageContext.type == 'website' ? appContext.institutionCode : getStorage('institutionCode')

	const { config, defaultList, query, openLink } = props
	useImperativeHandle(ref, () => props)
	// 分类数据
	const [classify, setClassify] = useState([])
	// 分类数据
	const [tabs, setTabs] = useState([])
	// 分类id
	const [type, setType] = useState('')
	// 列表数据
	const [list, setList] = useState([])
	// 分页 页码
	const [pageNum, setPageNum] = useState(1)
	// 分页 每页数
	const [pageSize, setPageSize] = useState(10)
	// 分页 总页数
	const [totalPage, setTotalPage] = useState('')
	// 分页 总条数
	const [totalNum, setTotalNum] = useState(10)
	// 分页切换
	const pageChange = (page, pageSize) => {
		setPageNum(page)
	}
	// 获取url参数
	const router = useRouter()
	const { artTypeList: url_artTypeList } = router.query

	// 文章种类
	useEffect(() => {
		hpIvstDisclosureArticleClassifyGetList({
			institutionCode,
		})
			.then(res => {
				setClassify(res.data)
			})
			.catch(error => {})
	}, [])

	useEffect(() => {
		if (classify.length <= 0) return
		if (query.artTypeList <= 0) return
		let tab = query.artTypeList.map(item => {
			return classify.filter(i => i.primaryNum == item)[0]
		})
		if (!tab[0]) return
		setTabs(() => {
			return tab
		})
		const typeMy = url_artTypeList ? tab.filter(item => item.primaryNum == url_artTypeList)[0]?.primaryNum : tab[0].primaryNum
		console.log('所属分类',typeMy);
		// 跳转到所属分类下
		setType(typeMy ? typeMy : tab[0].primaryNum)
	}, [query.artTypeList, classify])

	// 数据列表
	useEffect(() => {
		if (query.artTypeList.length <= 0 && pageContext.type == 'edit') {
			setList(defaultList)
			return
		}
		if (!type) return
		hpIvstDisclosureArticleSelectList({
			isEnable: 1,
			pageNum: pageNum,
			pageSize: pageSize,
			artCustomizedTypeLists: [type],
			institutionCode,
			userType: getStorage('userInfo') ? getStorage('userInfo').userType : 0,
		}).then(res => {
			res.data.result.map((item, index) => {
				item.time = item.artDate ? `${item.artDate.toString().slice(0, 4)}-${item.artDate.toString().slice(4, 6)}-${item.artDate.toString().slice(6, 8)}` : ''
			})
			setList(res.data.result)
			setTotalPage(res.data.pages)
			setTotalNum(res.data.total)
		})
	}, [pageNum, type])

	return (
		<div className="newsMoreLeftTab" style={getBackground(config)}>
			<div className="newsMoreLeftTabIn">
				<div className="tabs">
					{tabs.map((item, index) => {
						return (
							item && (
								<span
									className={item.primaryNum == type ? 'active' : ''}
									key={index}
									onClick={() => {
										setType(item.primaryNum)
										if (type == item.primaryNum) return
									}}
								>
									{item.artCustomizedType}
								</span>
							)
						)
					})}
				</div>
				<div className="news_content">
					{list &&
						list.map((item, index) => {
							if (index > 10) return null
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
													type: type,
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
			<div className="pages">{totalPage > 0 && <Pagination simple totalPage={totalPage} total={totalNum} onChange={pageChange} />}</div>
		</div>
	)
}

NewsMoreLeftTab.config = {
	query: {
		artTypeList: [],
		status: 1,
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
			artTitle: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题22222222',
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

NewsMoreLeftTab.Settings = Settings

NewsMoreLeftTab.NAME = 'NewsMoreLeftTab'

NewsMoreLeftTab.TYPE = 'component'

NewsMoreLeftTab.NAMECN = '新闻资讯-更多列表(无图)'

NewsMoreLeftTab.thumbnail = '/static/images/newsMoreLeftTab/thumbnail.png'

export default React.forwardRef(NewsMoreLeftTab)
