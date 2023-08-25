import { useRef } from 'react'

import _ from 'lodash'

import { Upload, Tooltip } from 'antd'
import {
	CloudUploadOutlined,
	LinkOutlined,
	DeleteOutlined
} from '@ant-design/icons';

function ImageToolbar(props) {
	const { target, onChange, settingLink, setLink } = props

	const uploadRef = useRef(null)

	const handleLink = () => {
		settingLink(target.link, link => {
			setLink(_.cloneDeep(link))
		})
	}

	return (
		<div className="toolbar">
			<div className="toolbar-type">图片</div>
			{target && target.style && target.style.width && target.style.height && (
				<div className="toolbar-size">
					{target.style.width} * {target.style.height}
				</div>
			)}
			<div className="toolbar-items">
				<div className="toolbar-item">
					<Upload
						accept=".png,.jpg,.jpeg,.gif"
						showAccept={false}
						showUploadList={false}
						ref={uploadRef}
						action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
						onChange={(file) => {
							if(file.file.status === 'done'){
								onChange(file.file.response.thumbUrl)
								uploadRef.current.value = null
							}
						}}
					>
						<CloudUploadOutlined />
					</Upload>
				</div>
				<div className="toolbar-item" onClick={handleLink}>
				<LinkOutlined />
				</div>
				{target && target.link && (
					<Tooltip title={'删除链接'} >
						<div className="toolbar-item" onClick={() => setLink(null)}>
						<DeleteOutlined />
						</div>
					</Tooltip>
				)}
			</div>
		</div>
	)
}

export default ImageToolbar
