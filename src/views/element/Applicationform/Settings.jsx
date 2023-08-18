import { useEffect, useState } from 'react'

import { Input, Collapse} from 'antd'
import {
	FormOutlined
} from '@ant-design/icons'

// 引入工具类
import { setSettingPagesConfig } from '@utils'
import { useActiveComponent, useConfig } from '@utils/hooks'

import './index.scss'

function Settings(props) {
	const { activeData, activeElement, pagesRefList } = props

	const [, activeComponentData] = useActiveComponent(activeData)

	const [config, setConfig] = useConfig(null)

	useEffect(() => {
		if (!activeData) return
		if (activeElement.type) {
			setConfig(pagesRefList[activeData].ref.current[activeElement.current.dataset.name])
			return
		}
		setConfig(pagesRefList[activeData].props)
	}, [pagesRefList, activeData, activeElement])

	function handleChange(c) {
		let newConfig = { ...config }
		for (let attr in c) {
			newConfig[attr] = c[attr]
		}
		setConfig(newConfig)
		setSettingPagesConfig(activeComponentData, c)
	}
	if (!config) return null

	return (
		<>
			<Collapse.Item title="表单项名称" open>
				<TabList
					config={config}
					onChange={e => {
						handleChange(e)
					}}
				></TabList>
			</Collapse.Item>
		</>
	)
}

function TabList(props) {
	const { config, onChange } = props

	const [edit, setEdit] = useState({ name: false, phone: false, companyName: false })

	function handleActiveKey() {
		onChange(config)
	}

	const inputPlaceholder = Object.entries(config.inputPlaceholder)

	return (
		<div className="form-setings-content">
			{inputPlaceholder.map(item => {
				return (
					<div className="list-item" key={item} >
						<div
							className="list-item-content"
							onClick={() => {
								handleActiveKey()
							}}
						>
							{edit[item[0]] ? (
								<Input
									value={item[1]}
									onChange={v => {
										config.inputPlaceholder[item[0]] = v || '请输入'
									}}
									onBlur={() => onChange(config)}
								/>
							) : (
								<span>{item[1]}</span>
							)}
						</div>
						<div className="list-item-extra">
							<div className="list-item-extra-item" onClick={() => setEdit({ [item[0]]: true })}>
								<FormOutlined />
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default Settings
