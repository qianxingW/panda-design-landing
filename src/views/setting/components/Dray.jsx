// react 依赖
import React, { useRef, useImperativeHandle, useMemo } from 'react'

// 引入组件列表
import * as element from '../../element'
// import * as components from '@/components/index'

import clsx from 'clsx'

const Dray = (props, ref) => {
	const { data, hoverData} = props

	const areaRef = useRef(null)
	const componentRef = useRef(null)

	// const WrappedComponent = useWrappedComponent(data,components)

	const WrappedComponent = useMemo(() => {
		// TUDO: 需要做配置信息和props的合并
		let config = element[data.componentName].render.config
		// handleConfig(data.props, config);
		return element[data.componentName] || components[data.componentName]
	}, [data.componentName])

	const wrappedComponentData = {
		'data-id': data.id,
		'data-name': data.componentName,
		'data-type': data.componentType,
	}

	useImperativeHandle(ref, () => {
		return {
			ref: areaRef,
			props: componentRef.current,
			parameter: data,
		}
	})

	if (!WrappedComponent) return null

	return (
		<div
			className={clsx('drag-area-group', {
				'drag-area-group-hover': hoverData === data.id,
				[`dary-${data.id}`]: true,
			})}
			{...wrappedComponentData}
			ref={areaRef}
		>
			<div className="drag-area-top"></div>
			<div className="drag-area-left"></div>
			<div className="drag-area-right"></div>
			<div className="drag-area-bottom"></div>
			<WrappedComponent ref={componentRef} {...data.props} />
		</div>
	)
}

export default React.forwardRef(Dray)
