import * as ActionTypes from './actionTypes';

// 设置页面配置信息;
export const setPagesConfig = (data) => {
  return {
    type: ActionTypes.SET_PAGESCONFIG,
    data,
  };
};