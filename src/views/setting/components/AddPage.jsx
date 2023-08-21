import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPagesConfig, editPagesConfig, delPagesConfig, setActivePageKey } from '../../../redux/actions';
import { homeUrl } from '../../../redux/template.config';

import { Drawer, Input, Dropdown, Modal } from 'antd';
import {
	PlusCircleOutlined,
	EllipsisOutlined
} from '@ant-design/icons';

import { uuid } from '@utils';
import clsx from 'clsx'

function Item(props) {
	const pagesConfig = useSelector(state => state.pagesConfig)
	const activePageKey = useSelector(state => state.activePageKey)
	const dispatch = useDispatch()
	const { data = {}, onDelete, editData, onChange, index } = props
	const [edit, setEdit] = useState(false)
	const [editValue, setEditValue] = useState(data.name)

	useEffect(() => {
		if (editData) {
			setEdit(true)
		} else {
			setEdit(false)
		}
	}, [editData])

	const items = [
		{
			key: 'edit',
			label: "编辑",
		},
		{
			key: 'del',
			label: "删除",
		}
	];

	const onClick = ({ key }) => {
		if(key === 'edit') {
			setEdit(!edit);
		} else {
			if(data.url != homeUrl) return;

			Modal.confirm({
				title: '提示',
				content: '删除后无法恢复，是否继续？',
				className: 'user-modal-confirm',
				onCancel: () => {},
				onConfirm: () => {
					let prev = pagesConfig.pages[index - 1].url
					dispatch(setActivePageKey(prev));
					dispatch(delPagesConfig(data));
				},
			})
		}
	}

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
							dispatch(setActivePageKey(data.url))
						}}
					>
						{data.name}
					</div>
				)}
				{edit && (
					<Input
						value={editValue}
						onChange={e => {
							setEditValue(e.target.value)
						}}
						onBlur={() => {
							if (editValue) {
								if (editData) {
									dispatch(addPagesConfig({
										name: editValue,
										url: uuid(),
										content: [],
									}))
								} else {
									dispatch(editPagesConfig({
										...data,
										name: editValue,
										content: data.content,
									}))
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
				<Dropdown menu={{ items, onClick }}>
					<EllipsisOutlined />
				</Dropdown>
			</div>
		</div>
	)
}

const AddPage = (props) => {
	const pagesConfig = useSelector(state => state.pagesConfig)

	const { onChange, open, onCloseDrawer } = props

	const [editData, setEditData] = useState(null)
	const [search, setSearch] = useState('')

	return (
		<Drawer
			className='panda-drawer'
			title="网站页面"
			placement="left"
			width={320}
			open={open}
			mask={false}
			onClose={onCloseDrawer}
		>
			<div className="addPage">
				<div className={'addPage-search'}>
					<div className="addPage-search-input">
						<Input
							icon={<PlusCircleOutlined />}
							onChange={v => {
								setSearch(v)
							}}
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
