import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Drawer, Input, Dropdown } from 'antd';
import {
  PlusCircleOutlined,
  EllipsisOutlined
} from '@ant-design/icons';
import clsx from 'clsx'

function Item(props) {
	const pagesConfig = useSelector(state => state.pagesConfig)

	const { data = {}, onDelete, editData, onChange, index, ...prop } = props
	const [edit, setEdit] = useState(false)
	const [editValue, setEditValue] = useState(data.name)

	const dispatch = useDispatch()

	const activePageKey = useSelector(state => state.activePageKey)

	useEffect(() => {
		if (editData) {
			setEdit(true)
		} else {
			setEdit(false)
		}
	}, [editData])

  const items = [
    {
      key: '1',
      label: "编辑",
    },
    {
      key: '2',
      label: "删除",
    }
  ];

	return (
		<div
			className={clsx('addPage-item', {
				active: activePageKey && activePageKey.name == data.name,
			})}
		>
			<div className="addPage-item-content">
				{!edit && (
					<div
						className="addPage-item-text"
						onClick={() => {
							if (edit) return
							onChange()
							// setActivePage(data.url)
						}}
					>
						{data.name}
					</div>
				)}
				{edit && (
					<Input
						value={editValue}
						onChange={v => {
							setEditValue(v)
						}}
						onBlur={v => {
							if (editValue) {
								if (editData) {
									// dispatch({
									// 	type: ActionTypes.ADD_PAGESCONFIG,
									// 	data: {
									// 		name: editValue,
									// 		url: uuid(),
									// 		content: [],
									// 	},
									// })
								} else {
									// dispatch({
									// 	type: ActionTypes.EDIT_PAGESCONFIG,
									// 	data: {
									// 		...data,
									// 		name: editValue,
									// 		content: data.content,
									// 	},
									// })
								}
								setEdit(false)
								onDelete()
							} else {
								onDelete()
							}
						}}
					/>
				)}
			</div>
			<div className="addPage-item-edit">
        <Dropdown menu={{ items }}>
        <EllipsisOutlined />
        </Dropdown>
				{/* <Operation menu={{ items }}>
					<Operation.Popup position="bottom-left">
						<Operation.Item onClick={() => setEdit(!edit)}>编辑</Operation.Item>
						{data.url != homeUrl && (
							<Operation.Item
								onClick={() => {
									Modal.confirm({
										title: '提示',
										content: '删除后无法恢复，是否继续？',
										className: 'user-modal-confirm',
										onCancel: () => {},
										onConfirm: () => {
											let prev = pagesConfig.pages[index - 1].url

											dispatch({
												type: ActionTypes.SET_ACTIVEPAGEKEY,
												data: prev,
											})
											dispatch({
												type: ActionTypes.DEL_PAGESCONFIG,
												data: data,
											})
										},
									})
								}}
							>
								删除
							</Operation.Item>
						)}
					</Operation.Popup> */}
				{/* </Operation> */}
			</div>
		</div>
	)
}

const AddPage = (props) => {
  const dispatch = useDispatch()
	const pagesConfig = useSelector(state => state.pagesConfig)

	const { onChange } = props

	const [editData, setEditData] = useState(null)

	const [search, setSearch] = useState('')

  return (
    <Drawer
      title="网站页面"
      placement="left"
      width={320}
      open={false}
      mask={false}
      onCancel={() => {
        // setComponentDrawerVisible(false);
      }}
      onConfirm={() => {
        // setComponentDrawerVisible(false);
      }}
    >
      <div className="addPage">
			<div className={'addPage-search'}>
				<div className="addPage-search-input">
					<Input
						icon={<PlusCircleOutlined />}
						onChange={v => {
							setSearch(v)
						}}
						onInput={v => {}}
					/>
				</div>
				<div className="addPage-add">
					<PlusCircleOutlined
						onClick={() => {
							setEditData({
								name: '',
								url: '',
								type: 'edit',
							})
						}}
					/>
				</div>
			</div>
			<div className="addPage-list">
				{pagesConfig?.pages?.filter(item => {
						if (!search) {
							return item
						} else {
							if (item.name.indexOf(search) != -1) {
								return item
							}
						}
					})
					.map((item, index) => (
						<Item
							data={item}
							key={index}
							index={index}
							onChange={onChange}
							onDelete={() => {
								setEditData(null)
							}}
						/>
					))}
				{editData && (
					<Item
						editData={editData}
						data={editData}
						onChange={onChange}
						onDelete={() => {
							setEditData(null)
						}}
					/>
				)}
			</div>
		</div>
    </Drawer>
  )
}

export default AddPage;
