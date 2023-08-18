// import {
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useLocation, useParams } from 'react-router-dom';

import ContentController from './components/ContentController';
import ElementMenu from './components/ElementMenu';
import NavController from './components/NavController';
// import AddPage from './components/AddPage';
import ThemeController from './components/ThemeController';

// // 引入工具类
// import {
//   uuid,
//   findElement,
//   findSelectElementTarget,
//   setDefaultPage,
//   useActiveComponent,
//   setSettingPagesConfig,
// } from '../../utils';
// import PageContext from '../../utils/pageContext';

// // 引入请求模块
// import * as request from '../../request/request';

// // 引入配置
// import { homeUrl } from '../../config';

// // 引入组件列表
// import * as element from '../../components/element';
// import * as components from '../../components';

// import Dray from './component/Dray';
// import AddPage from './component/AddPage';
// import Theme from './component/Theme';
// import ImageToolbar from './component/Toolbar/ImageToolbar';
// import TextToolbar from './component/Toolbar/TextToolbar';
// import ButtonToolbar from './component/Toolbar/ButtonToolbar';
// import EditTextToolbar from './component/Toolbar/EditTextToolbar';
// import AddElement from './component/AddElement';
// import LinkModal from './component/LinkModal';
// import Agreement from './component/Agreement';

// // 引入redux定义
// import * as ActionTypes from '../../actions/actions';

// // 引入样式
// import './index.scss';

// // 静态资源
// import logo from '../../static/images/logo.png';
// import _ from 'lodash';

// const { Settings } = components;

// const Setting = () => {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const pagesConfig = useSelector((state) => state.pagesConfig);
//   const activePageKey = useSelector((state) => state.activePageKey);
//   const activePage = useSelector(
//     (state) =>
//       state.pagesConfig.pages.filter(
//         (item) => item.url == state.activePageKey,
//       )[0],
//   );
//   const params = useParams();

//   const [componentDrawerVisible, setComponentDrawerVisible] = useState(false);
//   const [pageDrawerVisible, setPageDrawerVisible] = useState(false);
//   const [pageThemeVisible, setPageThemeVisible] = useState(false);
//   const [agreementVisible, setAgreementVisible] = useState(false);
//   const [dropIndex, setDrop] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [saveAstemplateVisible, setSaveAstemplateVisible] = useState(false);


//   // 配置链接
//   const [linkVisible, setLinkVisible] = useState(false);

//   // hover的组件
//   const [hoverData, setHoverData] = useState(null);
//   const [hoverElement, setHoverElement] = useState({ current: null });

//   // 点击选中的组件
//   const [activeData, setActiveData] = useState(null);
//   const [activeElement, setActiveElement] = useState({ current: null });

//   const [editData, setEditData] = useState(null);
//   const [componentIndex, setComponentIndex] = useState(null);

//   const [EditComponent, activeComponentData] = useActiveComponent(activeData);

//   const pagesRefList = useRef({});

//   const dragStart = useRef(null);
//   const dragContent = useRef(null);
//   const dragScroll = useRef(null);
//   const saveAstemplateRef = useRef(null);

//   useEffect(() => {

//     if(location.pathname.indexOf('development')!=-1){
//       return
//     }
//     setLoading(true);
//     request
//       .erPcWebSiteDetail({
//         configId: params.configId,
//       })
//       .then((res) => {
//         if(res.data&&res.data.content){
//         setDefaultPage(res.data.content);
//       }
//       })
//       .finally((error) => {
//         setLoading(false);
//       });
//   }, []);



//   const resetPagesConfig = () => {
//     dispatch({
//       type: ActionTypes.SET_PAGECONFIG,
//       data: { ...pagesConfig },
//     });
//   };

//   const setPagesConfig = () => {
//     setSettingPagesConfig(activeComponentData);
//   };

//   useEffect(() => {
//     dragContent.current.style.setProperty(
//       '--website-theme-color',
//       pagesConfig.config.theme || '#1565FF',
//     );
//   }, [pagesConfig.config.theme]);

//   useEffect(() => {
//     if (activeData) {
//       setComponentIndex(
//         activePage.content.indexOf(
//           activePage.content.filter((item) => item.id == activeData)[0],
//         ),
//       );
//     } else {
//       setComponentIndex(-1);
//     }
//   }, [activeData, activePage, activePageKey]);

//   const settingLinkCallback = useRef(null);

//   const findData = () => {
//     if (!activeData || !activeComponentData) return;
//     let classify = activeElement.current.dataset.classify;
//     let index = activeElement.current.dataset.index;
//     if (
//       pagesRefList.current[activeData].parameter.componentName !=
//       activeComponentData.componentName
//     )
//       return;
//     if (classify == 'tabList') {
//       return activeComponentData.props.config.tabList.list[index][dataSetName];
//     } else if (classify == 'list') {
//       return activeComponentData.props.config.list[index][dataSetName];
//     } else {
//       return activeComponentData.props[dataSetName];
//     }
//   };

//   const dataSetName = useMemo(() => {
//     if (!activeElement.current) return null;
//     return activeElement.current.dataset.name;
//   }, [activeElement]);

//   const editElementData = useMemo(() => {
//     if (!dataSetName || !activeElement.type) return null;
//     return findData();
//   }, [dataSetName, activeElement, activeData, activeComponentData]);

//   useEffect(() => {
//     if (
//       !dataSetName &&
//       !activeElement.type &&
//       !activeComponentData &&
//       !activeElement.current
//     )
//       return;
//     if (activeElement.type == 'text') {
//       let style = window.getComputedStyle(activeElement.current, null);
//       let styleDefault = {
//         color: style['color'],
//         textAlign: style['textAlign'],
//         fontFamily: style['fontFamily'],
//         letterSpacing: style['letterSpacing'],
//         lineHeight: style['lineHeight'],
//         fontSize: style['fontSize'],
//         fontWeight: style['fontWeight'],
//         textDecoration: style['textDecoration'],
//       };
//       let propsAttr = findData();
//       if (propsAttr) {
//         propsAttr.style = styleDefault;
//         setPagesConfig();
//       }
//     }
//   }, [dataSetName, activeElement, activeComponentData]);

//   const findTargetIndex = (e) => {
//     let dragContentSize = dragContent.current.getBoundingClientRect();
//     let dragSize = dragContent.current.scrollTop + e.pageY - dragContentSize.y;
//     let pages = activePage.content;
//     let targetIndex = null;

//     pages.forEach((item, index) => {
//       let refSize =
//         pagesRefList.current[item.id].ref.current.getBoundingClientRect();
//       let refY = dragContent.current.scrollTop + refSize.y - dragContentSize.y;
//       if (refY < dragSize && refY + refSize.height > dragSize) {
//         if (refY + refSize.height / 2 < dragSize) {
//           targetIndex = index - 1;
//         } else {
//           targetIndex = index;
//         }
//         return item;
//       }
//     });
//     return targetIndex;
//   };

//   const dropOndrop = (e) => {
//     e.preventDefault();
//     dragStart.current = false;
//     let pages = activePage.content;
//     let targetIndex = findTargetIndex(e);

//     // 拖拽元素
//     let drayType = e.dataTransfer.getData('drayType');
//     let activeType = e.dataTransfer.getData('type');
//     let avtiveName = e.dataTransfer.getData('name');
//     let avtiveSubType = e.dataTransfer.getData('subtype');

//     // 添加模板
//     let template = {
//       componentName: avtiveName,
//       id: uuid(),
//       componentType: activeType,
//       props: _.cloneDeep(element[avtiveName].render.config),
//       type: avtiveSubType,
//     };

//     if (drayType == 'add') {
//       // 处理头部
//       if (template.type == 'header') {
//         let config = {
//           ...pagesConfig,
//           config: {
//             ...pagesConfig.config,
//             header: template,
//           },
//         };
//         dispatch({
//           type: ActionTypes.SET_PAGECONFIG,
//           data: {
//             ...pagesConfig,
//             ...config,
//           },
//         });
//       }

//       // 处理尾部
//       if (template.type == 'footer') {
//         let config = {
//           ...pagesConfig,
//           config: {
//             ...pagesConfig.config,
//             footer: template,
//           },
//         };
//         dispatch({
//           type: ActionTypes.SET_PAGECONFIG,
//           data: {
//             ...pagesConfig,
//             ...config,
//           },
//         });
//       }

//       // 其他情况
//       if (template.type == 'component') {
//         if (targetIndex >= 0) {
//           pages.splice(targetIndex, 0, template);
//         } else {
//           pages.push(template);
//         }
//         resetPagesConfig();
//       }
//     }

//     setComponentDrawerVisible(false);
//   };

//   // 清空状态
//   const clearPopup = () => {
//     setComponentDrawerVisible(false);
//     setHoverData(null);
//     setHoverElement({ current: null });
//     setActiveData(null);
//     setActiveElement({ current: null });
//     setEditData(null);
//   };

//   // 清空状态
//   const clearHoverPopup = () => {
//     setHoverData(null);
//   };

//   // 点击选中组件
//   const handleClick = (e) => {
//     e.persist();
//     setComponentDrawerVisible(false);
//     // hover元素为空
//     if (!hoverData) {
//       clearPopup();
//       return;
//     }
//     setActiveData(hoverData);
//     setActiveElement(hoverElement);
//   };

//   // move 查询组件
//   const handleMove = (e) => {
//     e.persist();
//     // if (dragStart.current == true) {
//     //   let targetIndex = findTargetIndex(e)
//     // }
//     // 查找hover的组件
//     let hoverPage = findElement(e, pagesRefList.current);
//     if (!hoverPage) {
//       // 没有hover的组件，清空状态
//       setHoverData(null);
//       return;
//     }
//     // 设置hover的数组，并查询是否有子元素
//     setHoverData(hoverPage.parameter.id);
//     let ele = findSelectElementTarget(e, hoverPage.ref.current);
//     setHoverElement(ele ? ele : { current: hoverPage.ref.current });
//   };

//   const onDelete = (data) => {
//     if (activeComponentData.type != 'component') return;
//     function deleteTemplate (ary, id) {
//       for (let i = 0; i < ary.length; i++) {
//         if (ary[i] && ary[i].id == id) {
//           ary.splice(i, 1);
//           return;
//         }
//         if (ary[i] && ary[i].children) {
//           deleteTemplate(ary[i].children, id);
//         }
//       }
//     }
//     deleteTemplate(activePage.content, activeData);
//     clearPopup();
//     resetPagesConfig();
//   };

//   const handleEditText = (e) => {
//     findData().text = e.target.innerHTML;
//     setPagesConfig();
//   };

//   const handleImg = (e) => {
//     findData().url = e;
//     setPagesConfig();
//   };

//   const handleStartEditText = (type) => {
//     let style = window.getComputedStyle(activeElement.current, null);
//     if (editData) {
//       return;
//     }
//     let edutData = {
//       id: activeData,
//       text: activeElement.current.innerHTML,
//       name: dataSetName,
//       style: {
//         color: style['color'],
//         textAlign: style['textAlign'],
//         fontFamily: style['fontFamily'],
//         letterSpacing: style['letterSpacing'],
//         lineHeight: style['lineHeight'],
//         fontSize: style['fontSize'],
//         fontWeight: style['fontWeight'],
//         textDecoration: style['textDecoration'],
//       },
//     };
//     findData().style = edutData.style;
//     setEditData(edutData);
//     activeElement.current.style.visibility = 'hidden';
//   };

//   const setStyle = (type, value, active) => {
//     let target = findData();
//     if (!target.style) {
//       target.style = {};
//     }
//     if (active) {
//       delete target.style[type];
//     } else {
//       target.style[type] = value;
//     }
//     setPagesConfig();
//   };

//   const settingLink = (callback) => {
//     setLinkVisible(true);
//     settingLinkCallback.current = callback;
//   };

//   const setLink = (link) => {
//     findData().link = link;
//     setPagesConfig();
//   };

//   const handlePrev = () => {
//     let index = activePage.content.indexOf(
//       activePage.content.filter((item) => item.id == activeData)[0],
//     );
//     activePage.content.splice(
//       index - 1,
//       2,
//       activePage.content[index],
//       activePage.content[index - 1],
//     );
//     clearPopup();
//     resetPagesConfig();
//   };

//   const handleNext = () => {
//     let index = activePage.content.indexOf(
//       activePage.content.filter((item) => item.id == activeData)[0],
//     );
//     activePage.content.splice(
//       index,
//       2,
//       activePage.content[index + 1],
//       activePage.content[index],
//     );
//     clearPopup();
//     resetPagesConfig();
//   };

//   function handleSubmit (value) {
//     setSaveAstemplateVisible(false)
//     setLoading(true)
//     if (loading) return
//     request.erPcWebSiteExtendSaveOrUpdate({
//       configId: params.configId,
//       content: JSON.stringify(pagesConfig),
//       siteName: value.saveAstemplateName,
//       actionType: '3',
//     }).then((res) => {
//       Message.show({
//         content: '保存成功',
//         type: 'success',
//       });
//     })
//       .catch(error => {
//         Message.show({
//           content: error.msg,
//           type: 'error',
//         });
//       }).finally(error => {
//         setLoading(false)
//       });
//   }


//   function handleConfirm () {
//     saveAstemplateRef.current.onSubmit();
//   }

//   return (
//     <PageContext.Provider
//       value={{
//         type: 'edit',
//       }}
//     >
//       <div className="drag-container">
//         <div className="layout page-layout">
//           <NavController />

//           <div className="content">
//             <Spin loading={loading}>
//               <div
//                 className="drop"
//                 ref={dragScroll}
//                 style={{ transform: `scale(${dropIndex})` }}
//               >
//                 <div className="drop-content" ref={dragContent}>
//                   <div
//                     className="drop-layer"
//                     onClick={(e) => {
//                       handleClick(e);
//                     }}
//                     onMouseMove={(e) => {
//                       _.throttle(() => handleMove(e), 100)(e);
//                     }}
//                     onMouseOver={(e) => { }}
//                     onMouseOut={(e) => {
//                       clearHoverPopup();
//                     }}
//                     onDragOver={(e) => {
//                       e.preventDefault();
//                     }}
//                     onDragLeave={(e) => {
//                       e.preventDefault();
//                     }}
//                     onDrop={dropOndrop}
//                   ></div>
//                   {pagesConfig.config.header && (
//                     <Dray
//                       data={pagesConfig.config.header}
//                       hoverData={hoverData}
//                       ref={(ref) => {
//                         pagesRefList.current[pagesConfig.config.header.id] =
//                           ref;
//                       }}
//                     />
//                   )}
//                   <div className="page-content">
//                     {activePage &&
//                       activePage.content.map((item, index) => {
//                         return (
//                           <Dray
//                             key={index}
//                             index={item.id}
//                             data={item}
//                             hoverData={hoverData}
//                             ref={(ref) => {
//                               pagesRefList.current[item.id] = ref;
//                             }}
//                           />
//                         );
//                       })}
//                   </div>
//                   {pagesConfig.config.footer && (
//                     <Dray
//                       data={pagesConfig.config.footer}
//                       hoverData={hoverData}
//                       ref={(ref) => {
//                         pagesRefList.current[pagesConfig.config.footer.id] =
//                           ref;
//                       }}
//                     />
//                   )}
//                 </div>
//               </div>
//             </Spin>
//             {EditComponent &&
//               activeComponentData &&
//               activeData == activeComponentData.id && (
//                 <div className="setings" key={activeData}>
//                   <div className="">
//                     <Icon name="guanbi" />
//                   </div>
//                   <Breadcrumb>
//                     <Breadcrumb.Item>{activePage.name}</Breadcrumb.Item>
//                     <Breadcrumb.Item>
//                       {EditComponent.render.NAMECN}
//                     </Breadcrumb.Item>
//                     {/* {activeElement.type && <Breadcrumb.Item>{dataSetName}</Breadcrumb.Item>} */}
//                   </Breadcrumb>
//                   <Settings
//                     key={activeData}
//                     activeData={activeData}
//                     activeElement={activeElement}
//                     pagesRefList={pagesRefList.current}
//                   >
//                     {EditComponent.render.Settings && !activeElement.type && (
//                       <EditComponent.render.Settings
//                         key={activeData}
//                         activeData={activeData}
//                         activeElement={activeElement}
//                         pagesRefList={pagesRefList.current}
//                         settingLink={settingLink}
//                       />
//                     )}
//                   </Settings>
//                 </div>
//               )}
//           </div>
//           <Popup
//             className={'component-popup'}
//             onClose={() => { }}
//             refEl={activeElement}
//             visible={!editData && !!activeData}
//           >
//             <div className="component-active">
//               <div className="item"></div>
//               <div className="item"></div>
//               <div className="item"></div>
//               <div className="item"></div>
//             </div>
//           </Popup>
//           <Popup
//             position="left"
//             onClose={() => { }}
//             refEl={activeElement}
//             visible={!!activeData}
//           >
//             {activeComponentData &&
//               !activeElement.type &&
//               activeComponentData.type != 'header' &&
//               activeComponentData.type != 'footer' && (
//                 <div className="component-operation">
//                   {activeComponentData &&
//                     activeComponentData.type == 'component' && (
//                       <>
//                         {componentIndex !== 0 && (
//                           <div className="item" onClick={handlePrev}>
//                             <Icon size={16} name="shang" />
//                           </div>
//                         )}
//                         {componentIndex != activePage.content.length - 1 && (
//                           <div className="item" onClick={handleNext}>
//                             <Icon size={16} name="xia" />
//                           </div>
//                         )}
//                       </>
//                     )}
//                   <div className="item" onClick={onDelete}>
//                     <Icon size={16} name="shanchu" />
//                   </div>
//                 </div>
//               )}
//           </Popup>
//           <Popup
//             className="toolbar-pupup"
//             onClose={() => { }}
//             refEl={activeElement}
//             visible={!!activeData && activeElement.type}
//           >
//             {editData && (
//               <EditTextToolbar
//                 onInput={handleEditText}
//                 onBlur={(e) => {
//                   activeElement.current.style.visibility = 'visible';
//                   setActiveData(null);
//                   setEditData(null);
//                 }}
//                 style={editData.style}
//                 dangerouslySetInnerHTML={{ __html: editData.text }}
//               ></EditTextToolbar>
//             )}
//             {activeComponentData &&
//               activeElement &&
//               activeElement.type == 'img' && (
//                 <ImageToolbar
//                   target={editElementData}
//                   onChange={handleImg}
//                   settingLink={settingLink}
//                   setLink={setLink}
//                 />
//               )}
//             {activeComponentData &&
//               activeElement &&
//               activeElement.type == 'text' && (
//                 <TextToolbar
//                   target={editElementData}
//                   onChange={handleStartEditText}
//                   setStyle={setStyle}
//                   settingLink={settingLink}
//                   setLink={setLink}
//                   scrollRef={dragScroll}
//                 />
//               )}
//             {activeComponentData &&
//               activeElement &&
//               activeElement.type == 'button' && (
//                 <ButtonToolbar
//                   target={editElementData}
//                   onChange={handleStartEditText}
//                   setStyle={setStyle}
//                   settingLink={settingLink}
//                   setLink={setLink}
//                   scrollRef={dragScroll}
//                 />
//               )}
//           </Popup>
//           <LinkModal
//             title="配置链接"
//             visible={linkVisible}
//             onCancel={() => {
//               setLinkVisible(false);
//             }}
//             onConfirm={(data) => {
//               setLinkVisible(false);
//               settingLinkCallback.current(data);
//             }}
//           />
//         </div>
//         <Modal
//           title='另存为'
//           destroyOnClose
//           visible={saveAstemplateVisible}
//           onCancel={() => {
//             setSaveAstemplateVisible(false)
//           }}
//           onConfirm={handleConfirm}
//         >
//           <Form
//             layout={'vertical'}
//             initialValues={{}}
//             visible={saveAstemplateVisible}
//             onSubmit={handleSubmit}
//             onError={(error) => { }}
//             ref={saveAstemplateRef}
//           >
//             <Form.Item
//               label="模板名称"
//               name="saveAstemplateName"
//               rules={[
//                 {
//                   required: true,
//                   message: '请输入模板名称',
//                 },
//               ]}
//             >
//               <Input
//                 placeholder="请输入模板名称"
//               />
//             </Form.Item>
//           </Form>
//         </Modal>
//       </div>
//     </PageContext.Provider>
//   );
// };
const Setting = () => {
  return (
    <div className="drag-container">
      <div className="layout page-layout">
        <NavController />
        <div className="content">
          <ContentController />
        </div>
        <ElementMenu />
        {/* <AddPage /> */}
        <ThemeController />
      </div>
    </div>
  )
}
export default Setting;
