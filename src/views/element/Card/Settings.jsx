import { Input, Collapse } from 'antd'
import { useSelector } from 'react-redux'

// 引入工具类
import { setSettingPagesConfig } from '@utils';
import { useConfig, useActiveComponent } from '@utils/hooks';

function Settings(props) {
	const { pagesRefList } = props
	const { activeElementId } = useSelector(state => state.activeElement)

	const [, activeComponentData] = useActiveComponent(activeElementId)

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
		</div>,
		}
	];

	return (
		<div className="setings-content">
			<Collapse items={items} />
		</div>
	)
}

export default Settings
