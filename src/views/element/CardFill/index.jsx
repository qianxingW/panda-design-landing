import React, { useImperativeHandle } from 'react'
import { getBackground } from '@utils'

import { OpenLink } from '@components'

import './index.scss'

const CardFill = (props, ref) => {
	const { title, captionOne, captionOneDec, captionTwo, captionTwoDec, captionThree, captionThreeDec, captionFour, captionFourDec, config } = props

	useImperativeHandle(ref, () => props)

	return (
		<div className="cardfill" style={getBackground(config)}>
			<div className="box-content">
				<OpenLink data={title} type={'text'} name={'title'} edit={true}>
					<div className="cardfill-title" dangerouslySetInnerHTML={{ __html: title.text }}></div>
				</OpenLink>
				<div className="cardfill-list">
					<div className="cardfill-list-item">
						<OpenLink data={captionOne} type={'text'} name={'captionOne'} edit={true}>
							<div className="cardfill-list-item-title" dangerouslySetInnerHTML={{ __html: captionOne.text }}></div>
						</OpenLink>
						<OpenLink data={captionOneDec} type={'text'} name={'captionOneDec'} edit={true}>
							<div className="cardfill-list-item-subtitle" dangerouslySetInnerHTML={{ __html: captionOneDec.text }}></div>
						</OpenLink>
					</div>
					<div className="cardfill-list-item">
						<OpenLink data={captionTwo} type={'text'} name={'captionTwo'} edit={true}>
							<div className="cardfill-list-item-title" dangerouslySetInnerHTML={{ __html: captionTwo.text }}></div>
						</OpenLink>
						<OpenLink data={captionTwoDec} type={'text'} name={'captionTwoDec'} edit={true}>
							<div className="cardfill-list-item-subtitle" dangerouslySetInnerHTML={{ __html: captionTwoDec.text }}></div>
						</OpenLink>
					</div>
					<div className="cardfill-list-item">
						<OpenLink data={captionThree} type={'text'} name={'captionThree'} edit={true}>
							<div className="cardfill-list-item-title" dangerouslySetInnerHTML={{ __html: captionThree.text }}></div>
						</OpenLink>
						<OpenLink data={captionThreeDec} type={'text'} name={'captionThreeDec'} edit={true}>
							<div className="cardfill-list-item-subtitle" dangerouslySetInnerHTML={{ __html: captionThreeDec.text }}></div>
						</OpenLink>
					</div>
					<div className="cardfill-list-item">
						<OpenLink data={captionFour} type={'text'} name={'captionFour'} edit={true}>
							<div className="cardfill-list-item-title" dangerouslySetInnerHTML={{ __html: captionFour.text }}></div>
						</OpenLink>
						<OpenLink data={captionFourDec} type={'text'} name={'captionFourDec'} edit={true}>
							<div className="cardfill-list-item-subtitle" dangerouslySetInnerHTML={{ __html: captionFourDec.text }}></div>
						</OpenLink>
					</div>
				</div>
			</div>
		</div>
	)
}
CardFill.config = {
	title: {
		text: '专注领域解决方案落地',
		link: null,
		style: {},
		show: true,
	},
	captionOne: {
		text: 'TOP',
		link: null,
		style: {},
		show: true,
	},
	captionOneDec: {
		text: '头部高度认可',
		link: null,
		style: {},
		show: true,
	},
	captionTwo: {
		text: '300+',
		link: null,
		style: {},
		show: true,
	},
	captionTwoDec: {
		text: '服务超过300+机构',
		link: null,
		style: {},
		show: true,
	},
	captionThree: {
		text: '300+',
		link: null,
		style: {},
		show: true,
	},
	captionThreeDec: {
		text: '累计服务达1000+名用户',
		link: null,
		style: {},
		show: true,
	},
	captionFour: {
		text: '7000亿',
		link: null,
		style: {},
		show: true,
	},
	captionFourDec: {
		text: '管理资产规模超过7000亿',
		link: null,
		style: {},
		show: true,
	},
	config: {
		size: ['', ''],
		style: {
			backgroundColor: '',
			backgroundImage: '/static/images/cardFill/cardfill.png',
		},
	},
	onRef() {},
}

CardFill.NAME = 'CardFill'

CardFill.TYPE = 'component'

CardFill.NAMECN = '数据'

CardFill.thumbnail = '/static/images/cardFill/thumbnail.png'

export default React.forwardRef(CardFill)
