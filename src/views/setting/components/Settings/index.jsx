// react 依赖
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Collapse } from 'antd'

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

function SettingContainer(props) {
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

	if (!config) return null;

	const setingConfig = [
		{
			label: '布局',
			key: 'layout',
			Component: Layout,
		},
		{
			label: '主题',
			key: 'theme',
			Component: Theme,
		},
		{
			label: '样式',
			key: 'style',
			Component: Style,
		},
		{
			label: '列表',
			key: 'list',
			Component: List,
		},
		{
			label: '标签分类',
			key: 'tabList',
			Component: TabList,
		}
	]

	const items= setingConfig.map((item) => {
		const { key, label, Component } = item;

		if (config && !activeElement.type && config[key] !== undefined) {
			return {
				key: key,
				label: label,
				children: <Component
					config={config}
					onChange={e => {
						handleChange(e)
					}} />,
			}
		}

		return {}
	})

	return (
		<div className="setings-content">
			{children}
			{config && activeElement.type && activeElement.type == 'button' && (
					<ButtonStyle
						config={config}
						onChange={e => {
							handleChange(e)
						}}
					/>
				)}
			<Collapse
				bordered={false}
				items={items}
			/>
		</div>
	)
}

export default SettingContainer
