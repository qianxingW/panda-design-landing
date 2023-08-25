import { Input, Collapse } from 'antd'
import { useSelector } from 'react-redux'

// 引入工具类
import { useConfig, useActiveComponent, useSetSettingPagesConfig } from '@utils/hooks';

function Settings(props) {
	const { pagesRefList } = props
	const { activeElementId } = useSelector(state => state.activeElement)

	const [, activeComponentData] = useActiveComponent(activeElementId)
	const [setSettingPagesConfig] = useSetSettingPagesConfig()

	const [config] = useConfig(activeElementId, pagesRefList)

	function handleBlur() {
		activeComponentData.props.config = { ...config.config }
		setSettingPagesConfig(activeComponentData)
	}

	if (!config) return null

	const items = [
		{
			key: '1',
			label: '内容配置',
			children: <div className="setings-cotnent-list">
			{config.config.list.map((item, index) => {
				return (
					item.hover && (
						<div className="setings-cotnent-list-item" key={index}>
							<Input
								value={item.hover.text}
								onChange={e => {
									const { value } = e.target;
									item.hover.text = value
									// setEditValue(v)
								}}
								onBlur={handleBlur}
							/>
						</div>
					)
				)
			})}
		</div>,
		}
	];

	return (
		<div className="setings-content">
			<Collapse items={items} bordered={false} />
		</div>
	)
}

export default Settings
