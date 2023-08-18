import React, { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import { homeUrl } from '../../redux/template.config'

// 引入工具类
import { getUrlSearch } from '../../utils/index'

import './index.scss'

function OpenLink(props) {
	const { data, children, queryData } = props

	const router = useLocation()
	const type = 'view';

	const { pathname } = router

	function openLink() {
		if (!data.link) {
			return
		}
	
		let historyPrefix = pathname === 'preview' ? '/website/preview/' : '/website'
		let pageType = data.link.data.pageType
		if (!data.link.data.page) {
			return
		}

		switch (data.link.type) {
			case 'page':
				if (pageType == 1) {
					// 判断是正式访问，并且跳转地址是首页
					if (type == 'website' && data.link.data.page == homeUrl) {
						router.push(`/`)
						return
					}
					// 判断是预览访问，并且跳转地址是首页
					if (type == 'preview' && data.link.data.page == homeUrl) {
						router.push(`${historyPrefix}/${homeUrl}?type=edit`)
						return
					}
					if (queryData?.artTypeList) {
						console.log('router',router);
						console.log('asPath',router.asPath);
						let _artTypeList = /\?/.test(router.asPath) ? `&artTypeList=${queryData?.artTypeList[0]}` : `?artTypeList=${queryData?.artTypeList[0]}`
						router.push(
							`${historyPrefix}/${data.link.data.page}${getUrlSearch({
								...data.link.data.search,
							})}${_artTypeList}`,
						)
					} else {
						router.push(
							`${historyPrefix}/${data.link.data.page}${getUrlSearch({
								...data.link.data.search,
							})}`,
						)
					}
				}
				if (pageType == 2) {
					if (queryData?.artTypeList) {
						let _artTypeList = /\?/.test(router.asPath) ? `&artTypeList=${queryData?.artTypeList[0]}` : `?artTypeList=${queryData?.artTypeList[0]}`
						window.open(
							`${window.location.origin}${historyPrefix}/${data.link.data.page}${getUrlSearch({
								...data.link.data.search,
							})}${_artTypeList}`,
						)
					} else {
						window.open(
							`${window.location.origin}${historyPrefix}/${data.link.data.page}${getUrlSearch({
								...data.link.data.search,
							})}`,
						)
					}
				}
				break
			case 'link':
				if (pageType == 1) {
					window.location.href = data.link.data.page
				}
				if (pageType == 2) {
					window.open(data.link.data.page)
				}
				break
			case 'email':
				break
			default:
				break
		}
	}

	const style = useMemo(() => {
		if (!data) return {}

		let obj = {
			...(children.props.style || {}),
			...(data.style || {}),
			cursor: data.link ? 'pointer' : 'auto',
		}

		return obj
	}, [data, children])

	if (data && data.show === false) return null

	return React.cloneElement(children, {
		onClick: () => openLink(),
		style: style,
		'data-type': props.type,
		'data-classify': props.classify,
		'data-name': props.name,
		'data-index': props.index,
		'data-edit': props.edit,
	})
}

export default OpenLink
