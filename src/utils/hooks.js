import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPagesConfig } from '../redux/actions';

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

/**
 * 根据url获取key
 * @param {*} url 
 * @returns 
 */
export const useActivePage = (url) => {
	const pagesConfig = useSelector(state => state.pagesConfig)
	let activePageKey = pagesConfig.pages.filter(item => {
		if (item.url === url) {
			return item
		}
	})[0].url;

	return [activePageKey]
}

/**
 * 修改组件子节点信息
 * @param {*} activeComponentData 
 * @param {*} configItem 
 * @param {*} store 
 */
export const useSetSettingPagesConfig = () => {
	const pagesConfig = useSelector(state => state.pagesConfig)
	const activePage = useSelector(state => state.pagesConfig.pages.filter(item => item.url == state.activePageKey)[0])
	const dispatch = useDispatch()

	function setSettingPagesConfig(activeComponentData, configItem) {
		if (configItem) {
			if (activeComponentData.type == 'header') {
				for (let attr in configItem) {
					pagesConfig.config.header.props[attr] = configItem[attr]
				}
			}
			if (activeComponentData.type == 'footer') {
				for (let attr in configItem) {
					pagesConfig.config.footer.props[attr] = configItem[attr]
				}
			}
			if (activeComponentData.type == 'component') {
				let c = activePage.content.filter(item => item.id == activeComponentData.id)[0]
				for (let attr in configItem) {
					c.props[attr] = configItem[attr]
				}
			}
		} else {
			if (activeComponentData.type == 'header') {
				pagesConfig.config.header.props = activeComponentData.props
			}
			if (activeComponentData.type == 'footer') {
				pagesConfig.config.footer.props = activeComponentData.props
			}
			if (activeComponentData.type == 'component') {
				activePage.content.filter(item => item.id == activeComponentData.id)[0].props = activeComponentData.props
			}
		}
		dispatch(setPagesConfig({...pagesConfig}))
	}

	return [setSettingPagesConfig]
}