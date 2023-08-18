import React, { useImperativeHandle } from 'react'

import { getBackground } from '@utils'

import { OpenLink, Image } from '@components'

// 引入样式
import './index.scss'

const Exhibition = (props, ref) => {
	const { img, config } = props

	useImperativeHandle(ref, () => props)

	// useImperativeHandle(ref, () => {
	//   return props
	// })

	return (
		<div className="exhibition" style={getBackground(config)}>
			<div className="box-content">
				<OpenLink data={img} name={'img'} type={'img'} edit={true}>
					<Image key={img.url} src={img.url} alt="1" mode="widthFix" />
				</OpenLink>
			</div>
		</div>
	)
}

Exhibition.config = {
	img: {
		url: '/static/images/exhibition/logo.png',
		width: '',
		height: '',
		link: null,
		style: {},
		show: true,
	},
	config: {
		size: ['', ''],
		style: {
			backgroundColor: '#ccc',
			backgroundImage: '',
		},
	},
}

Exhibition.NAME = 'Exhibition'

Exhibition.TYPE = 'component'

Exhibition.NAMECN = '图片填充'

Exhibition.thumbnail = '/static/images/exhibition/thumbnail.png'

export default React.forwardRef(Exhibition)
