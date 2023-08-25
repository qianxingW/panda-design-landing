import { useMemo, useRef } from 'react'

// 引入组件列表
import * as element from '../../element'

import clsx from 'clsx'

function Dray(props) {
	const { data, hoverData } = props
	const ref = useRef(null)

	const WrappedComponent = useMemo(() => {
		// TUDO: 需要做配置信息和props的合并
		// let config = business[data.componentName].render.config;
		// handleConfig(data.props, config)
		return element[data.componentName]
	}, [data.componentName])

	if (!data || !WrappedComponent) return null

	const wrappedComponentData = {
		'data-id': data.id,
		'data-name': data.componentName,
		'data-type': data.componentType,
	}

	return (
		<div
			className={clsx('drag-area-group', {
				'drag-area-group-hover': hoverData == data.id,
				[`dary-${data.id}`]: true,
			})}
			{...wrappedComponentData}
			ref={ref}
		>
			<WrappedComponent {...data.props} />
		</div>
	)
}

export default Dray
