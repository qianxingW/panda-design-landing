import { useState } from 'react'

import { Tabs, Popover, ColorPicker } from 'antd'

import { ImagePic } from '@components'
import { handleImgUploadChange, handleRgbaColor } from '@utils'

function Style(props) {
	const { config, onChange } = props
	const [activeTabKey, setActiveTabKey] = useState(1)
	const [color, setColor] = useState(config.style.backgroundColor || '')

	function handleChange(e) {
		handleImgUploadChange(e, value => {
			config.style.backgroundImage = value
			onChange(config)
		})
	}

	function handleDelete() {
		config.style.backgroundImage = null
		onChange(config)
	}
	return (
		<div className="setings-item-content setings-style">
			<Tabs
				layout="horizontal"
				tabList={[
					{
						key: '1',
						// name: <Icon size={16} name="shezhi" />,
					},
					{
						key: '2',
						// name: <Icon size={16} name="border" />,
					},
				]}
				activeTabKey={activeTabKey}
				changeTabKey={key => setActiveTabKey(key)}
			>
				<div style={{ padding: 16 }}>
					<Popover
						position="bottom"
						content={
							<ColorPicker
								color={color}
								onChangeComplete={color => {
									setColor(handleRgbaColor(color))
									config.style.backgroundColor = handleRgbaColor(color)
									onChange(config)
								}}
							/>
						}
						popupClassNmae="toolbar-color"
					>
						<div className="seting-theme-color-box" style={{ backgroundColor: color }}></div>
					</Popover>
				</div>
				<div className="seting-upload">
					<div className="list-item">
						<div className="list-item-content">
							<div className="list-item-pic">{config.style.backgroundImage && <ImagePic src={config.style.backgroundImage} />}</div>
							<span></span>
						</div>
						<div className="list-item-extra">
							<div className="list-item-extra-item">
								{/* <Icon name="shanchu" onClick={handleDelete} /> */}
							</div>
							<label className="list-item-extra-item">
								{/* <Icon name="shangchuan" /> */}
								<input style={{ display: 'none' }} type="file" accept="image/*" onChange={handleChange} />
							</label>
						</div>
					</div>
				</div>
			</Tabs>
		</div>
	)
}

export default Style
