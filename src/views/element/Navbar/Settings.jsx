import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// 引入第三方依赖
import _ from 'lodash'


import { Tree, Input, Operation, Collapse, Radio } from 'antd'
import {
	PlusOutlined,
	UpOutlined,
	DownOutlined
} from '@ant-design/icons';

// 数据请求
//

// 引入redux定义
import * as ActionTypes from '@/actions/index'

// 引入工具类
import { uuid, pidConvertTree, useActiveComponent, setSettingPagesConfig, useConfig } from '@/utils/index'

// 引入样式

function Settings(props) {
	const { activeData, pagesRefList, settingLink } = props

	const pagesConfig = useSelector(state => state.pagesConfig)
	const dispatch = useDispatch()

	const [menuData, setMenuData] = useState(pidConvertTree(pagesConfig.menu))
	const [editData, setEditData] = useState(null)
	const [, activeComponentData] = useActiveComponent(activeData)

	const [config, setConfig] = useConfig(activeData, pagesRefList)

	useEffect(() => {
		setMenuData(pidConvertTree(pagesConfig.menu))
	}, [pagesConfig])

	function handleChange(c) {
		let newConfig = { ...config }
		for (let attr in c) {
			newConfig[attr] = c[attr]
		}
		setConfig(newConfig)
		setSettingPagesConfig(activeComponentData, c)
	}

	function handlePrev(data) {
		let menuIndex = null
		menuData.forEach((item, index) => {
			if (item.id == data.id) {
				menuIndex = index
			}
		})

		let nData = menuData[menuIndex - 1]

		let pIndex
		let nIndex

		pagesConfig.menu.forEach((item, index) => {
			if (item.id == nData.id) {
				pIndex = index
			}
			if (data.id == item.id) {
				nIndex = index
			}
		})
		let n = pagesConfig.menu[pIndex]
		pagesConfig.menu[pIndex] = pagesConfig.menu[nIndex]
		pagesConfig.menu[nIndex] = n
		dispatch({
			type: ActionTypes.SET_PAGESCONFIG,
			data: { ...pagesConfig },
		})
	}
	function handleNext(data) {
		let menuIndex = null
		menuData.forEach((item, index) => {
			if (item.id == data.id) {
				menuIndex = index
			}
		})

		let nData = menuData[menuIndex + 1]

		let pIndex
		let nIndex

		pagesConfig.menu.forEach((item, index) => {
			if (item.id == nData.id) {
				pIndex = index
			}
			if (data.id == item.id) {
				nIndex = index
			}
		})

		let n = pagesConfig.menu[pIndex]

		pagesConfig.menu[pIndex] = pagesConfig.menu[nIndex]
		pagesConfig.menu[nIndex] = n

		dispatch({
			type: ActionTypes.SET_PAGESCONFIG,
			data: { ...pagesConfig },
		})
	}

	if (!config) return null

	return (
		<>
			<Collapse.Item title="布局设置" open>
				<div className="layoutSetup-wrap setings-layout">
					<div className="layoutSetup-switch">
						<span>登录</span>
						<Radio.Group
							onChange={v => {
								handleChange({
									isButton: v,
								})
							}}
							checked={config.isButton}
						>
							<Radio value={true}>是</Radio>
							<Radio value={false}>否</Radio>
						</Radio.Group>
					</div>
				</div>
			</Collapse.Item>
			<Collapse.Item
				title="菜单"
				open
				extra={
					<PlusOutlined onClick={() => {
						let id = uuid()
						menuData.push({
							title: '',
							id: id,
							url: '',
						})
						setEditData(id)
						setMenuData([...menuData])
					}}/>
				}
			>
				<Tree
					dataSource={menuData}
					rowKey="id"
					onRow={(data, index, layer) => (
						<Item
							key={data.id}
							data={data}
							menuData={menuData}
							index={index}
							layer={layer}
							editData={editData}
							handlePrev={handlePrev}
							handleNext={handleNext}
							onChildren={() => {
								let id = uuid()
								if (!data.children) {
									data.children = []
								}
								data.children.push({
									title: '菜单名称',
									id: id,
									url: '',
									pid: data.id,
								})
								setEditData(id)
							}}
							onDelete={() => {
								setEditData(null)
							}}
							onSave={() => {}}
							settingLink={settingLink}
						/>
					)}
				/>
			</Collapse.Item>
		</>
	)
}

function Item(props) {
	const { data, menuData, index, layer, editData, onDelete, settingLink, onChildren, handlePrev, handleNext } = props
	const [edit, setEdit] = useState(false)
	const [editValue, setEditValue] = useState(data.name)

	const dispatch = useDispatch()
	const pagesConfig = useSelector(state => state.pagesConfig)

	useEffect(() => {
		setEdit(editData == data.id)
	}, [data, editData])

	return (
		<div className="setings-navbar-item">
			<div className="setings-navbar-item-content">
				{edit ? (
					<Input
						value={data.title}
						onChange={v => {
							setEditValue(v)
						}}
						onBlur={() => {
							if (!editValue) return
							if (editData) {
								// 新增
								dispatch({
									type: ActionTypes.ADD_MENU,
									data: {
										...data,
										title: editValue,
									},
								})
								onDelete()
							} else {
								let obj = data
								delete obj.children
								dispatch({
									type: ActionTypes.EDIT_MENU,
									data: {
										...obj,
										title: editValue,
									},
								})
								// 编辑
							}
							setEdit(false)
						}}
					/>
				) : (
					data.title
				)}
			</div>
			<div className="setings-navbar-item-edit">
				{/* <Operation>
					{index > 0 && layer == 0 && (
						<Operation.Item onClick={() => handlePrev(data)}>
							<UpOutlined />
						</Operation.Item>
					)}
					{index < menuData.length - 1 && layer == 0 && (
						<Operation.Item onClick={() => handleNext(data)}>
							<DownOutlined />
						</Operation.Item>
					)}

					<Operation.Popup position="bottom-right">
						<Operation.Item
							onClick={() => {
								onChildren()
							}}
						>
							添加子菜单
						</Operation.Item>
						<Operation.Item onClick={() => setEdit(!edit)}>重命名</Operation.Item>
						{!data.children && (
							<Operation.Item
								onClick={() => {
									let menuLink = pagesConfig.menu.filter(item => item.id == data.id)[0].link
									settingLink(menuLink, link => {
										pagesConfig.menu.forEach(item => {
											if (item.id == data.id) {
												item.link = _.cloneDeep(link)
											}
										})
										dispatch({
											type: ActionTypes.SET_PAGESCONFIG,
											data: { ...pagesConfig },
										})
									})
								}}
							>
								配置链接
							</Operation.Item>
						)}
						{data.link && (
							<Operation.Item
								onClick={() => {
									pagesConfig.menu.forEach(item => {
										if (item.id == data.id) {
											item.link = null
										}
									})
									dispatch({
										type: ActionTypes.SET_PAGESCONFIG,
										data: { ...pagesConfig },
									})
								}}
							>
								取消链接
							</Operation.Item>
						)}
						<Operation.Item
							onClick={() => {
								dispatch({
									type: ActionTypes.DEL_MENU,
									data,
								})
							}}
						>
							删除
						</Operation.Item>
					</Operation.Popup>
				</Operation> */}
			</div>
		</div>
	)
}

export default Settings
