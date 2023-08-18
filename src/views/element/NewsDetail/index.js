// react 依赖
import React, { useEffect, useMemo, useState, useImperativeHandle, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useRouter } from 'next/router'


import { Drawer, Select, util, Popup, Icon, Form, Input, Message, Button } from 'panda-design'

// 数据请求
import { hpIvstDisclosureArticleSelectList, hpIvstDisclosureArticleDetail } from '@/request/request'

// 环境判断
import PageContext from '@/utils/pageContext'
import AppContext from '@/utils/appContext'
import Settings from './Settings'
import { pidConvertTree, openLink, getBackground, useLocationSearch } from '@/utils/index'
import { OpenLink, Image, EditorViewer } from '@/components/index'
import logger from '@/utils/log'
import { getStorage } from '@/utils/storage'

const NewsDetail = (props, ref) => {
	const appContext = useContext(AppContext)
	// 判断环境
	const pageContext = useContext(PageContext)
	// 获取 institutionCode
	const institutionCode = pageContext.type == 'website' ? appContext.institutionCode : getStorage('institutionCode')

	const { config } = props
	// 登录信息
	// const userType = useSelector(state => state.userType) || 0

	const router = useRouter()
	const [id, setId] = useState(router.query.newsId)
	const artTypeList = router.query.artTypeList ? router.query.artTypeList.split(',') : []
	const type = router.query.type ? router.query.type.split(',') : []
	useImperativeHandle(ref, () => props)

	// 详情数据
	// const [data, setData] = useState([])
	// 详情数据
	const [detail, setDetail] = useState('')
	// 列表数据
	const [list, setList] = useState([])
	// 权限code
	const [code, setCode] = useState()
	// 分页 页码
	const [page, setPage] = useState(1)
	// 上一篇下一篇计数
	const [num, setNum] = useState()
	// 上一篇下一篇禁用
	const [disabledPrv, setDisabledPrv] = useState(false)
	const [disabledNext, setDisabledNext] = useState(false)

	// 上一篇下一篇点击
	const prevAddNext = val => {
		if (!id) {
			Message.show('未获取到文章id', 'error', 3)
			return
		}
		// 只有一篇时不做切换
		if (list.length == 1) return
		setDisabledPrv(false)
		setDisabledNext(false)
		if (val == 0) {
			if (num == 0) {
				setDisabledPrv(true)
				return
			}
			setDetail(list[num - 1])
			setNum(num - 1)
			if (pageContext.type == 'preview') {
				router.push(`/website/preview/${router.query.slug[0]}/${router.query.slug[1]}?artTypeList=${artTypeList}&newsId=${list[num - 1].primaryNum}&type=${type}`)
			} else {
				router.push(`/website/${router.query.id}?artTypeList=${artTypeList}&newsId=${list[num - 1].primaryNum}&type=${type}`)
			}
		} else {
			if (num == list.length - 1) {
				setDisabledNext(true)
				return
			}
			setDetail(list[num + 1])
			setNum(num + 1)

			if (pageContext.type == 'preview') {
				router.push(`/website/preview/${router.query.slug[0]}/${router.query.slug[1]}?artTypeList=${artTypeList}&newsId=${list[num + 1].primaryNum}&type=${type}`)
			} else {
				router.push(`/website/${router.query.id}?artTypeList=${artTypeList}&newsId=${list[num + 1].primaryNum}&type=${type}`)
			}
		}
	}

	// 列表数据请求
	useEffect(() => {
		if (!router.query.newsId) return
		hpIvstDisclosureArticleSelectList({
			artCustomizedTypeLists: type,
			isEnable: 1,
			institutionCode,
			userType: getStorage('userInfo') ? getStorage('userInfo').userType : 0,
			pageNum: page, //页码
			pageSize: 1000, //每页数
		})
			.then(res => {
				if (res.code === 0) {
					res.data.result.map((item, index) => {
						if (item.primaryNum == router.query.newsId) {
							setNum(index)
							if (index == 0) {
								setDisabledPrv(true)
							}
							if (index == res.data.result.length - 1) {
								setDisabledNext(true)
							}
						}
					})
					setList(res.data.result)
				}
			})
			.catch(err => {
				logger.log(err, '资讯列表错误')
			})
	}, [router])

	// 详情数据请求
	useEffect(() => {
		// 编辑状态使用默认数据
		if (pageContext.type == 'edit') {
			setDetail(config)
			return
		}
		if (!router.query.newsId) {
			Message.show('未获取到文章id', 'error', 3)
			return
		}
		hpIvstDisclosureArticleDetail({
			primaryNum: router.query.newsId,
			userType: getStorage('userInfo') ? getStorage('userInfo').userType : 0,
		})
			.then(res => {
				if (res.code === 0) {
					if (res.data.artDate > 0) {
						res.data.artDate = res.data.artDate.toString()
						res.data.artDate = `${res.data.artDate.slice(0, 4)}-${res.data.artDate.slice(4, 6)}-${res.data.artDate.slice(6, 8)}`
					}
					setDetail(res.data)
					setCode(res.code)
				}
			})
			.catch(err => {
				setCode(err.code)
				if (!getStorage('userInfo')) {
					setCode(1167)
				}
				// logger.error(err)
			})
	}, [router])

	// 返回列表页
	const back = () => {
		window.history.back()
	}
	// 跳预约页面
	const toProductList = () => {
		window.open(`/productList`)
	}
	// 跳登录页
	const toLogin = () => {
		window.open(`/login`)
	}
	return (
		<div className="newsDetails" style={getBackground(config)}>
			{code == 1166 && (
				<div className="detail-img">
					<div>
						<img src={'/pc/static/authority.svg'} alt="" />
						<p>抱歉，当前资讯详情需要持有产品后方可查看</p>
						<div>
							<Button
								onClick={() => {
									back()
								}}
							>
								返回上级
							</Button>
							<Button
								onClick={() => {
									toProductList()
								}}
								type="primary"
							>
								立即预约
							</Button>
						</div>
					</div>
				</div>
			)}
			{code == 1167 && (
				<div className="detail-img">
					<div>
						<img src={'/pc/static/authority.svg'} alt="" />
						<p>抱歉，当前内容详情需要登录之后方可查看</p>
						<div>
							<Button
								onClick={() => {
									back()
								}}
							>
								返回上级
							</Button>
							<Button
								onClick={() => {
									toLogin()
								}}
								type="primary"
							>
								立即登录
							</Button>
						</div>
					</div>
				</div>
			)}
			{code != 1166 && code != 1167 && (
				<div className="newsDetailsIn">
					<div className="center">
						<div className="left">
							<div className="top">
								<h4>{detail.title || detail.artTitle}</h4>
								<h5>{detail.artDate}</h5>
								{/* <h6>{detail.outline}</h6> */}
								<hr />
							</div>
							<div className="contents">
								<EditorViewer value={detail.textContext} />
							</div>
							<div className="bottom">
								<a
									className={`${disabledPrv ? 'a-disabled' : 'a-hover-first'}`}
									onClick={() => {
										prevAddNext(0)
									}}
								>
									<i></i> 上一篇文章
								</a>
								<a
									className={`${disabledNext ? 'a-disabled' : 'a-hover-last'}`}
									onClick={() => {
										prevAddNext(1)
									}}
								>
									下一篇文章 <i></i>
								</a>
							</div>
						</div>
						{/* <div className="right">
            <h3>相关推荐</h3>
            <div className="type">
              {[...Array(5)].map((item, index) => {
                return <a href="" key={index}>分类一</a>;
              })}
            </div>
          </div> */}
					</div>
				</div>
			)}
		</div>
	)
}

NewsDetail.config = {
	config: {
		size: ['', ''],
		style: {
			backgroundColor: '',
			backgroundImage: '',
		},
		artTitle: '标题',
		activeTime: 20211001,
		artDate: 20211111,
		outline: '副标题',
		textContext: '<h1>内容区域</h1>',
	},
}

NewsDetail.Settings = Settings

NewsDetail.NAME = 'NewsDetail'

NewsDetail.TYPE = 'component'

NewsDetail.NAMECN = '新闻资讯动态-详情'

NewsDetail.thumbnail = '/static/images/newsDetail/thumbnail.png'

export default React.forwardRef(NewsDetail)
