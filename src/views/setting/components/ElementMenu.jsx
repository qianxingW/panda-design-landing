import { useMemo } from 'react'
import { Drawer, Tooltip } from 'antd';
import * as element from '../../element';
import thumbnail from '../../../static/images/detail/thumbnail.png'

const ElementMenu = () => {
  const onDragStart = (e) => {
    // dragStart.current = true;
    e.dataTransfer.setData('drayType', 'add');
    e.dataTransfer.setData(
      'name',
      e.target.getAttribute('data-name'),
    );
    e.dataTransfer.setData(
      'type',
      e.target.getAttribute('data-type'),
    );
    e.dataTransfer.setData(
      'subtype',
      e.target.getAttribute('data-subtype'),
    );
    e.dataTransfer.setData('id', e.target.getAttribute('data-id'));
  }

  const elementList = useMemo(() => {
    let ary = [];
    for (let attr in element) {
      const { NAMECN, TYPE, } = element[attr].render;
      const img = <img src={thumbnail || '/pc/static/logo.png'} alt={attr} draggable="true" data-name={attr} data-type={'element'} data-subtype={TYPE} />;

      ary.push(
        <div
          className="left-menu-box"
          onDragStart={onDragStart}
          draggable="true"
          data-name={attr}
          data-type={'element'}
          data-subtype={TYPE}
          key={NAMECN}
        >
          <div className="title">{NAMECN}</div>
          <div className="img">
            <Tooltip
              placement="right"
              title={(
                <div style={{ width: 500 }}>
                  {img}
                </div>
              )}
              overlayStyle={{ maxWidth: 'none' }}
            >
              {img}
            </Tooltip>
          </div>
        </div>
      )
    }
    return ary
  }, [])

  return (
    <Drawer
      title="添加元素"
      placement="left"
      width={320}
      open={true}
      mask={false}
      onCancel={() => {
        // setComponentDrawerVisible(false);
      }}
      onConfirm={() => {
        // setComponentDrawerVisible(false);
      }}
    >
      <div className="left-menu">
        {elementList}
      </div>
    </Drawer>
  )
}

export default ElementMenu;