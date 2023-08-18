import { useState, useEffect, useRef, useMemo } from 'react'
import { useSelector } from 'react-redux'

import { Select, Modal, Tabs, Form, Input } from 'antd'

function LinkModal(props) {
	const { config } = props
	const [activeTabKey, setActiveTabKey] = useState('page')

	const [pageInitialValues, setPageInitialValues] = useState({})
	const [linkInitialValues, setLinkInitialValues] = useState({})
	const [, setEmailInitialValues] = useState({})

	const pagesConfig = useSelector(state => state.pagesConfig)

	const pageRef = useRef()
	const linkRef = useRef()
	const emailRef = useRef()

	const menuOption = useMemo(() => {
		return pagesConfig.pages.map(item => {
			return {
				label: item.name,
				value: item.url,
			}
		})
	}, [pagesConfig])

	useEffect(() => {
		// TUDO： 此处处理不合理，后续需要优化
		if (!props.visible) {
			setPageInitialValues({})
			setLinkInitialValues({})
			setEmailInitialValues({})
			setActiveTabKey('page')
			return
		}
		if (!config || !config.link) {
			return
		}
		let link = config.link
		if (link.type == 'page') {
			setPageInitialValues(link.data)
		}
		if (link.type == 'link') {
			setLinkInitialValues(link.data)
		}
		if (link.type == 'email') {
			setEmailInitialValues(link.data)
		}

		setActiveTabKey(link.type)
	}, [config, props.visible])

	function handleClick() {
		switch (activeTabKey) {
			case 'page':
				pageRef.current.onSubmit()
				break
			case 'link':
				linkRef.current.onSubmit()
				break
			case 'email':
				emailRef.current.onSubmit()
				break
			default:
				break
		}
	}

	function handleSubmit(value) {
		props.onConfirm({
			type: activeTabKey,
			data: value,
		})
	}

	return (
		<Modal
			width={840}
			title="配置链接"
			open={props.visible}
			destroyOnClose
			onCancel={() => {
				props.onCancel(false)
			}}
			onConfirm={() => {
				handleClick()
			}}
		>
			<div className="">
				<Tabs
					tabPosition="left"
					items={[
						{
							key: 'page',
							label: '页面',
							children: (
								<div className="" style={{ width: 500 }}>
									<Form
										labelCol={{ span: 6 }}
										layout={'horizontal'}
										initialValues={pageInitialValues}
										onSubmit={handleSubmit}
										onError={() => { }}
										ref={pageRef}
									>
										<Form.Item
											label="请选择页面"
											name="page"
											rules={[
												{
													required: true,
													message: '请选择',
												},
											]}
										>
											<Select className="user-button" options={menuOption} placeholder={'请选择页面'} />
										</Form.Item>
										<Form.Item
											label="页面打开方式"
											name="pageType"
											rules={[
												{
													required: true,
													message: '请选择',
												},
											]}
										>
											<Select className="user-button"
												options={[
													{
														label: '当前页面',
														value: 1,
													},
													{
														label: '新页面',
														value: 2,
													},
												]}
												placeholder={'请选择页面打开方式'}
											/>
										</Form.Item>
									</Form>
								</div>
							)
						},
						{
							key: 'link',
							label: '外部链接',
							children: (
								<div className="" style={{ width: 500 }}>
									<Form layout={'horizontal'} name={'n2'} initialValues={linkInitialValues} onSubmit={handleSubmit} onError={() => { }} ref={linkRef}>
										<Form.Item
											label="请输入页面地址"
											name="page"
											rules={[
												{
													required: true,
													message: '请输入页面地址',
												},
											]}
										>
											<Input placeholder="请输入页面地址" />
										</Form.Item>
										<Form.Item
											label="页面打开方式"
											name="pageType"
											rules={[
												{
													required: true,
													message: '请选择',
												},
											]}
										>
											<Select className="user-button"
												options={[
													{
														label: '当前页面',
														value: 1,
													},
													{
														label: '新页面',
														value: 2,
													},
												]}
												placeholder={'请选择页面打开方式'}
											/>
										</Form.Item>
									</Form>
								</div>
							)
						},
						// TUDO:因未支持email，目前屏蔽掉  ——  2021-11-22
						// {
						// 	key: 'email',
						// 	label: 'Email',
						// 	children: (
						// 		<div className="" style={{ width: 500 }}>
						// 			<Form layout={'horizontal'} name={'n2'} initialValues={emailInitialValues} onSubmit={handleSubmit} onError={() => { }} ref={emailRef}>
						// 				<Form.Item
						// 					label="Email"
						// 					name="email"
						// 					rules={[
						// 						{
						// 							required: true,
						// 							message: '请输入Email',
						// 						},
						// 					]}
						// 				>
						// 					<Input placeholder="请输入Email" />
						// 				</Form.Item>
						// 			</Form>
						// 		</div>
						// 	)
						// },
					]}
					activeKey={activeTabKey}
					onChange={key => setActiveTabKey(key)}
				/>
			</div>
		</Modal>
	)
}

export default LinkModal
