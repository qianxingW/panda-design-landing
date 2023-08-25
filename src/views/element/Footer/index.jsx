// react 依赖
import React, { useImperativeHandle, useContext } from 'react'

import { getBackground } from '@utils'

// 引入组件
import Settings from './Settings'
import { OpenLink, ImagePic } from '@components'

// 引入样式
import './index.scss'

const Footer = (props, ref) => {
	const { logo, url, phone, address, erweima, icp, config } = props

	const pageContext = useContext()

	useImperativeHandle(ref, () => props)

	return (
		<div className="footer" style={getBackground(config)}>
			<div className="box-content footer-content">
				<div className="footer-company">
					<div className="footer-logo">
						<OpenLink data={logo} type={'img'} name={'logo'} edit={true}>
							<ImagePic src={logo.url} />
						</OpenLink>
					</div>
					<OpenLink data={address} type={'text'} name={'address'} edit={true}>
						<div className="footer-address" dangerouslySetInnerHTML={{ __html: address.text }}></div>
					</OpenLink>
					<OpenLink data={phone} type={'text'} name={'phone'} edit={true}>
						<div className="footer-url" dangerouslySetInnerHTML={{ __html: phone.text }}></div>
					</OpenLink>
					<OpenLink data={url} type={'text'} name={'url'} edit={true}>
						<div className="footer-url" dangerouslySetInnerHTML={{ __html: url.text }}></div>
					</OpenLink>
				</div>
				<div className="footer-narbar">
					<ul className="footer-ul">
						{pageContext.menu.map((item, index) => {
							return (
								<li className="footer-ul-level-1" key={index}>
									<OpenLink data={item}>
										<span className="footer-ul-item">{item.title}</span>
									</OpenLink>
									{item.children && (
										<div className="footer-ul-level-2">
											<ul>
												{item.children.map(subItem => {
													return (
														<li key={subItem.id}>
															<OpenLink data={subItem}>
																<span className="footer-ul-item">{subItem.title}</span>
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
				<div className="footer-info">
					<div className="erweima">
						<div className="erweima-pic">
							<OpenLink data={erweima} type={'img'} name={'erweima'} edit={true}>
								<ImagePic src={erweima.url} />
							</OpenLink>
						</div>
						<p>扫码关注</p>
						<p>了解更多内容</p>
					</div>
				</div>
			</div>
			<div className="box-content icp-content">
				<OpenLink data={icp} type={'text'} name={'icp'} edit={true}>
					<div className="icp" dangerouslySetInnerHTML={{ __html: icp.text }}></div>
				</OpenLink>
			</div>
		</div>
	)
}

Footer.config = {
	icp: {
		text: 'Copyright © 2019 北京科技有限公司 京ICP备130号-1',
		link: null,
		style: {},
	},
	companyName: {
		text: '北京科技有限公司',
		link: null,
		style: {},
	},
	address: {
		text: '北京市海淀区',
		link: null,
		style: {},
	},
	phone: {
		text: '联系电话：0101-83456188-6868',
		link: null,
		style: {},
	},
	url: {
		text: 'Email：mkt@crt.com',
		link: null,
		style: {},
	},
	erweima: {
		url: '/pc/static/erweima.png',
		width: '',
		height: '',
		link: null,
		style: {
			width: 120,
			height: 120,
		},
	},
	logo: {
		url: '/pc/static/logo.png',
		width: '',
		height: '',
		link: null,
		style: {
			width: 125,
			height: 40,
		},
	},
	config: {
		size: ['', ''],
		style: {
			backgroundColor: '#111628',
			backgroundImage: '',
		},
	},
}

Footer.Settings = Settings

Footer.NAME = 'Footer'

Footer.TYPE = 'footer'

Footer.NAMECN = '页脚'

Footer.thumbnail = '/static/images/thumbnail.png'

export default React.forwardRef(Footer)
