import { Button } from 'antd'

import { cloneDeep } from 'lodash'

import { handleImgUploadChange } from '@utils'

import { ImagePic } from '@components'

function List(props) {
	const { config, onChange } = props

	function handleDelete(data) {
		let index = config.list.indexOf(data)
		config.list.splice(index, 1)
		onChange(config)
	}

	function handleChange(e, data) {
		let index = config.list.indexOf(data)

		handleImgUploadChange(e, value => {
			config.list[index].img.url = value
			onChange(config)
		})
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
											{/* <Icon name="shang" /> */}
										</div>
									)}
									{index < config.list.length - 1 && (
										<div className="list-item-extra-item" onClick={() => handleNext(item)}>
											{/* <Icon name="xia" /> */}
										</div>
									)}
									<label className="list-item-extra-item">
										{/* <Icon name="shangchuan" /> */}
										<input style={{ display: 'none' }} type="file" accept="image/*" onChange={e => handleChange(e, item)} />
									</label>
									<div className="list-item-extra-item" onClick={() => handleDelete(item)}>
										{/* <Icon name="shanchu" /> */}
									</div>
								</div>
							</div>
						)
					})}
				<div className="list-item-add">
					<Button className="user-button" type="dashed" icon="jiahao" onClick={handleAdd}>
						添加
					</Button>
				</div>
			</div>
		</div>
	)
}

export default List
