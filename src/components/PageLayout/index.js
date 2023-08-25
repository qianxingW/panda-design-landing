// 引入 react 依赖
import { ReactElement, useEffect, useState, useMemo, useContext } from 'react'
import classnames from 'classnames'
import useSWR from 'swr'

// 引入 next 依赖
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import Image from 'next/image'
import Head from 'next/head'
import { useRouter } from 'next/router'

// 引入redux store
import store from '@/store/index'
import * as ActionTypes from '@/actions/index'
import { useSelector, useDispatch } from 'react-redux'

//引入组件库
import { Message, Icon, Popover } from 'rootnet-design'

// 引入配置文件
import { OSSUrl } from '@/config/index'

// 引入工具类
import { getStorage } from '@/utils/storage'
import PageContext from '@/utils/pageContext'
import { getCustomerAssetInfo, getUserInfo, logout } from '@/thunk/index'

// 引入三方依赖
import style from './index.module.scss'
import { isBuffer } from 'lodash-es'

export default function PageLayout(props) {
	const router = useRouter()
	const dispatch = useDispatch()

	const { pagesData, type } = useContext(PageContext)

	const companyIcon = pagesData && pagesData.companyIcon ? OSSUrl + pagesData.companyIcon : ''

	function handleUserInfo() {
		if (getStorage('userInfo')) {
			dispatch({
				type: ActionTypes.SET_USERINFO,
				data: getStorage('userInfo'),
			})
			dispatch(getUserInfo)
			dispatch(getCustomerAssetInfo)
		} else {
			dispatch({
				type: ActionTypes.LOGOUT,
			})
		}
	}

	useEffect(() => {
		const handleOnfocus = () => {
			handleUserInfo()
		}
		if (type == 'website') {
			window.addEventListener('focus', handleOnfocus)
			handleUserInfo()
		}
		return () => {
			if (type == 'website') {
				window.removeEventListener('focus', handleOnfocus)
			}
		}
	}, [])

	return (
		<>
			<Head>
				{pagesData && pagesData.title && <title>{pagesData.title}</title>}

				{pagesData && pagesData.companyIcon && (
					<>
						<link href={companyIcon} rel="stylesheet" />
						<link rel="icon" href={companyIcon} />
						<link rel="apple-touch-icon" href={companyIcon} />
						<link type="image/png" href={companyIcon} rel="shortcut icon" />
					</>
				)}

				<meta name="viewport" content="width=device-width,initial-scale=1" />
				{pagesData && pagesData.keyword && <meta name="keywords" content={pagesData.keyword} />}
				{pagesData && pagesData.websiteDesc && <meta name="description" content={pagesData.websiteDesc} />}
				<link href="/pc/static/res/iconfont.css" rel="stylesheet" />
			</Head>
			{props.children}
		</>
	)
}
