import * as ActionTypes from './actionTypes';

// 设置页面配置信息;
export const setPagesConfig = (data) => {
  return {
    type: ActionTypes.SET_PAGESCONFIG,
    data,
  };
};

// 新增页面配置信息;
export const addPagesConfig = (data) => {
  return {
    type: ActionTypes.ADD_PAGESCONFIG,
    data,
  };
};

// 修改页面配置信息;
export const editPagesConfig = (data) => {
  return {
    type: ActionTypes.EDIT_PAGESCONFIG,
    data,
  };
};

// 删除页面配置信息;
export const delPagesConfig = (data) => {
  return {
    type: ActionTypes.DEL_PAGESCONFIG,
    data,
  };
};

// 设置选择的页面
export const setActivePageKey = (data) => {
  return {
    type: ActionTypes.SET_ACTIVEPAGEKEY,
    data,
  };
};

// 设置选中的组件ID
export const setActiveElementId = (data) => {
  return {
    type: ActionTypes.SET_ACTIVE_ELEMENT_ID,
    data,
  };
};

// 设置选中的组件
export const setActiveElement = (data) => {
  return {
    type: ActionTypes.SET_ACTIVE_ELEMENT,
    data,
  };
};