import { useState } from 'react';

import ContentController from './components/ContentController';
import ElementMenu from './components/ElementMenu';
import NavController from './components/NavController';
import AddPage from './components/AddPage';
import ThemeController from './components/ThemeController';

const defaultOpens = {
  element: false,
  page: false,
  theme: false
}
const Setting = () => {
  const [opens, setOpens] = useState({ ...defaultOpens });

  const onNavClick = (type) => {
    setOpens({
      ...defaultOpens,
      [type]: true,
    })
  }

  const onCloseDrawer = () => {
    setOpens({...defaultOpens})
  }

  const { element, page, theme } = opens;
  return (
    <div className="drag-container">
      <div className="layout page-layout">
        <NavController
          onNavClick={onNavClick}
        />
        <div className="content">
          <ContentController />
        </div>
        <ElementMenu
          open={element}
          onCloseDrawer={onCloseDrawer}
        />
        <AddPage
          open={page}
          onCloseDrawer={onCloseDrawer}
          onChange={() => {
            // setActiveData(null)
          }}
        />
        <ThemeController
          open={theme}
          onCloseDrawer={onCloseDrawer}
        />
      </div>
    </div>
  )
}
export default Setting;
