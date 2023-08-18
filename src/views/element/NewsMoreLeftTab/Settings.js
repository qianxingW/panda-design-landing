// react 依赖
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// 引入第三方依赖
import _ from 'lodash'


import { Tree, Input, Operation, Icon, Checkbox, Collapse, Select } from 'panda-design'

// 数据请求
import * as request from '@/request/request'

// 引入redux定义
import * as ActionTypes from '@/actions/index'

// 引入工具类
import { uuid, pidConvertTree, useActiveComponent, setSettingPagesConfig, useConfig } from '@/utils/index'

// 引入样式

function Settings(props) {
	const { children, activeData, activeElement, activePage, pagesRefList, settingLink } = props

	const pagesConfig = useSelector(state => state.pagesConfig)

	const [menuData, setMenuData] = useState(pidConvertTree(pagesConfig.menu))
	const [editData, setEditData] = useState(null)
	const [articleClassify, setArticleClassify] = useState([])

	const [activeComponent, activeComponentData] = useActiveComponent(activeData)

	const [config, setConfig] = useConfig(activeData, pagesRefList)

	const menuOption = useMemo(() => {
		return pagesConfig.pages.map(item => {
			return {
				label: item.name,
				value: item.url,
			}
		})
	}, [pagesConfig])

	useEffect(() => {
		request
			.hpMagrDisclosureArticleClassifyGetList()
			.then(res => {
				if (!res.data) return
				setArticleClassify(
					res.data.map(item => {
						return {
							label: item.artCustomizedType,
							value: item.primaryNum,
						}
					}),
				)
			})
			.catch(error => {})
	}, [])

	function handleChange(c) {
		activeComponentData.props = { ...c }
		setSettingPagesConfig(activeComponentData)
	}

	if (!config) return null

	return (
		<>
			<Collapse.Item title="数据源" open>
				<div className="setings-item-content setings-form">
					<Select
						value={config.query.artTypeList}
						options={articleClassify}
						multiple
						placeholder={'请选择分类'}
						onChange={value => {
							config.query.artTypeList = value
							handleChange(config)
						}}
					/>
				</div>
			</Collapse.Item>
			<Collapse.Item title="跳转地址" open>
				<div className="setings-item-content setings-form">
					<Select
						value={config.openLink.url}
						options={menuOption}
						placeholder={'请选择页面'}
						onChange={value => {
							config.openLink.url = value
							handleChange(config)
						}}
					/>
				</div>
			</Collapse.Item>
		</>
	)
}

export default Settings
