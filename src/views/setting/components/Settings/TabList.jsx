import { useState } from 'react'

import _, { } from 'lodash'

import { Input, Button } from 'antd'
import { handleImgUploadChange } from '@utils'
import clsx from 'clsx'

function TabList(props) {
	const { config, onChange } = props
	const [activeTabKey, setActiveTabKey] = useState(config.tabList.activeTabKey)
	const [edit, setEdit] = useState(null)

	function handleDelete(data) {
		if (config.tabList.list && config.tabList.list.length == 1) {
			return
		}
		let key = config.tabList.activeTabKey - 1
		let index = config.tabList.list.indexOf(data)
		config.tabList.list.splice(index, 1)
		config.tabList.activeTabKey = key < 0 ? 0 : key
		onChange(config)
	}

	function handleChange(e, data) {
		let index = config.tabList.list.indexOf(data)

		handleImgUploadChange(e, value => {
			config.tabList.list[index].url = value
			onChange(config)
		})
	}

	function handleAdd() {
		config.tabList.list.push(_.cloneDeep(config.appendData))
		onChange(config)
	}

	function handleActiveKey(key) {
		setActiveTabKey(key)
		config.tabList.activeTabKey = key
		onChange(config)
	}

	function handlePrev(data) {
		let index = config.tabList.list.indexOf(data)
		config.tabList.list.splice(index - 1, 2, config.tabList.list[index], config.tabList.list[index - 1])
		onChange(config)
	}
	function handleNext(data) {
		let index = config.tabList.list.indexOf(data)
		config.tabList.list.splice(index, 2, config.tabList.list[index + 1], config.tabList.list[index])
		onChange(config)
	}

	function handleBlur() {
		onChange(config)
	}
	// 按回车回显
	function handleKeyDown(v) {
		let e = window.event || v
		if (e.keyCode == 13) {
			onChange(config)
		}
	}
	return (
		<div className="setings-item-content setings-list">
			<div className="list">
				{config.tabList.list &&
					config.tabList.list.map((item, index) => {
						return (
							<div
								className={clsx('list-item', {
									'list-item-active': index == activeTabKey,
								})}
								key={index}
							>
								<div
									className="list-item-content"
									onClick={() => {
										handleActiveKey(index)
									}}
								>
									{edit == index ? (
										<Input className="user-input"
											value={item.name}
											onChange={v => {
												item.name = v
												// setEditValue(v)
											}}
											onBlur={handleBlur}
											onkeydown={handleKeyDown}
										/>
									) : (
										<span>{item.name}</span>
									)}
								</div>
								<div className="list-item-extra">
									{index > 0 && (
										<div className="list-item-extra-item" onClick={() => handlePrev(item)}>
											{/* <Icon name="shang" /> */}
										</div>
									)}
									{index < config.tabList.list.length - 1 && (
										<div className="list-item-extra-item" onClick={() => handleNext(item)}>
											{/* <Icon name="xia" /> */}
										</div>
									)}
									<label className="list-item-extra-item">
										{/* <Icon name="shangchuan" /> */}
										<input style={{ display: 'none' }} type="file" accept="image/*" onChange={e => handleChange(e, item)} />
									</label>
									<div className="list-item-extra-item" onClick={() => setEdit(index)}>
										{/* <Icon name="bianji" /> */}
									</div>
									<div className="list-item-extra-item" onClick={() => handleDelete(item)}>
										{/* <Icon name="shanchu" /> */}
									</div>
								</div>
							</div>
						)
					})}
				<div className="list-item-add">
					<Button className="user-button" type="dashed" icon="jiahao" onClick={handleAdd}>
						添加
					</Button>
				</div>
			</div>
		</div>
	)
}

export default TabList
