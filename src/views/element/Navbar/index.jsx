// react 依赖
import React, { useEffect, useState, useImperativeHandle, useCallback } from 'react'
import { useSelector } from 'react-redux'

import { useParams } from 'react-router-dom'

import { Button, message } from 'antd'

// 引入组件
import Settings from './Settings'
import { OpenLink, Image } from '@components'

// 引入样式
import './index.scss'

// 引入静态资源
import clsx from 'clsx'
import { homeUrl } from '@/config/index'

const Navbar = (props, ref) => {
	const { isButton } = props

	const userInfo = useSelector(state => state.userInfo)

	const params = useParams()

	const pageContext = {}

	const [isShadow, setIsShadow] = useState(false)

	// 监听滚动条的位置
	const bindHandleScroll = event => {
		const scrollTop = (event.srcElement ? event.srcElement.documentElement.scrollTop : false) || window.pageYOffset || (event.srcElement ? event.srcElement.body.scrollTop : 0)
		if (scrollTop === 0) {
			setIsShadow(false)
		} else {
			setIsShadow(true)
		}
	}

	useImperativeHandle(ref, () => props)

	useEffect(() => {
		window.addEventListener('scroll', bindHandleScroll)

		return () => {
			window.removeEventListener('scroll', bindHandleScroll)
		}
	}, [])

	const handleActive = useCallback(
		item => {
			if (item.children) {
				return item.children.filter(tag => tag.link && tag.link.data.page == params.id)[0] != undefined
			} else {
				if (!params.id) {
					params.id = homeUrl
				}
				return params.id && item.link && item.link.data.page == params.id
			}
		},
		[params.id],
	)

	const handleRouterPush = url => {
		if (pageContext.type == 'preview') {
			message.warning('预览状态无法访问个人中心')
			return
		}
		window.open(url)
	}

	return (
		<div className="navbar-wrap">
			<div
				className={clsx('navbar', {
					'navbar-shadow': isShadow,
				})}
			>
				<div className="box-content">
					<div className="navbar-logo">
						<OpenLink data={props.logo} type={'img'} name={'logo'} edit={true}>
							<Image src={props.logo.url} alt="logo" />
						</OpenLink>
					</div>
					<ul className="navbar-ul">
						{pageContext.menu.map((item, index) => {
							return (
								<li className="navbar-ul-level-1" key={index}>
									<OpenLink data={item}>
										<span
											className={clsx('navbar-ul-item', {
												active: handleActive(item),
											})}
										>
											{item.title}
										</span>
									</OpenLink>
									{item.children && (
										<div className="navbar-ul-level-2">
											<ul>
												{item.children.map(item => {
													return (
														<li key={item.id}>
															<OpenLink data={item}>
																<span
																	className={clsx('navbar-ul-item', {
																		active: params.id && item.link && item.link.data.page == params.id,
																	})}
																>
																	{item.title}
																</span>
															</OpenLink>
														</li>
													)
												})}
											</ul>
										</div>
									)}
								</li>
							)
						})}
					</ul>
					{isButton && !userInfo && (
						<div className="navbar-login">
							<Button onClick={() => handleRouterPush('/registered')}>注册</Button>
							<Button onClick={() => handleRouterPush('/login')}>登录</Button>
						</div>
					)}
					{/* {isButton && userInfo && (
						<div onClick={() => router.push('/user')} className={clsx('narbar-investor')}>
							<span>你好，{userInfo.investorName} </span>
						</div>
					)} */}
				</div>
			</div>
		</div>
	)
}

Navbar.config = {
	logo: {
		url: '/static/images/navbar/logo.png',
		align: '',
		link: null,
		style: {
			width: 135,
			height: 40,
		},
		show: true,
	},
	config: {
		size: ['', ''],
	},
	isButton: false,
}

Navbar.Settings = Settings

Navbar.NAME = 'Navbar'

Navbar.TYPE = 'header'

Navbar.NAMECN = '菜单'

Navbar.thumbnail = '/static/images/navbar/thumbnail.png'

export default React.forwardRef(Navbar)
