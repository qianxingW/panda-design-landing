import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setPagesConfig, addMenu, delMenu, editMenu } from '../../../redux/actions'

import { Tree, Input, Collapse, Dropdown } from 'antd'
import {
	PlusOutlined,
	UpOutlined,
	DownOutlined,
	EllipsisOutlined
} from '@ant-design/icons';

import _ from 'lodash'

// 引入工具类
import { uuid, pidConvertTree } from '@utils'
import { useConfig } from '@utils/hooks'

function Settings(props) {
	const { activeData, pagesRefList, settingLink } = props

	const pagesConfig = useSelector(state => state.pagesConfig)

	const [menuData, setMenuData] = useState(pidConvertTree(pagesConfig.menu))
	const [editData, setEditData] = useState(null)

	const [config] = useConfig(activeData, pagesRefList)

	useEffect(() => {
		setMenuData(pidConvertTree(pagesConfig.menu))
	}, [pagesConfig])

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
		// dispatch({
		// 	type: ActionTypes.SET_PAGESCONFIG,
		// 	data: { ...pagesConfig },
		// })
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

		// dispatch({
		// 	type: ActionTypes.SET_PAGESCONFIG,
		// 	data: { ...pagesConfig },
		// })
	}

	if (!config) return null

	return (
		<Collapse
			bordered={false}
			items={[
				{
					key: '1',
					label: '菜单',
					children: <Tree
						treeData={menuData}
						rowKey="id"
						titleRender={(data) => (
							<Item
								key={data.id}
								data={data}
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
								settingLink={settingLink}
							/>
						)}
					/>,
					extra: <PlusOutlined onClick={() => {
						let id = uuid()
						menuData.push({
							title: '',
							id: id,
							url: '',
						})
						setEditData(id)
						setMenuData([...menuData])
					}} />,
				}
			]}
		/>
	)
}

function Item(props) {
	const { data, editData, onDelete, settingLink, onChildren, handlePrev, handleNext } = props

	const [edit, setEdit] = useState(false)
	const [editValue, setEditValue] = useState(data.name)
	const dispatch = useDispatch()
	const pagesConfig = useSelector(state => state.pagesConfig)

	useEffect(() => {
		setEdit(editData == data.id)
	}, [data, editData])

	const items = [
		{
			key: 'add',
			label: "添加子菜单",
		},
		{
			key: 'rename',
			label: "重命名",
		},
		{
			key: 'setLink',
			label: "配置链接",
		},
		{
			key: 'cancelLink',
			label: "取消链接",
		},
		{
			key: 'del',
			label: "删除",
		}
	];

	const onClick = ({ key }) => {
		switch (key) {
			case 'add':
				onChildren()
				break;
			case 'rename':
				setEdit(!edit)
				break;
			case 'setLink':
				// eslint-disable-next-line no-case-declarations
				const menuLink = pagesConfig.menu.filter(item => item.id == data.id)[0].link;
				settingLink(menuLink, link => {
					pagesConfig.menu.forEach(item => {
						if (item.id == data.id) {
							item.link = _.cloneDeep(link)
						}
					})
					dispatch(setPagesConfig({ ...pagesConfig }))
				})
				break;
			case 'cancelLink':
				pagesConfig.menu.forEach(item => {
					if (item.id == data.id) {
						item.link = null
					}
				})
				dispatch(setPagesConfig({ ...pagesConfig }))
				break;
			case 'del':
				dispatch(delMenu(data))
				break;
			default:
				break;
		}
	}

	return (
		<div className="setings-navbar-item">
			<div className="setings-navbar-item-content">
				{edit ? (
					<Input
						value={data.title}
						onChange={e => {
							setEditValue(e.target.value)
						}}
						onBlur={() => {
							if (!editValue) return
							if (editData) {
								// 新增
								dispatch(addMenu({
										...data,
										title: editValue,
									}))
								onDelete()
							} else {
								let obj = data
								delete obj.children
								dispatch(editMenu({
										...obj,
										title: editValue,
									}))
							}
							setEdit(false)
						}}
					/>
				) : (
					data.title
				)}
			</div>
			<div className="setings-navbar-item-edit">
				{(
					<UpOutlined onClick={() => handlePrev(data)} />
				)}
				{(
					<DownOutlined onClick={() => handleNext(data)} />
				)}
				<Dropdown menu={{ items, onClick }}>
					<EllipsisOutlined />
				</Dropdown>
			</div>
		</div>
	)
}

export default Settings
