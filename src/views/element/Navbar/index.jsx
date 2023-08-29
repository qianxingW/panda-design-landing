// react 依赖
import React, { useEffect, useState, useImperativeHandle, useCallback } from 'react'
import { useSelector } from 'react-redux'

import { useParams } from 'react-router-dom'

import Settings from './Settings'
import { OpenLink, ImagePic } from '@components'

// 引入样式
import './index.scss'

// 引入静态资源
import clsx from 'clsx'
import { homeUrl } from '../../../redux/template.config'

const Navbar = (props, ref) => {
	const params = useParams()
	const pagesConfig = useSelector(state => state.pagesConfig)

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
							<ImagePic src={props.logo.url} alt="logo" />
						</OpenLink>
					</div>
					<ul className="navbar-ul">
						{pagesConfig.menu.map((item, index) => {
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

Navbar.thumbnail = '/static/images/card/thumbnail.png'

export default React.forwardRef(Navbar)
