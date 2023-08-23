import { Switch } from 'antd'

function Layout(props) {
	const { config, onChange } = props

	function handleChange(c) {
		for (let attr in c) {
			config.layout[attr] = c[attr]
		}
		onChange(config)
	}

	if (!config) {
		return null
	}

	return (
		<div className="setings-item-content setings-layout">
			<div className="layoutSetup-wrap">
				<div className="layoutSetup-switch">
					<span>显示标题</span>
					<Switch
						checked={config.layout.header}
						onChange={v => {
							handleChange({
								header: v,
							})
						}}
					></Switch>
				</div>
				<div className="layoutSetup-switch">
					<span>显示按钮</span>
					<Switch
						checked={config.layout.footer}
						onChange={v => {
							handleChange({
								footer: v,
							})
						}}
					></Switch>
				</div>
			</div>
		</div>
	)
}

export default Layout
