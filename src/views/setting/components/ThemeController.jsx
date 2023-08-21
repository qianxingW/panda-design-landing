import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPagesConfig } from '../../../redux/actions';

import { Drawer, ColorPicker } from 'antd'

import { handleRgbaColor } from '@utils'

function Theme(props) {
  const { open, onCloseDrawer } = props;
  const pagesConfig = useSelector(state => state?.pagesConfig);
  const dispatch = useDispatch();
  const [color, setColor] = useState(pagesConfig?.config?.theme || '#1565FF');

  return (
    <Drawer
    className='panda-drawer'
      title="主题"
      placement="left"
      width={320}
      open={open}
      mask={false}
      onClose={onCloseDrawer}
    >
      <div className="">
        <ColorPicker
          className='theme-color-box'
          value={color}
          onChangeComplete={color => {
            setColor(handleRgbaColor(color))
            pagesConfig.config.theme = handleRgbaColor(color)
            dispatch(setPagesConfig({ ...pagesConfig }))
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
