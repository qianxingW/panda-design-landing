import { useEffect, useState } from 'react'
import { Collapse, Tabs, Radio, ColorPicker } from 'antd'
import {
	BorderOutlined,
	BgColorsOutlined,
	FontColorsOutlined,
} from '@ant-design/icons';

// 引入工具类
import { handleRgbaColor } from '@utils'

const ButtonStyle = (props) => {
	const { config, onChange } = props

	const { defaultStyle = {}, hoverStyle = {}, type = 'default' } = config

	const [activeKey, setActiveTabKey] = useState('default')
	const [activeTabKeyDefault, setActiveTabKeyDefault] = useState('de-border')
	const [activeTabKeyHover, setActiveTabKeyHover] = useState('hover-border')

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
		<Collapse
			bordered={false}
			items={[
				{
					key: 'leixing',
					label: '类型',
					children: <div className="setings-item-content setings-layout">
						<div className="layoutSetup-wrap">
							<div className="layoutSetup-switch">
								<span>按钮类型</span>
								<Radio.Group
									onChange={e => {
										const { value } = e.target;
										config.type = value
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
				},
				{
					key: 'style',
					label: '样式设置',
					children: <div className="setings-item-content setings-style">
						<Tabs
							className="type-tab"
							items={[
								{
									key: 'default',
									label: '默认',
									children: <div>
										<Tabs
											tabPosition="left"
											items={[
												{
													key: 'de-border',
													label: <BorderOutlined />,
													children: <ColorPicker
														className='theme-color-box'
														color={borderColor}
														onChangeComplete={color => {
															setBorderColor(color.rgb)
															config.defaultStyle.borderColor = handleRgbaColor(color)
															onChange(config)
														}}
													/>
												},
												{
													key: 'de-bg',
													label: <BgColorsOutlined />,
													children: <ColorPicker
														className='theme-color-box'
														color={backgroundColor}
														onChangeComplete={color => {
															setBackgroundColor(color.rgb)
															config.defaultStyle.backgroundColor = handleRgbaColor(color)
															onChange(config)
														}}
													/>
												},
												{
													key: 'de-font',
													label: <FontColorsOutlined />,
													children: <ColorPicker
														className='theme-color-box'
														color={textColor}
														onChangeComplete={color => {
															setTextColor(color.rgb)
															config.defaultStyle.textColor = handleRgbaColor(color)
															onChange(config)
														}}
													/>
												},
											]}
											activeKey={activeTabKeyDefault}
											onChange={key => setActiveTabKeyDefault(key)}
										/>
									</div>
								},
								{
									key: 'hover',
									label: 'hover',
									children: <div>
										<Tabs
											tabPosition="left"
											items={[
												{
													key: 'hover-border',
													label: <BorderOutlined />,
													children: <ColorPicker
														className='theme-color-box'
														color={hoverBorderColor}
														onChangeComplete={color => {
															setHoverBorderColor(color.rgb)
															config.hoverStyle.borderColor = handleRgbaColor(color)
															onChange(config)
														}}
													/>
												},
												{
													key: 'hover-bg',
													label: <BgColorsOutlined />,
													children: <ColorPicker
														className='theme-color-box'
														color={hoverBackgroundColor}
														onChangeComplete={color => {
															setHoverBackgroundColor(color.rgb)
															config.hoverStyle.backgroundColor = handleRgbaColor(color)
															onChange(config)
														}}
													/>
												},
												{
													key: 'hover-font',
													label: <FontColorsOutlined />,
													children: <ColorPicker
														className='theme-color-box'
														color={hoverTextColor}
														onChangeComplete={color => {
															setHoverTextColor(color.rgb)
															config.hoverStyle.textColor = handleRgbaColor(color)
															onChange(config)
														}}
													/>
												},
											]}
											activeKey={activeTabKeyHover}
											onChange={key => setActiveTabKeyHover(key)}
										/>
									</div>
								},
							]}
							activeKey={activeKey}
							onChange={key => setActiveTabKey(key)}
						/>
					</div>
				}
			]}
		/>
	)
}

export default ButtonStyle
