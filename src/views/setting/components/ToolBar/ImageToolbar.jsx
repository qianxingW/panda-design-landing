import { useRef } from 'react'

import _ from 'lodash'

importpandaad, Tooltip } from 'antd'
import {
	FormOutlined,
	LinkOutlined,
	DeleteOutlined
} from '@ant-design/icons';

// 引入工具类
// import {  handleImgUpload } from '@/utils/index'

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
						action={(file, config) => {
							return new Promise((resolve) => {
								// handleImgUpload(file, config, data => {
								// 	onChange(data.data)
								// 	resolve(data)
								// 	uploadRef.current.value = null
								// })
							})
						}}
						onPreview={() => {}}
						onRemove={() => {}}
						onChange={() => {}}
					>
						<FormOutlined />
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
