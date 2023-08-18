import { Radio, Collapse, Switch } from 'antd'

// 引入工具类
import { setSettingPagesConfig } from '@/utils'
import { useActiveComponent, useConfig } from '@utils/hooks'
// 引入样式

function Settings(props) {
	const { activeData, pagesRefList } = props

	const [, activeComponentData] = useActiveComponent(activeData)

	const [config, setConfig] = useConfig(activeData, pagesRefList)

	function handleChange(c) {
		let newConfig = { ...config }
		for (let attr in c) {
			newConfig[attr] = c[attr]
		}
		setConfig(newConfig)
		setSettingPagesConfig(activeComponentData, c)
	}

	if (!config) {
		return null
	}

	return (
		<>
			<Collapse.Item title="布局设置" open>
				<div className="layoutSetup-wrap setings-layout">
					<div className="layoutSetup-switch">
						<span>图片位置</span>
						<Radio.Group
							onChange={v => {
								handleChange({
									imgAlign: v,
								})
							}}
							checked={config.imgAlign}
						>
							<Radio value="left">左</Radio>
							<Radio value="right">右</Radio>
						</Radio.Group>
					</div>
					<div className="layoutSetup-switch">
						<span>图片大小</span>
						<Radio.Group
							onChange={v => {
								handleChange({
									imgSize: v,
								})
							}}
							checked={config.imgSize}
						>
							<Radio value="imgB">大</Radio>
							<Radio value="imgS">小</Radio>
						</Radio.Group>
					</div>
					<div className="layoutSetup-switch">
						<span>按钮显示</span>
						<Switch
							checked={config.contentButtonText.show || false}
							onChange={v => {
								handleChange({
									contentButtonText: {
										...config.contentButtonText,
										show: v,
									},
								})
							}}
						></Switch>
					</div>
				</div>
			</Collapse.Item>
		</>
	)
}

export default Settings
