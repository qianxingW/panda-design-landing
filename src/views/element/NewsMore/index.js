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
import Settings from './Settings'
import { getStorage } from '@/utils/storage'
import { pidConvertTree, openLink, getBackground } from '@/utils/index'
import { OpenLink, Image } from '../..'

import clsx from 'clsx'

const NewsMore = (props, ref) => {
	const appContext = useContext(AppContext)
	// 判断环境
	const pageContext = useContext(PageContext)
	// 获取 institutionCode
	const institutionCode = pageContext.type == 'website' ? appContext.institutionCode : getStorage('institutionCode')

	const { config, defaultList, query, openLink } = props
	useImperativeHandle(ref, () => props)
	// 动画开关
	const [animation, setAnimation] = useState(false)
	const [animationEnd, setAnimationEnd] = useState(false)
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
	const [pageSize, setPageSize] = useState(6)
	// 分页 总页数
	const [totalPage, setTotalPage] = useState('')
	// 分页 总条数
	const [totalNum, setTotalNum] = useState(10)
	// 分页切换
	const pageChange = (page, pageSize) => {
		setPageNum(page)
	}
	// 内容dom
	const cont = useRef('内容')
	const animationRef = useRef(null)

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
		if (query.artTypeList.length <= 0) return
		let tab = query.artTypeList.map(item => {
			return classify.filter(i => i.primaryNum == item)[0]
		})
		if (!tab[0]) return
		setTabs(() => {
			return tab
		})
		setType(tab[0].primaryNum)
	}, [query.artTypeList, classify])

	// 数据列表
	useEffect(() => {
		startAnimation()
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
				item.src = item.filePath && item.filePath != '[]' ? JSON.parse(item.filePath)[0].fileUrl : ''
				item.month = item.artDate ? item.artDate.toString().slice(0, 4) : ''
				item.year = item.artDate ? `${item.artDate.toString().slice(4, 6)}-${item.artDate.toString().slice(6, 8)}` : ''
			})
			setList(res.data.result)
			setTotalPage(res.data.pages)
			setTotalNum(res.data.total)
		})
	}, [pageNum, type])
	// 动画开始
	function startAnimation() {
		clearTimeout(animationRef.current)
		setAnimationEnd(false)
		setAnimation(true)
		animationRef.current = setTimeout(() => {
			clearTimeout(animationRef.current)
			setAnimationEnd(true)
			setAnimation(false)
		}, 2100)
	}

	return (
		<div className="newsMore" style={getBackground(config)}>
			<div className="newsMoreIn">
				<div className="tabs">
					{tabs.map((item, index) => {
						return (
							item && (
								<span
									className={item && item.primaryNum == type ? 'active' : ''}
									key={index}
									onClick={() => {
										setType(item.primaryNum)
										if (type == item.primaryNum) return
										setList([])
									}}
								>
									{item.artCustomizedType}
								</span>
							)
						)
					})}
				</div>
				<div
					className={clsx('news_content', {
						news_content_active: animation,
						news_content_end: animationEnd,
					})}
					ref={cont}
					key={tabs}
				>
					{list &&
						list.map((item, index) => {
							if (index > 6) return null
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
									<div className={`news_content_box ${item.primaryNum == index ? 'news_content_box_active' : ''}`}>
										<div className="img">
											<Image src={item.src} alt="" />
										</div>
										<div className="bot">
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
									</div>
								</OpenLink>
							)
						})}
				</div>
				<div className="pages">{totalPage > 0 && <Pagination simple totalPage={totalPage} total={totalNum} onChange={pageChange} />}</div>
			</div>
		</div>
	)
}

NewsMore.config = {
	query: {
		artTypeList: [],
		status: 1,
	},
	openLink: {
		url: null,
	},
	defaultList: [
		{
			src: '/static/images/newsMore/news1.png',
			year: '2021',
			month: '06-01',
			artTitle: '标题',
			outline: '副标题',
		},
		{
			src: '/static/images/newsMore/news2.png',
			year: '2021',
			month: '07-01',
			artTitle: '标题',
			outline: '副标题',
		},
		{
			src: '/static/images/newsMore/news1.png',
			year: '2021',
			month: '08-01',
			artTitle: '标题',
			outline: '副标题',
		},
		{
			src: '/static/images/newsMore/news2.png',
			year: '2021',
			month: '09-01',
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

NewsMore.Settings = Settings

NewsMore.NAME = 'NewsMore'

NewsMore.TYPE = 'component'

NewsMore.NAMECN = '新闻资讯-更多列表'

NewsMore.thumbnail = '/static/images/newsMore/thumbnail.png'

export default React.forwardRef(NewsMore)
