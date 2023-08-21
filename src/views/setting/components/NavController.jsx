import { useDispatch, useSelector } from 'react-redux';
import { setActivePageKey } from '../../../redux/actions';

import { Button, Select, Tooltip } from 'antd';
import {
  PlusCircleOutlined,
  SnippetsOutlined,
  LaptopOutlined,
  SkinOutlined,
} from '@ant-design/icons';

import logo from '../../../static/images/logo.png';

const NavController = (props) => {
  const { onNavClick } = props;
  const pagesConfig = useSelector(state => state?.pagesConfig);
	const activePage = useSelector(state => state.pagesConfig.pages.filter(item => item.url == state.activePageKey)[0])
  const dispatch = useDispatch()

  const handleSavePageConfig = () => {

  };

  const handleSaveASPageConfig = () => {
    // setSaveAstemplateVisible(true)
  }

  const operation = [
    {
      title: "添加元素",
      icon: <PlusCircleOutlined />,
      onClick: () => {
        onNavClick('element')
      },
    },
    {
      title: "页面管理",
      icon: <SnippetsOutlined />,
      onClick: () => {
        onNavClick('page')
      },
    },
    {
      title: "主题色",
      icon: <SkinOutlined />,
      onClick: () => {
        onNavClick('theme')
      },
    },
    {
      title: "投资者协议",
      icon: <SnippetsOutlined />,
      onClick: () => {
      },
    },
    {
      title: "防钓鱼提示",
      icon: <SnippetsOutlined />,
      onClick: () => {
      },
    },
  ].map((item, i) => {
    let children = (
      <Tooltip title={item.title}>
        <a onClick={item.onClick} disabled={!item.onClick}>
          {item.icon}
        </a>
      </Tooltip>
    );

    return (
      <li key={i.toString()}>
        {children}
      </li>
    );
  })

  return (
    <div className="header">
      <div className="header-left">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="line"></div>
        <div className="operation">
          {operation}
        </div>
      </div>
      <div className="header-content">
        <div className="line"></div>
        <div className="page">
          <Select
            value={activePage ? activePage.url : null}
            options={pagesConfig.pages.map((item) => {
              return {
                label: item.name,
                value: item.url,
              };
            })}
            bordered={false}
            onChange={(v) => {
              dispatch(setActivePageKey(v))
            }}
          ></Select>
        </div>
        <div className="line"></div>
        <div className="equipment">
          <div className="item active">
            <Tooltip title={"PC"}>
              <LaptopOutlined />
            </Tooltip>
          </div>
          <div className="item">
            <Tooltip title={"暂未上线，敬请期待"}>
              <LaptopOutlined />
            </Tooltip>
          </div>
          <div className="item">
            <Tooltip title={"暂未上线，敬请期待"}>
              <LaptopOutlined />
            </Tooltip>
          </div>
        </div>
        <div className="line"></div>
      </div>
      <div className="header-right">
        <div className="handle">
          <Button
            onClick={() => {
              // window.open(`./#/view/${homeUrl}?type=edit`);
            }}
          >
            预览
          </Button>
          <Button onClick={handleSaveASPageConfig}>另存为</Button>
          <Button onClick={handleSavePageConfig} type="primary">保存</Button>
          {/* <Button onClick={handleWebSiteRelease} type="primary">发布</Button> */}
        </div>
      </div>
    </div>
  )
}

export default NavController;