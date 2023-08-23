// react 依赖
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import {  Collapse } from 'antd'

import { setSettingPagesConfig } from '@utils'
import { useActiveComponent } from '@utils/hooks'
// 引入样式
import './index.scss'

// 引入组件
import Theme from './Theme'
import Layout from './Layout'
import Style from './Style'
import List from './List'
import TabList from './TabList'
import ButtonStyle from './ButtonStyle'

function Settings(props) {
	const { children, pagesRefList } = props;
	const { activeElement, activeElementId } = useSelector(state => state.activeElement)
	const [, activeComponentData] = useActiveComponent(activeElementId)

	const [config, setConfig] = useState(null)

	useEffect(() => {
		if (!activeElementId) return
		if (activeElement.type) {
			setConfig(pagesRefList[activeElementId].props[activeElement.current.dataset.name])
			return
		}
		setConfig(pagesRefList[activeElementId].props.config)
	}, [pagesRefList, activeElementId, activeElement])

	function handleChange(c) {
		if (activeElement.type) {
			activeComponentData.props[activeElement.current.dataset.name] = { ...c }
		} else {
			activeComponentData.props.config = { ...c }
		}
		setSettingPagesConfig(activeComponentData)
	}

	if (!config) return null

	return (
		<div className="setings-content">
			<Collapse noBorder>
				{children}
				{config && activeElement.type && activeElement.type == 'button' && (
					<ButtonStyle
						config={config}
						onChange={e => {
							handleChange(e)
						}}
					/>
				)}
				{/* {config&& !activeElement.type && config.size != undefined && <Collapse.Item title='尺寸' open></Collapse.Item>} */}
				{/* {config&& !activeElement.type && config.align != undefined && <Collapse.Item title='布局' open></Collapse.Item>} */}
				{config && !activeElement.type && config.layout !== undefined && (
					<Collapse.Item title="布局" open>
						<Layout
							config={config}
							onChange={e => {
								handleChange(e)
							}}
						/>
					</Collapse.Item>
				)}
				{config && !activeElement.type && config.theme !== undefined && (
					<Collapse.Item title="主题" open>
						<Theme
							config={config}
							onChange={e => {
								handleChange(e)
							}}
						/>
					</Collapse.Item>
				)}
				{config && !activeElement.type && config.style !== undefined && (
					<Collapse.Item title="样式设置" open>
						<Style
							config={config}
							onChange={e => {
								handleChange(e)
							}}
						/>
					</Collapse.Item>
				)}
				{config && !activeElement.type && config.list !== undefined && (
					<Collapse.Item title="列表" open>
						<List
							config={config}
							onChange={e => {
								handleChange(e)
							}}
						></List>
					</Collapse.Item>
				)}
				{config && !activeElement.type && config.tabList !== undefined && (
					<Collapse.Item title="标签分类" open>
						<TabList
							config={config}
							onChange={e => {
								handleChange(e)
							}}
						></TabList>
					</Collapse.Item>
				)}
			</Collapse>
		</div>
	)
}

export default Settings
