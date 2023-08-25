import { useEffect, useMemo } from 'react'

import Dray from './components/Dray'

import { homeUrl } from '../../redux/template.config'

import './index.scss'

const WebSite = () => {
  const pageConnect = homeUrl;
  const pagesConfig = JSON.parse(localStorage.getItem('pageConfig'))

  useEffect(() => {
    if (!pagesConfig) return
    let theme = '#1565FF'

    if (pagesConfig.config && pagesConfig.config.theme) {
      theme = pagesConfig.config.theme
    }

    document.querySelector(':root').style.setProperty('--website-theme-color', theme)
  }, [pagesConfig])

  const activePage = useMemo(() => {
    if (!pagesConfig) return []
    if (!pageConnect.pageId) {
      return pagesConfig.pages.filter(item => item.url == homeUrl)[0]
    }
    return pagesConfig.pages.filter(item => item.url == pageConnect.pageId)[0]
  }, [pageConnect.pageId, pagesConfig])

  if (!pagesConfig) {
    return null
  }

  return (
    <div className="layout view-content ">
      {pagesConfig.config.header && <Dray data={pagesConfig.config.header} />}
      <div className="page-list">
        {activePage &&
          activePage.content &&
          activePage.content.map((item, index) => {
            return <Dray key={index} index={index} data={item} />
          })}
      </div>
      {pagesConfig.config.footer && <Dray data={pagesConfig.config.footer} />}
    </div>
  )
}

export default WebSite
