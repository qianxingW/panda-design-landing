import { useState } from 'react'

import { Tabs, ColorPicker } from 'antd'
import {
	SettingOutlined,
	CloudUploadOutlined,
	DeleteOutlined,
	PictureOutlined,
} from '@ant-design/icons';

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
				tabPosition="left"
				items={[
					{
						key: '1',
						label: <SettingOutlined />,
						children: <div style={{ padding: 16 }}>
							<ColorPicker
								color={color}
								onChangeComplete={color => {
									setColor(handleRgbaColor(color))
									config.style.backgroundColor = handleRgbaColor(color)
									onChange(config)
								}}
							/>
						</div>
					},
					{
						key: '2',
						label: <PictureOutlined />,
						children: <div className="seting-upload">
							<div className="list-item">
								<div className="list-item-content">
									<div className="list-item-pic">{config.style.backgroundImage && <ImagePic src={config.style.backgroundImage} />}</div>
									<span></span>
								</div>
								<div className="list-item-extra">
									<div className="list-item-extra-item">
										<DeleteOutlined onClick={handleDelete} />
									</div>
									<label className="list-item-extra-item">
										<CloudUploadOutlined />
										<input style={{ display: 'none' }} type="file" accept="image/*" onChange={handleChange} />
									</label>
								</div>
							</div>
						</div>
					},
				]}
				activeTabKey={activeTabKey}
				changeTabKey={key => setActiveTabKey(key)}
			/>
		</div>
	)
}

export default Style
