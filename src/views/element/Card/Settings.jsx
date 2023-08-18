import { Input, Collapse } from 'antd'

// 引入工具类
import { setSettingPagesConfig } from '@utils';
import { useConfig, useActiveComponent } from '@utils/hooks';

function Settings(props) {
	const { activeData, pagesRefList } = props

	const [, activeComponentData] = useActiveComponent(activeData)

	const [config] = useConfig(activeData, pagesRefList)

	function handleBlur() {
		activeComponentData.props.config = { ...config.config }
		setSettingPagesConfig(activeComponentData)
	}

	if (!config) return null

	return (
		<div className="setings-content">
			<Collapse.Item title="内容配置" open>
				<div className="setings-cotnent-list">
					{config.config.list.map((item, index) => {
						return (
							item.hover && (
								<div className="setings-cotnent-list-item" key={index}>
									<Input
										value={item.hover.text}
										onChange={v => {
											item.hover.text = v
											// setEditValue(v)
										}}
										onBlur={handleBlur}
									/>
								</div>
							)
						)
					})}
				</div>
			</Collapse.Item>
		</div>
	)
}

export default Settings
