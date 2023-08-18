import React, { useImperativeHandle } from 'react'

import { getBackground } from '@utils'
import { OpenLink } from '@components'

// 引入样式
import './index/.scss'

const HeadLine = (props, ref) => {
	const { title, subtitle, config } = props

	useImperativeHandle(ref, () => props)

	return (
		<div className="container-header headLine" style={getBackground(config)}>
			<OpenLink data={title} type="text" name="title" edit>
				<h2 className="container-title" dangerouslySetInnerHTML={{ __html: title.text }}></h2>
			</OpenLink>
			<div className="container-line"></div>
			<OpenLink data={subtitle} type="text" name="subtitle" edit>
				<h3 className="container-subtitle" dangerouslySetInnerHTML={{ __html: subtitle.text }}></h3>
			</OpenLink>
		</div>
	)
}

HeadLine.config = {
	title: {
		text: '我是标题',
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

	config: {
		size: ['', ''],
		style: {
			backgroundColor: '#FFFFFF',
			backgroundImage: '',
		},
	},
}

HeadLine.NAME = 'HeadLine'

HeadLine.TYPE = 'component'

HeadLine.NAMECN = '页面标题'

HeadLine.thumbnail = '/static/images/headLine/thumbnail.png'

export default React.forwardRef(HeadLine)
