import React, { useImperativeHandle, useRef } from 'react'
import { Form, Input, Message } from 'antd'

// 数据请求
// import * as request from '@/request/request'
import { getBackground } from '@utils'

import Settings from './Settings'
import { OpenLink, Button } from '@components'
// 引入样式
import './index.scss'

const Applicationform = (props, ref) => {
	const { title, footerButtonText, inputPlaceholder, config } = props
	const { name, phone, companyName } = inputPlaceholder
	const formName = name || '姓名'
	const formPhone = phone || '联系电话'
	const formCompanyName = companyName || '公司名称'

	useImperativeHandle(ref, () => props)

	const formRef = useRef(null)

	// const cleanForm = () => {
	// 	formRef.current.setValue('name', '')
	// 	formRef.current.setValue('phone', '')
	// 	formRef.current.setValue('companyName', '')
	// }

	const onSubmit = form => {
		if (!form.name) {
			Message.show({
				content: formName + '（必填）',
				type: 'warning',
			})
			return
		}
		if (!form.phone) {
			Message.show({
				content: formPhone + '（必填）',
				type: 'warning',
			})
			return
		}
		if (!form.companyName) {
			Message.show({
				content: formCompanyName + '（必填）',
				type: 'warning',
			})
			return
		}

		// let newForm = {
		// 	name: {
		// 		label: formName,
		// 		value: form.name,
		// 	},
		// 	phone: {
		// 		label: formPhone,
		// 		value: form.phone,
		// 	},
		// 	companyName: {
		// 		label: formCompanyName,
		// 		value: form.companyName,
		// 	},
		// }

		// let newFormCol = {
		// 	name: formName,
		// 	phone: formPhone,
		// 	companyName: formCompanyName,
		// }
	}

	return (
		<div className="applicationform">
			<div className="applicationform-box">
				<div style={getBackground(config)}></div>
				<div>
					<OpenLink data={title} type={'text'} name={'title'} edit={true}>
						<div dangerouslySetInnerHTML={{ __html: title.text }}></div>
					</OpenLink>
					<Form
						className="applicationform-box-form"
						onSubmit={form => {
							onSubmit(form)
						}}
						onError={() => {
							// logger.error(error)
						}}
						ref={formRef}
					>
						<div>
							<Form.Item name="name" rules={[{ message: name }]}>
								<Input placeholder={name} />
							</Form.Item>
							<Form.Item name="phone" rules={[{ message: phone }]}>
								<Input placeholder={phone} />
							</Form.Item>
						</div>
						<div>
							<Form.Item name="companyName" rules={[{ message: companyName }]}>
								<Input placeholder={companyName} />
							</Form.Item>
						</div>
						<div>
							<Form.Item name="footerButtonText">
								<Button data-type={'button'} data-name={'footerButtonText'} data-edit={true} {...footerButtonText} htmlType="submit" />
							</Form.Item>
						</div>
					</Form>
				</div>
			</div>
		</div>
	)
}

Applicationform.config = {
	title: {
		text: '立即申请，免费体验一体化解决方案',
		link: null,
		style: {},
		show: true,
	},
	footerButtonText: {
		text: '申请使用',
		link: null,
		style: {},
		defaultStyle: {},
		hoverStyle: {},
		type: 'primary',
		show: true,
	},
	inputPlaceholder: {
		name: '姓名',
		phone: '联系电话',
		companyName: '公司名称',
	},
	config: {
		size: ['', ''],
		style: {
			backgroundColor: '#1565FF',
			backgroundImage: '',
		},
	},
}

Applicationform.Settings = Settings

Applicationform.NAME = 'Applicationform'

Applicationform.TYPE = 'component'

Applicationform.NAMECN = '表单'

Applicationform.thumbnail = '/static/images/applicationform/thumbnail.png'

export default React.forwardRef(Applicationform)
