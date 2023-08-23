import {  Radio } from 'antd'

function Theme(props) {
	const { config, onChange } = props

	function handleChange(value) {
		config.theme = value
		onChange(config)
	}

	return (
		<div className="setings-item-content setings-theme">
			<div className="layoutSetup-wrap">
				<Radio.Group
					onChange={v => {
						handleChange(v)
					}}
					checked={config.theme}
				>
					<Radio value={'light'}>亮色</Radio>
					<Radio value={'dark'}>暗色</Radio>
				</Radio.Group>
			</div>
		</div>
	)
}

export default Theme
