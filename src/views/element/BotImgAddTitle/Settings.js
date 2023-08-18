// react 依赖
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// 引入第三方依赖
import _ from 'lodash'


import { Radio, Input, Operation, Icon, Checkbox, Collapse } from 'panda-design'

// 引入工具类
import { uuid, pidConvertTree, useActiveComponent, setSettingPagesConfig, useConfig } from '@/utils/index'

// 引入样式

function Settings(props) {
	const { children, activeData, activeElement, pagesRefList, settingLink } = props

	const pagesConfig = useSelector(state => state.pagesConfig)

	const [activeComponent, activeComponentData] = useActiveComponent(activeData)

	const [config, setConfig] = useConfig(activeData, pagesRefList)

	function handleChange(c) {
		let newConfig = { ...config }
		for (let attr in c) {
			newConfig[attr] = c[attr]
		}
		setConfig(newConfig)
		setSettingPagesConfig(activeComponentData, c)
	}

	if (!config) {
		return null
	}

	return <></>
}

export default Settings
