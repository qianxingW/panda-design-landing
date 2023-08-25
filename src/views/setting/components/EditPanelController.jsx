import { useSelector } from 'react-redux'

import { Drawer, Breadcrumb } from 'antd';
import {
	// DeleteOutlined,
} from '@ant-design/icons';

import SettingContainer from './Settings';

import { useActiveComponent } from '@utils/hooks';

const EditPanel = (props) => {
  const { open, onCloseDrawer, pagesRefList } = props;

	const { activeElement, activeElementId } = useSelector(state => state.activeElement)
  const activePage = useSelector(state => state.pagesConfig.pages.filter(item => item.url == state.activePageKey)[0])

  const [EditComponent, activeComponentData] = useActiveComponent(activeElementId)
  
  const breadcrumbItems = [
    { title: activePage.name },
    { title: activePage.name },
  ]

  return (
    <Drawer
      title="属性面板"
      width={388}
      offsetTop={64}
      className="setting-drawer"
      placement="right"
      open={open}
      mask={false}
      onClose={onCloseDrawer}
    >
      {EditComponent && activeComponentData && activeElementId == activeComponentData.id && (
        <div className="setings" key={activeElementId}>
          <div className="setings-head-close" onClick={onCloseDrawer}>
            {/* <DeleteOutlined  /> */}
          </div>
          <Breadcrumb className='setings-header' items={breadcrumbItems} />
          <SettingContainer
            key={activeElementId}
            activeData={activeElementId}
            activeElement={activeElement}
            pagesRefList={pagesRefList.current}
          >
            {EditComponent.render.Settings && !activeElement.type && (
              <EditComponent.render.Settings
                key={activeElementId}
                activeData={activeElementId}
                activeElement={activeElement}
                pagesRefList={pagesRefList.current}
                // settingLink={settingLink}
              />
            )}
          </SettingContainer>
        </div>
      )}
    </Drawer>
  )
}

export default EditPanel;