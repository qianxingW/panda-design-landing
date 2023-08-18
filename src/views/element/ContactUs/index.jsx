import React, { useImperativeHandle } from 'react'
import { getBackground } from '@utils'

import { OpenLink, Image } from '@components'

// 引入样式
import './index.scss'

const ContactUs = (props, ref) => {
	const { title, subtitle, tel, email, headquarters, branchOne, branchTwo, img, config } = props

	useImperativeHandle(ref, () => props)

	return (
		<div className="contactus" style={getBackground(config)}>
			<div className="contactus-box">
				<div className="contactus-info">
					<OpenLink data={title} type={'text'} name={'title'} edit={true}>
						<div dangerouslySetInnerHTML={{ __html: title.text }}></div>
					</OpenLink>
					<div></div>
					<OpenLink data={subtitle} type={'text'} name={'subtitle'} edit={true}>
						<div dangerouslySetInnerHTML={{ __html: subtitle.text }}></div>
					</OpenLink>
					<OpenLink data={tel} type={'text'} name={'tel'} edit={true}>
						<div dangerouslySetInnerHTML={{ __html: tel.text }}></div>
					</OpenLink>
					<OpenLink data={email} type={'text'} name={'email'} edit={true}>
						<div dangerouslySetInnerHTML={{ __html: email.text }}></div>
					</OpenLink>
					<OpenLink data={headquarters} type={'text'} name={'headquarters'} edit={true}>
						<div dangerouslySetInnerHTML={{ __html: headquarters.text }}></div>
					</OpenLink>
					<OpenLink data={branchOne} type={'text'} name={'branchOne'} edit={true}>
						<div dangerouslySetInnerHTML={{ __html: branchOne.text }}></div>
					</OpenLink>
					<OpenLink data={branchTwo} type={'text'} name={'branchTwo'} edit={true}>
						<div dangerouslySetInnerHTML={{ __html: branchTwo.text }}></div>
					</OpenLink>
				</div>
				<div className="contactus-map">
					<OpenLink data={img} type={'img'} name={'img'} edit={true}>
						<Image src={img.url} alt="" />
					</OpenLink>
				</div>
			</div>
		</div>
	)
}

ContactUs.config = {
	title: {
		text: '联系我们',
		link: null,
		style: {},
		show: true,
	},
	subtitle: {
		text: '我是辅助文本',
		link: null,
		style: {},
		show: true,
	},
	tel: {
		text: '联系电话：183333380',
		link: null,
		style: {},
		show: true,
	},
	email: {
		text: '电子邮箱：g@qq.com',
		link: null,
		style: {},
		show: true,
	},
	headquarters: {
		text: '北京总部：北京市海淀区',
		link: null,
		style: {},
		show: true,
	},
	branchOne: {
		text: '上海分公司：北京市海淀区',
		link: null,
		style: {},
		show: true,
	},
	branchTwo: {
		text: '深圳分公司：北京市海淀区',
		link: null,
		style: {},
		show: true,
	},
	img: {
		url: '/static/images/contactUs/map.png',
		size: ['', ''],
		align: '',
		link: null,
		style: {
			width: 667,
			height: 506,
		},
		show: true,
	},
	config: {
		size: ['', ''],
		style: {
			backgroundColor: '#fff',
			backgroundImage: '',
		},
	},
}

ContactUs.NAME = 'ContactUs'

ContactUs.TYPE = 'component'

ContactUs.NAMECN = '联系我们'

ContactUs.thumbnail = '/static/images/contactUs/thumbnail.png'

export default React.forwardRef(ContactUs)
