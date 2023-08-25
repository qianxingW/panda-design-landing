import { useState, useRef } from 'react'

import { Tabs, ColorPicker, Upload } from 'antd'
import {
	SettingOutlined,
	CloudUploadOutlined,
	DeleteOutlined,
	PictureOutlined,
} from '@ant-design/icons';

import { ImagePic } from '@components'
import { handleRgbaColor } from '@utils'

function Style(props) {
	const { config, onChange } = props
	const [activeTabKey, setActiveTabKey] = useState('style-1')
	const [color, setColor] = useState(config.style.backgroundColor || '')
	const uploadRef = useRef(null)

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
						key: 'style-1',
						label: <SettingOutlined />,
						children: <div style={{ padding: 16 }}>
							<ColorPicker
								className='theme-color-box'
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
						key: 'style-2',
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
										<Upload
											accept=".png,.jpg,.jpeg,.gif"
											showAccept={false}
											showUploadList={false}
											ref={uploadRef}
											action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
											onChange={(file) => {
												if(file.file.status === 'done'){
													uploadRef.current.value = null
													config.style.backgroundImage = file.file.response.thumbUrl
													onChange(config)
												}
											}}
										>
											<CloudUploadOutlined />
										</Upload>
									</label>
								</div>
							</div>
						</div>
					},
				]}
				activeKey={activeTabKey}
				onChange={key => setActiveTabKey(key)}
			/>
		</div>
	)
}

export default Style
