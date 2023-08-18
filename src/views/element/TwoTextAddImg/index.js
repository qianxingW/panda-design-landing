// react 依赖
import React, { useEffect, useMemo, useState, useImperativeHandle } from 'react'
import { useSelector, useDispatch } from 'react-redux'


import { Drawer, Select, Button, util, Popup, Icon, Form, Input } from 'panda-design'

// 数据请求

// 引入工具类
import { pidConvertTree, openLink, getBackground } from '@/utils/index'

// 引入组件
import Settings from './Settings'
import { OpenLink, Image } from '@/components/index'

// 引入样式

const TwoTextAddImg = (props, ref) => {
	const { leftTitle, leftDescript, leftContent, leftImg, rightImg, rightTitle, rightDescript, rightContent, config, onRef } = props

	useImperativeHandle(ref, () => props)

	return (
		<div className="twoTextAddImg" style={getBackground(config)}>
			<div className="twoTextAddImgIn">
				<div className="text textLeft">
					<div className="left">
						<OpenLink data={leftTitle} type={'text'} name={'leftTitle'} edit={true}>
							<h2 dangerouslySetInnerHTML={{ __html: leftTitle.text }}></h2>
						</OpenLink>
						<OpenLink data={leftDescript} type={'text'} name={'leftDescript'} edit={true}>
							<h4 dangerouslySetInnerHTML={{ __html: leftDescript.text }}></h4>
						</OpenLink>
						<OpenLink data={leftContent} type={'text'} name={'leftContent'} edit={true}>
							<div className="content-text" dangerouslySetInnerHTML={{ __html: leftContent.text }}></div>
						</OpenLink>
					</div>
				</div>
				<OpenLink data={leftImg} type={'img'} name={'leftImg'} edit={true}>
					<Image alt="" src={leftImg.url} />
				</OpenLink>
				<OpenLink data={rightImg} type={'img'} name={'rightImg'} edit={true}>
					<Image alt="" src={rightImg.url} />
				</OpenLink>
				<div className="text">
					<div className="right">
						<OpenLink data={rightTitle} type={'text'} name={'rightTitle'} edit={true}>
							<h2 dangerouslySetInnerHTML={{ __html: rightTitle.text }}></h2>
						</OpenLink>
						<OpenLink data={rightDescript} type={'text'} name={'rightDescript'} edit={true}>
							<h4 dangerouslySetInnerHTML={{ __html: rightDescript.text }}></h4>
						</OpenLink>
						<OpenLink data={rightContent} type={'text'} name={'rightContent'} edit={true}>
							<div className="content-text" dangerouslySetInnerHTML={{ __html: rightContent.text }}></div>
						</OpenLink>
					</div>
				</div>
			</div>
		</div>
	)
}
TwoTextAddImg.Settings = Settings
TwoTextAddImg.config = {
	leftTitle: {
		text: 'FAS运营管理系统',
		link: null,
		style: {},
		show: true,
	},
	leftDescript: {
		text: '副标题！！！',
		link: null,
		style: {},
		show: true,
	},
	leftContent: {
		text: `助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风险，创造
            价值助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风险，
            创造价值助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风

            助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风险，创造
            价值助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风险，
            创造价值助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风

            助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风险，创造
            价值助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风险，
            创造价值助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风

            助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风险，创造
            价值助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风险，
            创造价值助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风111`,
		link: null,
		style: {},
		show: true,
	},
	leftImg: {
		url: '/static/images/twoTextAddImg/1.png',
		size: ['', ''],
		align: '',
		link: null,
		style: {},
		show: true,
	},
	rightTitle: {
		text: 'FAS运营管理系统222',
		link: null,
		style: {},
		show: true,
	},
	rightDescript: {
		text: '副标题！！！',
		link: null,
		style: {},
		show: true,
	},
	rightContent: {
		text: `助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风险，创造
            价值助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风险，
            创造价值助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风

            助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风险，创造
            价值助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风险，
            创造价值助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风

            助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风险，创造
            价值助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风险，
            创造价值助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风

            助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风险，创造
            价值助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风险，
            创造价值助力管理人提升效能，降低风险，创造价值助力管理人提升效能，降低风111`,
		link: null,
		style: {},
		show: true,
	},
	rightImg: {
		url: '/static/images/twoTextAddImg/2.png',
		size: ['', ''],
		align: '',
		link: null,
		style: {},
		show: true,
	},
	config: {
		size: ['', ''],
		style: {
			backgroundColor: '',
			backgroundImage: '',
		},
	},
}

TwoTextAddImg.NAME = 'TwoTextAddImg'

TwoTextAddImg.TYPE = 'component'

TwoTextAddImg.NAMECN = '两图两文组合'

TwoTextAddImg.thumbnail = '/static/images/twoTextAddImg/thumbnail.png'

export default React.forwardRef(TwoTextAddImg)
