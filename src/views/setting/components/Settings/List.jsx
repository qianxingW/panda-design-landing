import { useRef } from 'react';
import { Button, Upload } from 'antd'
import {
	UpOutlined,
	CloudUploadOutlined,
	DeleteOutlined,
	DownOutlined,
	PlusOutlined
} from '@ant-design/icons';

import { cloneDeep } from 'lodash'

import { ImagePic } from '@components'

function List(props) {
	const { config, onChange } = props
	const uploadRef = useRef()

	function handleDelete(data) {
		let index = config.list.indexOf(data)
		config.list.splice(index, 1)
		onChange(config)
	}

	function handleAdd() {
		config.list.push(cloneDeep(config.appendData))
		onChange(config)
	}

	function handlePrev(data) {
		let index = config.list.indexOf(data)
		config.list.splice(index - 1, 2, config.list[index], config.list[index - 1])
		onChange(config)
	}
	function handleNext(data) {
		let index = config.list.indexOf(data)
		config.list.splice(index, 2, config.list[index + 1], config.list[index])
		onChange(config)
	}

	return (
		<div className="setings-item-content setings-list">
			<div className="list">
				{config.list &&
					config.list.map((item, index) => {
						return (
							<div className="list-item" key={index}>
								<div className="list-item-content">
									{item.img && <ImagePic className="list-item-pic" src={item.img.url} alt="" />}
									{item.name && <span>{item.name}</span>}
								</div>
								<div className="list-item-extra">
									{index > 0 && (
										<div className="list-item-extra-item" onClick={() => handlePrev(item)}>
											<UpOutlined />
										</div>
									)}
									{index < config.list.length - 1 && (
										<div className="list-item-extra-item" onClick={() => handleNext(item)}>
											<DownOutlined />
										</div>
									)}
									<label className="list-item-extra-item">
										<Upload
											accept=".png,.jpg,.jpeg,.gif"
											showAccept={false}
											showUploadList={false}
											ref={uploadRef}
											action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
											onChange={(file) => {
												if(file.file.status === 'done'){
													let index = config.list.indexOf(item);
													uploadRef.current.value = null
													config.list[index].img.url = file.file.response.thumbUrl
													onChange(config)
												}
											}}
										>
											<CloudUploadOutlined />
										</Upload>
									</label>
									<div className="list-item-extra-item" onClick={() => handleDelete(item)}>
										<DeleteOutlined />
									</div>
								</div>
							</div>
						)
					})}
				<div className="list-item-add">
					<Button className="user-button" type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
						添加
					</Button>
				</div>
			</div>
		</div>
	)
}

export default List
