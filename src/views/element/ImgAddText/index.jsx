import React, { useImperativeHandle } from 'react'
import clsx from 'clsx'
// 引入组件
import Settings from './Settings'
import { OpenLink, Image, Button, Container } from '@components'

// 引入样式
import './index.scss'

// 图文组合(标题、按钮、图片位置大小可配)
const ImgAddText = (props, ref) => {
	const { imgAlign, imgSize, img, contentTitle, contentDescribe, content, contentButtonText, config } = props

	useImperativeHandle(ref, () => props)

	return (
		<Container {...props}>
			<div className={clsx('imgAddText', `${config.theme}`)}>
				<div className="imgAddTextIn">
					<div className={`center center${imgAlign}`}>
						<div className={`text text${imgSize} ${imgAlign == 'left' ? 'right' : 'left'}`}>
							<OpenLink data={contentTitle} type={'text'} name={'contentTitle'} edit={true}>
								<h2 dangerouslySetInnerHTML={{ __html: contentTitle.text }}></h2>
							</OpenLink>
							<OpenLink data={contentDescribe} type={'text'} name={'contentDescribe'} edit={true}>
								<h3 dangerouslySetInnerHTML={{ __html: contentDescribe.text }}></h3>
							</OpenLink>
							<OpenLink data={content} type={'text'} name={'content'} edit={true}>
								<div className="content-text" dangerouslySetInnerHTML={{ __html: content.text }}></div>
							</OpenLink>
							<OpenLink data={contentButtonText} type={'button'} name={'contentButtonText'} edit={true}>
								<Button {...contentButtonText} />
							</OpenLink>
						</div>
						{/* 图片位置及大小配置 */}
						<div className={`${imgSize} ${imgAlign}`}>
							<OpenLink data={img} type={'img'} name={'img'} edit={true}>
								<Image src={img.url} alt=""></Image>
							</OpenLink>
						</div>
					</div>
				</div>
			</div>
		</Container>
	)
}

ImgAddText.config = {
	imgAlign: 'right', //图片位置-left、right
	imgSize: 'imgB', //图片大小-大imgB、小imgS
	title: {
		text: '大标题',
		link: null,
		style: {},
		show: true,
	},
	subtitle: {
		text: '我是副标题',
		link: null,
		style: {},
		show: true,
	},
	img: {
		url: '/static/images/imgAddText/4.png',
		size: ['', ''],
		align: '',
		link: null,
		style: {},
		show: true,
	},
	contentTitle: {
		text: '内容主标题',
		link: null,
		style: {},
		show: true,
	},
	contentDescribe: {
		text: '内容副标题',
		link: null,
		style: {},
		show: true,
	},
	content: {
		text: `助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风险，创造
        价值助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风险，
        创造价值助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风
        助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风险，创造
        价值助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风险，
        创造价值助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风
        助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风险，创造
        价值助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风险。`,
		link: null,
		style: {},
		show: true,
	},
	contentButtonText: {
		text: '按钮',
		link: null,
		style: {},
		defaultStyle: {},
		hoverStyle: {},
		type: 'default',
		show: true,
	},
	footerButtonText: {
		text: '按钮',
		link: null,
		style: {},
		defaultStyle: {},
		hoverStyle: {},
		type: 'primary',
		show: true,
	},
	config: {
		size: ['', ''],
		layout: {
			header: true,
			footer: true,
		},
		theme: 'dark',
		style: {
			backgroundColor: '',
			backgroundImage: '',
		},
	},
}

ImgAddText.Settings = Settings

ImgAddText.NAME = 'ImgAddText'

ImgAddText.TYPE = 'component'

ImgAddText.NAMECN = '图文组合'

ImgAddText.thumbnail = '/static/images/imgAddText/thumbnail.png'

export default React.forwardRef(ImgAddText)
