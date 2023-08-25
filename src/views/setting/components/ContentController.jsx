import { useState, useRef, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { useSelector, useDispatch, useStore } from 'react-redux';
import { setPagesConfig, setActiveElementId, setActiveElement } from '../../../redux/actions';

import { Spin } from 'antd';
import {
	DownOutlined,
	UpOutlined,
	DeleteOutlined
} from '@ant-design/icons';
import { throttle, cloneDeep } from 'lodash';

import Dray from './Dray';
import Popup from '../../../components/Popup';
import { TextToolbar, EditTextToolbar, ButtonToolbar, ImageToolbar } from './ToolBar';
import LinkModal from './LinkModal';
import * as element from '../../element';

import { uuid, findElement, findSelectElementTarget, findTargetIndex, setSettingPagesConfig } from '@utils';
import { useActiveComponent } from '@utils/hooks';

function ContentController(props) {
	const { onNavClick, pagesRefList } = props;
	const dispatch = useDispatch()
	const router = useLocation()
	const store = useStore()
	const pagesConfig = useSelector(state => state.pagesConfig)
	const activePageKey = useSelector(state => state.activePageKey)
	const { activeElement, activeElementId } = useSelector(state => state.activeElement)
	const activePage = useSelector(state => state.pagesConfig?.pages?.filter(item => item.url == state.activePageKey)[0])

	const [dropIndex,] = useState(1)

	// 配置链接
	const [linkVisible, setLinkVisible] = useState(false)

	// hover的组件
	const [hoverElementId, setHoverElementId] = useState(null);
	const [hoverElement, setHoverElement] = useState({ current: null })

	// 修改文字
	const [editTextData, setEditTextData] = useState(null)
	const [componentIndex, setComponentIndex] = useState(null)

	const [, activeComponentData] = useActiveComponent(activeElementId)

	

	const dragStart = useRef(null)
	const dragContent = useRef(null)
	const dragScroll = useRef(null)
	const settingLinkCallback = useRef(null)

	useEffect(() => {
		window.addEventListener('beforeunload', event => {
			event.preventDefault()
			event.returnValue = '退出后将丢失未保存的内容，是否退出？'
		})
	}, [])

	useEffect(() => {
		if (!router.query?.id) {
			return
		}
		if (router.query?.id == 'development') {
			return
		}
		// setLoading(true)
	}, [router.query?.id])

	// 修改配置
	const onPagesConfigChange = () => {
		setSettingPagesConfig(activeComponentData, null, store)
	}

	const onResetPagesConfig = () => {
		dispatch(setPagesConfig({
			...pagesConfig,
		}))
	}

	useEffect(() => {
		let theme = '#1565FF'

		if (pagesConfig?.config && pagesConfig.config?.theme) {
			theme = pagesConfig.config.theme
		}
		dragContent.current.style.setProperty('--website-theme-color', theme)
		document.querySelector(':root').style.setProperty('--website-theme-color', theme)
	}, [pagesConfig?.config?.theme])

	useEffect(() => {
		if (activeElementId) {
			setComponentIndex(activePage.content.indexOf(activePage.content.filter(item => item.id == activeElementId)[0]))
		} else {
			setComponentIndex(-1)
		}
	}, [activeElementId, activePage, activePageKey])

	// 修改的节点name
	const dataSetName = useMemo(() => {
		if (!activeElement?.current) return null
		return activeElement.current.dataset.name
	}, [activeElement])

	const findData = () => {
		if (!activeElementId || !activeComponentData) return
		let classify = activeElement.current.dataset.classify;
		let index = activeElement.current.dataset.index;

		if (pagesRefList.current[activeElementId].parameter.componentName != activeComponentData.componentName) return;
		if (classify == 'tabList') {
			return activeComponentData.props.config.tabList.list[index][dataSetName];
		} else if (classify == 'list') {
			return activeComponentData.props.config.list[index][dataSetName];
		} else {
			return activeComponentData.props[dataSetName];
		}
	}

	// 编辑的节点数据
	const editElementData = useMemo(() => {
		if (!dataSetName || !activeElement?.type) return null
		return findData()
	}, [dataSetName, activeElement, activeElementId, activeComponentData])

	const dropOndrop = e => {
		e.preventDefault()
		dragStart.current = false
		let pages = activePage.content
		let targetIndex = findTargetIndex(e, dragContent, activePage, pagesRefList)

		// 拖拽元素
		let drayType = e.dataTransfer.getData('drayType')
		let activeType = e.dataTransfer.getData('type')
		let avtiveName = e.dataTransfer.getData('name')
		let avtiveSubType = e.dataTransfer.getData('subtype')

		if (!avtiveName) return

		// 添加模板
		let template = {
			componentName: avtiveName,
			id: uuid(),
			componentType: activeType,
			props: cloneDeep(element[avtiveName].render.config),
			type: avtiveSubType,
		}

		if (drayType == 'add') {
			// 处理头部
			if (template.type == 'header') {
				let config = {
					...pagesConfig,
					config: {
						...pagesConfig.config,
						header: template,
					},
				}

				setPagesConfig({
					...pagesConfig,
					...config,
				})
			}

			// 处理尾部
			if (template.type == 'footer') {
				let config = {
					...pagesConfig,
					config: {
						...pagesConfig.config,
						footer: template,
					},
				}
				setPagesConfig({
					...pagesConfig,
					...config,
				})
			}

			// 其他情况
			if (template.type == 'component') {
				if (targetIndex >= 0) {
					pages.splice(targetIndex, 0, template)
				} else {
					pages.push(template)
				}

				onResetPagesConfig()
			}
		}
	}

	// 清空状态
	const clearPopup = () => {
		// setHoverElementId(null)
		// setHoverElement({ current: null })
		// setActiveElementId(null)
		// setActiveElement({ current: null })
		// setEditTextData(null)
	}

	// 清空移入状态
	const clearHoverPopup = () => {
		setHoverElementId(null)
	}

	// 点击选中组件
	const handleClick = e => {
		e.persist()
		// hover元素为空
		if (!hoverElementId) {
			clearPopup()
			return
		}

		dispatch(setActiveElementId(hoverElementId))
		dispatch(setActiveElement(hoverElement))
		onNavClick('editPanel')
	}

	// move 查询组件
	const handleMove = e => {
		e.persist()
		// 查找hover的组件
		let hoverPage = findElement(e, pagesRefList.current)
		if (!hoverPage) {
			// 没有hover的组件，清空状态
			setHoverElementId(null)
			return
		}
		// 设置hover的数组，并查询是否有子元素
		setHoverElementId(hoverPage.parameter.id)
		let ele = findSelectElementTarget(e, hoverPage.ref.current);
		setHoverElement(ele ? ele : { current: hoverPage.ref.current })
	}

	const handleEditText = e => {
		findData().text = e.target.innerHTML
		onPagesConfigChange()
	}

	// 设置图片
	const handleImg = e => {
		findData().url = e
		onPagesConfigChange()
	}

	// 编辑文本信息
	const handleStartEditText = () => {
		const style = window.getComputedStyle(activeElement.current, null);
		if (editTextData) {

			return
		}
		let edutData = {
			id: activeElementId,
			text: activeElement.current.innerHTML,
			name: dataSetName,
			style: {
				color: style['color'],
				textAlign: style['textAlign'],
				fontFamily: style['fontFamily'],
				letterSpacing: style['letterSpacing'],
				lineHeight: style['lineHeight'],
				fontSize: style['fontSize'],
				fontWeight: style['fontWeight'],
				textDecoration: style['textDecoration'],
			},
		}
		findData().style = edutData.style
		setEditTextData(edutData)
		activeElement.current.style.visibility = 'hidden'
	}

	// 设置样式
	const setStyle = (type, value, active) => {
		let target = findData()
		if (!target.style) {
			target.style = {}
		}
		if (active) {
			delete target.style[type]
		} else {
			target.style[type] = value
		}
		onPagesConfigChange()
	}

	const settingLink = (link, callback) => {
		setLinkVisible(true)
		settingLinkCallback.current = {
			link,
			callback,
		}
	}

	// 设置链接
	const setLink = link => {
		findData().link = link
		onPagesConfigChange()
	}

	// 向上移动
	const handlePrev = () => {
		let index = activePage.content.indexOf(activePage.content.filter(item => item.id == activeElementId)[0])
		activePage.content.splice(index - 1, 2, activePage.content[index], activePage.content[index - 1])
		clearPopup()
		onResetPagesConfig()
	}

	// 向下移动
	const handleNext = () => {
		let index = activePage.content.indexOf(activePage.content.filter(item => item.id == activeElementId)[0])
		activePage.content.splice(index, 2, activePage.content[index + 1], activePage.content[index])
		clearPopup()
		onResetPagesConfig()
	}

	const onDelete = () => {
		if (activeComponentData.type != 'component') return
		function deleteTemplate(ary, id) {
			for (let i = 0; i < ary.length; i++) {
				if (ary[i] && ary[i].id == id) {
					ary.splice(i, 1)
					return
				}
				if (ary[i] && ary[i].children) {
					deleteTemplate(ary[i].children, id)
				}
			}
		}
		deleteTemplate(activePage.content, activeElementId)
		clearPopup()
		onResetPagesConfig()
	}

	return (
		<Spin spinning={false} wrapperClassName="content-spin">
			<div className="drop" ref={dragScroll} style={{ transform: `scale(${dropIndex})` }}>
				<div className="drop-content" ref={dragContent}>
					<div
						className="drop-layer"
						onClick={e => {
							handleClick(e)
						}}
						onMouseMove={e => {
							throttle(() => handleMove(e), 100)(e)
						}}
						onMouseOver={() => { }}
						onMouseOut={() => {
							clearHoverPopup()
						}}
						onDragOver={e => {
							e.preventDefault()
						}}
						onDragLeave={e => {
							e.preventDefault()
						}}
						onDrop={dropOndrop}
					></div>
					{pagesConfig?.config?.header && (
						<Dray
							data={pagesConfig.config.header}
							hoverElementId={hoverElementId}
							ref={ref => {
								pagesRefList.current[pagesConfig.config.header.id] = ref
							}}
						/>
					)}
					<div className="page-content">
						{activePage &&
							activePage.content &&
							activePage.content.map((item, index) => {
								return (
									<Dray
										key={index}
										index={item.id}
										data={item}
										hoverElementId={hoverElementId}
										ref={ref => {
											pagesRefList.current[item.id] = ref
										}}
									/>
								)
							})}
					</div>
					{pagesConfig?.config?.footer && (
						<Dray
							data={pagesConfig.config.footer}
							hoverElementId={hoverElementId}
							ref={ref => {
								pagesRefList.current[pagesConfig.config.footer.id] = ref
							}}
						/>
					)}
				</div>
			</div>
			<Popup position="left" onClose={() => { }} refEl={activeElement} visible={!!activeElementId}>
				{activeComponentData && !activeElement.type && activeComponentData.type != 'header' && activeComponentData.type != 'footer' && (
					<div className="component-operation">
						{activeComponentData && activeComponentData.type == 'component' && (
							<>
								{componentIndex !== 0 && (
									<div className="item" onClick={handlePrev}>
										<UpOutlined />
									</div>
								)}
								{componentIndex != activePage.content.length - 1 && (
									<div className="item" onClick={handleNext}>
										<DownOutlined />
									</div>
								)}
							</>
						)}
						<div className="item" onClick={onDelete}>
							<DeleteOutlined />
						</div>
					</div>
				)}
			</Popup>
			<Popup className='element-popup' refEl={activeElement} visible={!!activeElementId}>
				<div className="element-active">
					<div className="item"></div>
					<div className="item"></div>
					<div className="item"></div>
					<div className="item"></div>
				</div>
			</Popup>
			<Popup className="toolbar-pupup" refEl={activeElement} visible={!!activeElementId}>
				{editTextData && (
					<EditTextToolbar
						onInput={handleEditText}
						onBlur={() => {
							activeElement.current.style.visibility = 'visible'
							dispatch(setActiveElementId(null))
							setEditTextData(null)
						}}
						style={editTextData.style}
						dangerouslySetInnerHTML={{ __html: editTextData.text }}
					/>
				)}
				{activeComponentData && activeElement && activeElement.type == 'img' && (
					<ImageToolbar
						target={editElementData}
						onChange={handleImg}
						settingLink={settingLink}
						setLink={setLink}
					/>
				)}
				{activeComponentData && activeElement && activeElement.type == 'text' && (
					<TextToolbar
						target={editElementData}
						onChange={handleStartEditText}
						setStyle={setStyle}
						settingLink={settingLink}
						setLink={setLink}
						scrollRef={dragScroll}
					/>
				)}
				{activeComponentData && activeElement && activeElement.type == 'button' && (
					<ButtonToolbar
						target={editElementData}
						onChange={handleStartEditText}
						setStyle={setStyle}
						settingLink={settingLink}
						setLink={setLink}
						scrollRef={dragScroll}
					/>
				)}
			</Popup>
			<LinkModal
				title="配置链接"
				visible={linkVisible}
				config={settingLinkCallback.current}
				onCancel={() => {
					setLinkVisible(false)
				}}
				onConfirm={data => {
					setLinkVisible(false)
					settingLinkCallback.current.callback(data)
					settingLinkCallback.current = null
				}}
			/>
		</Spin>
	)
}

export default ContentController;
