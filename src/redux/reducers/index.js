import { combineReducers } from "redux";
import * as ActionTypes from '../actionTypes';

import { cloneDeep } from 'lodash'

import { homeUrl, defaultPagesConfig } from "../template.config";


export function menu(state = [], action) {
	let data = null
	switch (action.type) {
		case ActionTypes.SET_MENU:
			return action.data
		case ActionTypes.ADD_MENU:
			return [...state, action.data]
		case ActionTypes.EDIT_MENU:
			data = state.map(item => (item.url == action.data.url ? (item = action.data) : item))
			return data
		case ActionTypes.DEL_MENU:
			data = state.filter(item => item.url !== action.data.url)
			return data
		default:
			return state
	}
}

export function activePageKey(state = homeUrl, action) {
	switch (action.type) {
		case ActionTypes.SET_ACTIVEPAGEKEY:
			return action.data
		default:
			return state
	}
}

export function pagesConfig(state = cloneDeep(defaultPagesConfig), action) {
	let data = null
	let allData = null
	switch (action.type) {
		case ActionTypes.SET_PAGESCONFIG:
			return action.data
		case ActionTypes.ADD_PAGESCONFIG:
			allData = {
				...state,
				pages: [...state.pages, action.data],
			}
			return {
				...state,
				pages: [...state.pages, action.data],
			}
		case ActionTypes.EDIT_PAGESCONFIG:
			data = state.pages.map(item => (item.url == action.data.url ? (item = action.data) : item))
			allData = {
				...state,
				pages: data,
			}
			return allData
		case ActionTypes.DEL_PAGESCONFIG:
			data = state.pages.filter(item => item.url !== action.data.url)
			allData = {
				...state,
				pages: data,
			}
			return allData
		case ActionTypes.SET_MENU:
			allData = {
				...state,
				menu: action.data,
			}
			return allData
		case ActionTypes.ADD_MENU:
			allData = {
				...state,
				menu: state.menu.concat([action.data]),
			}
			return allData
		case ActionTypes.EDIT_MENU:
			allData = {
				...state,
				menu: state.menu.map(item => {
					if (action.data.id) {
						if (item.id == action.data.id) {
							return action.data
						} else {
							return item
						}
					}
				}),
			}
			return allData
		case ActionTypes.DEL_MENU:
			allData = {
				...state,
				menu: state.menu.filter(item => item.id !== action.data.id),
			}
			return allData
		default:
			return state
	}
}

export function pagesIndexConfig(state = null, action) {
	switch (action.type) {
		case ActionTypes.SET_INDEX_PAGESCONFIG:
			if (!action.data) {
				return JSON.parse(defaultPagesConfig)
			}
			return action.data
		default:
			return state
	}
}

export function pagesPreviewConfig(state = null, action) {
	switch (action.type) {
		case ActionTypes.SET_PREVIEW_PAGESCONFIG:
			return action.data
		default:
			return state
	}
}

const reducers = combineReducers({
  menu,
  activePageKey,
  pagesConfig,
  pagesIndexConfig,
  pagesPreviewConfig,
});

export default reducers;