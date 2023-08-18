import { useState } from 'react'

// 引入第三方依赖
import clsx from 'clsx'
import _ from 'lodash'
import { Select, Popover, Tooltip, ColorPicker } from 'antd'
import {
	FormOutlined,
	BoldOutlined,
	ItalicOutlined,
	UnderlineOutlined,
	FontColorsOutlined,
	AlignLeftOutlined,
	AlignCenterOutlined,
	AlignRightOutlined,
	LinkOutlined,
	LineHeightOutlined,
	DeleteOutlined
} from '@ant-design/icons';

// 引入工具类
import { handleRgbaColor } from '../../../../utils/index'

function TextToolbar(props) {
	const { target, onChange, setStyle, settingLink, setLink, scrollRef } = props

	const [fontSize] = useState(['12px', '13px', '14px', '15px', '16px', '19px', '20px', '24px', '28px', '32px', '40px', '48px'])
	const [lineHeight] = useState([
		{ label: 1, value: '1'},
		{ label: 1.5, value: '1'},
		{ label: 1.75, value: '1'},
		{ label: 2, value: '1'},
		{ label: 2.5, value: '1'},
		{ label: 3, value: '1'},
	])

	const handleLink = () => {
		settingLink(target.link, link => {
			setLink(_.cloneDeep(link))
		})
	}

	const isActive = (type, value) => {
		if (target && target.style) {
			return target.style[type] == value
		}
		return false
	}

	const getStyle = type => {
		if (target && target.style) {
			return target.style[type]
		}
		return null
	}

	return (
		<div className="toolbar">
			<div className="toolbar-type">文字</div>
			<div className="toolbar-items">
				<div
					className={clsx('toolbar-item', {})}
					onClick={() => {
						onChange('edit')
					}}
				>
					<FormOutlined />
				</div>
				<Select className="user-button"
					scrollRef={scrollRef.current}
					options={fontSize.map(item => ({
						label: item,
						value: item,
					}))}
					value={target && target.style && target.style.fontSize}
					placeholder={'字体大小'}
					onChange={value => {
						setStyle('fontSize', value)
					}}
				/>
				<div
					className={clsx('toolbar-item', {
						active: isActive('fontWeight', 'bold'),
					})}
					onClick={() => {
						setStyle('fontWeight', 'bold', isActive('fontWeight', 'bold'))
					}}
				>
					<BoldOutlined />
				</div>

				<div
					className={clsx('toolbar-item', {
						active: isActive('fontStyle', 'italic'),
					})}
					onClick={() => {
						setStyle('fontStyle', 'italic', isActive('fontStyle', 'italic'))
					}}
				>
					<ItalicOutlined />
				</div>

				<div
					className={clsx('toolbar-item', {
						active: isActive('textDecoration', 'underline'),
					})}
					onClick={() => {
						setStyle('textDecoration', 'underline', isActive('textDecoration', 'underline'))
					}}
				>
					<UnderlineOutlined />
				</div>

				<Popover
					content={
						<ColorPicker
							color={{ rgb: getStyle('color'), hex: getStyle('color') }}
							onChangeComplete={color => {
								setStyle('color', handleRgbaColor(color))
							}}
						/>
					}
					popupClassNmae="toolbar-color"
					placement="bottom"
					scrollRef={scrollRef.current}
				>
					<div className={clsx('toolbar-item', {})}>
						<FontColorsOutlined color={getStyle('color')} />
					</div>
				</Popover>

				<div
					className={clsx('toolbar-item', {
						active: isActive('textAlign', 'left'),
					})}
					onClick={() => {
						setStyle('textAlign', 'left', isActive('textAlign', 'left'))
					}}
				>
					<AlignLeftOutlined />
				</div>

				<div
					className={clsx('toolbar-item', {
						active: isActive('textAlign', 'center'),
					})}
					onClick={() => {
						setStyle('textAlign', 'center', isActive('textAlign', 'center'))
					}}
				>
					<AlignCenterOutlined />
				</div>

				<div
					className={clsx('toolbar-item', {
						active: isActive('textAlign', 'right'),
					})}
					onClick={() => {
						setStyle('textAlign', 'right', isActive('textAlign', 'right'))
					}}
				>
					<AlignRightOutlined />
				</div>

				<div
					className={clsx('toolbar-item', {
						active: isActive('textAlign', 'justify'),
					})}
					onClick={() => {
						setStyle('textAlign', 'justify', isActive('textAlign', 'justify'))
					}}
				>
					<AlignRightOutlined />
				</div>
				<Popover
					content={
						<Select className="user-button"
							scrollRef={scrollRef.current}
							options={lineHeight}
							value={target && target.style && target.style.lineHeight}
							placeholder={'行间距'}
							onChange={value => {
								setStyle('lineHeight', value)
							}}
						/>
					}
					scrollRef={scrollRef.current}
					placement="bottom"
				>
					<div className={clsx('toolbar-item', {})}>
						<LineHeightOutlined />
					</div>
				</Popover>
				<div
					className={clsx('toolbar-item', {
						active: target && target.link,
					})}
					onClick={handleLink}
				>
					<LinkOutlined />
				</div>
				{target && target.link && (
					<Tooltip tilte={'删除链接'} >
						<div className="toolbar-item" onClick={() => setLink(null)}>
							<DeleteOutlined />
						</div>
					</Tooltip>
				)}
			</div>
		</div>
	)
}

export default TextToolbar
