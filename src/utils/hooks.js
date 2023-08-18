import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// 引入组件列表
import * as element from '../views/element'

export const useActiveComponent = activeData => {
	const pagesConfig = useSelector(state => state.pagesConfig)
	const activePage = useSelector(state => state.pagesConfig.pages.filter(item => item.url == state.activePageKey)[0])

	const [component, setComponent] = useState(null)
	const [componentData, setComponentData] = useState(null)

	const findComponent = key => {
		if (pagesConfig.config.header) {
			if (pagesConfig.config.header.id == key) {
				setComponent(Object.assign({}, element[pagesConfig.config.header.componentName]))
				setComponentData({ ...pagesConfig.config.header })
				return
			}
		}
		if (pagesConfig.config.footer) {
			if (pagesConfig.config.footer.id == key) {
				setComponent(Object.assign({}, element[pagesConfig.config.footer.componentName]))
				setComponentData({ ...pagesConfig.config.footer })
				return
			}
		}
		let item = activePage.content.filter(item => item.id == key)[0]
		if (item) {
			setComponent({ ...element[item.componentName] })
			setComponentData({
				...activePage.content.filter(item => item.id == key)[0],
			})
		} else {
			setComponent(null)
			setComponentData(null)
		}
	}

	useEffect(() => {
		if (!activeData) {
			setComponent(null)
			setComponentData(null)
			return
		}
		findComponent(activeData)
	}, [activeData])

	return [component, componentData]
}

export const useConfig = (activeData, pagesRefList) => {
	const [config, setConfig] = useState(activeData ? pagesRefList[activeData].props : null)

	useEffect(() => {
		if (!activeData) return
		setConfig(pagesRefList[activeData].props)
	}, [pagesRefList, activeData])

	return [config, setConfig]
}