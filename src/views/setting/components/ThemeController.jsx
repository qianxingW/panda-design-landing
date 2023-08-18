// react 依赖
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// 第三方依赖
import { Drawer, ColorPicker } from 'antd'

// 引入redux定义
// import * as ActionTypes from '@/actions/index'

function Theme(props) {
  const dispatch = useDispatch()
  const pagesConfig = useSelector(state => state?.pagesConfig)
  const [color, setColor] = useState(pagesConfig?.config?.theme || '#1565FF')
  return (
    <Drawer
      title="主题"
      placement="left"
      width={320}
      open={false}
      mask={false}
      onCancel={() => {
        // setComponentDrawerVisible(false);
      }}
      onConfirm={() => {
        // setComponentDrawerVisible(false);
      }}
    >
      <div className="">
        {/* <Popover
          position="bottom"
          content={
            <SketchPicker
              color={color}
              onChangeComplete={color => {
                setColor(handleRgbaColor(color))
                pagesConfig.config.theme = handleRgbaColor(color)
                dispatch({
                  type: ActionTypes.SET_PAGESCONFIG,
                  data: { ...pagesConfig },
                })
              }}
            />
          }
          popupClassNmae="toolbar-color"
        >
          <div className="theme-color-box" style={{ backgroundColor: color }}></div>
        </Popover> */}
        <ColorPicker
          className='theme-color-box'
          value={color}
          onChangeComplete={color => {
            // setColor(handleRgbaColor(color))
            // pagesConfig.config.theme = handleRgbaColor(color)
            // dispatch({
            //   type: ActionTypes.SET_PAGESCONFIG,
            //   data: { ...pagesConfig },
            // })
          }}
        />
        <div className="theme-title">点击上方色块更换主题色</div>
        <div className="theme-info">
          <p>备注说明：</p>
          <p>主题色建议采用公司的主色调；</p>
          <p>主题色主要影响网站里面的导航选中色以及按钮的填充色和鼠标交互的色彩效果；</p>
        </div>
      </div>
    </Drawer>
  )
}

export default Theme;
