// react 依赖
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// 引入第三方依赖
import _ from 'lodash'


import { Tree, Input, Operation, Icon } from 'panda-design'

// 数据请求
//

// 引入redux定义
import * as ActionTypes from '@/actions/index'

// 引入工具类
import { uuid, pidConvertTree } from '@/utils/index'

// 引入样式

function Settings(props) {
	const { settingLink } = props

	const pagesConfig = useSelector(state => state.pagesConfig)

	return (
		<div className="setings-content">
			<div className="setings-header">
				<div className="setings-header-title">页脚 </div>
				<div className="setings-header-operation"></div>
			</div>
		</div>
	)
}

export default Settings
