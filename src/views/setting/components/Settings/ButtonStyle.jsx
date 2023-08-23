import { useEffect, useState } from 'react'
import {  Collapse, Tabs, Popover, Radio, ColorPicker } from 'antd'

// 引入工具类
import { handleRgbaColor } from '@utils'

function ButtonStyle(props) {
	const { config, onChange } = props

	const { defaultStyle = {}, hoverStyle = {}, type = 'default' } = config

	const [activeTabKey, setActiveTabKey] = useState(1)
	const [activeTabKeyDefault, setActiveTabKeyDefault] = useState(1)
	const [activeTabKeyHover, setActiveTabKeyHover] = useState(1)

	const [borderColor, setBorderColor] = useState(defaultStyle.borderColor || '')
	const [backgroundColor, setBackgroundColor] = useState(defaultStyle.backgroundColor || '')
	const [textColor, setTextColor] = useState(defaultStyle.textColor || '')
	const [hoverBorderColor, setHoverBorderColor] = useState(hoverStyle.borderColor || '')
	const [hoverBackgroundColor, setHoverBackgroundColor] = useState(hoverStyle.backgroundColor || '')
	const [hoverTextColor, setHoverTextColor] = useState(hoverStyle.borderColor || '')

	useEffect(() => {
		if (!config.defaultStyle) {
			config.defaultStyle = {}
		}
		if (!config.hoverStyle) {
			config.hoverStyle = {}
		}
	}, [config])

	return (
		<>
			<Collapse.Item title="类型" open>
				<div className="setings-item-content setings-layout">
					<div className="layoutSetup-wrap">
						<div className="layoutSetup-switch">
							<span>按钮类型</span>
							<Radio.Group
								onChange={v => {
									config.type = v
									config.defaultStyle = {}
									config.hoverStyle = {}
									setBorderColor('')
									setBackgroundColor('')
									setTextColor('')
									setHoverBorderColor('')
									setHoverBackgroundColor('')
									setHoverTextColor('')
									onChange(config)
								}}
								checked={type}
							>
								<Radio value={'default'}>镂空</Radio>
								<Radio value={'primary'}>主题</Radio>
							</Radio.Group>
						</div>
					</div>
				</div>
			</Collapse.Item>
			<Collapse.Item title="样式设置" open>
				<div className="setings-item-content setings-style">
					<Tabs
						className="type-tab"
						tabList={[
							{
								key: '1',
								name: '默认',
							},
							{
								key: '2',
								name: 'hover',
							},
						]}
						activeTabKey={activeTabKey}
						changeTabKey={key => setActiveTabKey(key)}
					>
						<div>
							<Tabs
								layout="horizontal"
								tabList={[
									{
										key: '1',
										// name: <Icon size={16} name="border" />,
									},
									{
										key: '2',
										// name: <Icon size={16} name="seban" />,
									},
									{
										key: '3',
										// name: <Icon size={16} name="icon-fontcolor" />,
									},
								]}
								activeTabKey={activeTabKeyDefault}
								changeTabKey={key => setActiveTabKeyDefault(key)}
							>
								<div style={{ padding: 16 }}>
									<Popover
										position="bottom"
										content={
											<ColorPicker
												color={borderColor}
												onChangeComplete={color => {
													setBorderColor(color.rgb)
													config.defaultStyle.borderColor = handleRgbaColor(color)
													onChange(config)
												}}
											/>
										}
										popupClassNmae="toolbar-color"
									>
										<div className="seting-theme-color-box" style={{ backgroundColor: borderColor }}></div>
									</Popover>
								</div>
								<div style={{ padding: 16 }}>
									<Popover
										position="bottom"
										content={
											<ColorPicker
												color={backgroundColor}
												onChangeComplete={color => {
													setBackgroundColor(color.rgb)
													config.defaultStyle.backgroundColor = handleRgbaColor(color)
													onChange(config)
												}}
											/>
										}
										popupClassNmae="toolbar-color"
									>
										<div className="seting-theme-color-box" style={{ backgroundColor: backgroundColor }}></div>
									</Popover>
								</div>
								<div style={{ padding: 16 }}>
									<Popover
										position="bottom"
										content={
											<ColorPicker
												color={textColor}
												onChangeComplete={color => {
													setTextColor(color.rgb)
													config.defaultStyle.textColor = handleRgbaColor(color)
													onChange(config)
												}}
											/>
										}
										popupClassNmae="toolbar-color"
									>
										<div className="seting-theme-color-box" style={{ backgroundColor: textColor }}></div>
									</Popover>
								</div>
							</Tabs>
						</div>
						<div>
							<Tabs
								layout="horizontal"
								tabList={[
									{
										key: '1',
										// name: <Icon size={16} name="border" />,
									},
									{
										key: '2',
										// name: <Icon size={16} name="seban" />,
									},
									{
										key: '3',
										// name: <Icon size={16} name="icon-fontcolor" />,
									},
								]}
								activeTabKey={activeTabKeyHover}
								changeTabKey={key => setActiveTabKeyHover(key)}
							>
								<div style={{ padding: 16 }}>
									<Popover
										position="bottom"
										content={
											<ColorPicker
												color={hoverBorderColor}
												onChangeComplete={color => {
													setHoverBorderColor(color.rgb)
													config.hoverStyle.borderColor = handleRgbaColor(color)
													onChange(config)
												}}
											/>
										}
										popupClassNmae="toolbar-color"
									>
										<div className="seting-theme-color-box" style={{ backgroundColor: hoverBorderColor }}></div>
									</Popover>
								</div>
								<div style={{ padding: 16 }}>
									<Popover
										position="bottom"
										content={
											<ColorPicker
												color={hoverBackgroundColor}
												onChangeComplete={color => {
													setHoverBackgroundColor(color.rgb)
													config.hoverStyle.backgroundColor = handleRgbaColor(color)
													onChange(config)
												}}
											/>
										}
										popupClassNmae="toolbar-color"
									>
										<div className="seting-theme-color-box" style={{ backgroundColor: hoverBackgroundColor }}></div>
									</Popover>
								</div>
								<div style={{ padding: 16 }}>
									<Popover
										position="bottom"
										content={
											<ColorPicker
												color={hoverTextColor}
												onChangeComplete={color => {
													setHoverTextColor(color.rgb)
													config.hoverStyle.textColor = handleRgbaColor(color)
													onChange(config)
												}}
											/>
										}
										popupClassNmae="toolbar-color"
									>
										<div className="seting-theme-color-box" style={{ backgroundColor: hoverTextColor }}></div>
									</Popover>
								</div>
							</Tabs>
						</div>
					</Tabs>
				</div>
			</Collapse.Item>
		</>
	)
}

export default ButtonStyle
