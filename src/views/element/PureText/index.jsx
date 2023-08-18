import React, { useImperativeHandle } from 'react'

// 引入组件
import { OpenLink, Container } from '@components'

// 引入样式
import './index.scss'

const Puretext = (props, ref) => {
	const { descript } = props

	useImperativeHandle(ref, () => props)

	return (
		<Container {...props}>
			<OpenLink data={descript} type={'text'} name={'descript'} edit={true}>
				<div className="pureTextCon" dangerouslySetInnerHTML={{ __html: descript.text }}></div>
			</OpenLink>
		</Container>
	)
}

Puretext.config = {
	title: {
		text: '投资理念',
		link: null,
		style: {},
		show: true,
	},
	subtitle: {
		text: 'Investment Philosophy',
		link: null,
		style: {},
		show: true,
	},
	descript: {
		text: '秉承价值投资理念，以追求绝对收益为目标<br/> 运用多元价值观，多角度自下而上发掘具有核心竞争力的低估投资品种',
		link: null,
		show: true,
	},
	footerButtonText: {
		text: 'MORE',
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
		style: {
			backgroundColor: '',
			backgroundImage: '',
		},
	},
}

Puretext.NAME = 'Puretext'

Puretext.TYPE = 'component'

Puretext.NAMECN = '纯文本'

Puretext.thumbnail = '/static/images/pureText/thumbnail.png'

export default React.forwardRef(Puretext)
