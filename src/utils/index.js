// import { useStore } from 'react-redux';
import { setPagesConfig } from '../redux/actions';
import _ from 'lodash';

/**
 * 生成uuid
 * @returns 
 */
export const uuid = () => {
  var s = [];
  var hexDigits = '0123456789abcdef';
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-';

  var uuid = s.join('');
  return uuid;
};

/**
 * 查找组件
 * @param {*} e 
 * @param {*} pages 所有组件 
 * @returns 
 */
export const findElement = (e, pages) => {
	let pageY = e.pageY
	return Object.keys(pages)
		.map(item => {
			if (pages[item]) {
				let current = pages[item].ref.current
				if (current) {
					let size = current.getBoundingClientRect()
					let height = size.height
					if (pageY >= size.y && pageY <= size.y + height) {
						return pages[item]
					}
				}
			}
		})
		.filter(item => item)[0]
}

/**
 * 查找点击范围所选元素的子类元素
 * @param {*} dom 
 * @returns 
 */
export const findSelectElement = dom => {
	if (!dom) return []
	let elemetns = []
	const findSelectElements = ele => {
		for (let i = 0; i < ele.children.length; i++) {
			let item = ele.children[i]
			if (item.dataset.edit) {
				elemetns.push(item)
				continue
			}
			findSelectElements(item)
		}
	}
	findSelectElements(dom)
	return elemetns
}

/**
 * 查询是否有子元素
 * @param {*} e 
 * @param {*} dom 
 * @returns 
 */
export const findSelectElementTarget = (e, dom) => {
	let ele = findSelectElement(dom)
	// 这里应该减去 drop-layer 元素到顶端和左边的距离
	let pageX = e.pageX
	let pageY = e.pageY
	// let pageX = e.pageX - getOffsetLeft(e.target) + scrollElement.scrollLeft
	// let pageY = e.pageY - getOffsetTop(e.target) + scrollElement.scrollTop

	let target = ele.filter(item => {
		let current = item.getBoundingClientRect()
		let width = current.width
		let height = current.height
		let top = current.y
		let left = current.x
		if (pageY >= top && pageY <= top + height && pageX >= left && pageX <= left + width) {
			return item
		}
	})[0]
	if (target) {
		return {
			current: target,
			type: target.dataset.type,
		}
	}
	return target
}

/**
 * 获取当前添加组件位置
 * @param {*} e 
 * @param {*} dragContent 
 * @param {*} activePage 
 * @param {*} pagesRefList 
 * @returns 
 */
export const findTargetIndex = (e, dragContent, activePage, pagesRefList) => {
  let dragContentSize = dragContent.current.getBoundingClientRect()
  let dragSize = dragContent.current.scrollTop + e.pageY - dragContentSize.y
  if (!activePage.content) {
    activePage.content = []
  }
  let pages = activePage.content
  let targetIndex = null

  pages.forEach((item, index) => {
    let refSize = pagesRefList.current[item.id].ref.current.getBoundingClientRect()
    let refY = dragContent.current.scrollTop + refSize.y - dragContentSize.y
    if (refY < dragSize && refY + refSize.height > dragSize) {
      if (refY + refSize.height / 2 < dragSize) {
        targetIndex = index - 1
      } else {
        targetIndex = index
      }
      return item
    }
  })
  return targetIndex
}

/**
 * 
 * @param {*} color 
 * @returns 
 */
export const handleRgbaColor = color => {
	const {r, g, b, a } = color.metaColor;
	return `rgba(${r},${g},${b},${a})`
}

/**
 * 
 * @param {*} config 
 * @returns 
 */
export const getBackground = config => {
	const img = config.style.backgroundImage
	let url = handleUrl(img)

	return {
		backgroundImage: `url(${url})`,
		backgroundColor: config.style.backgroundColor,
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
	}
}
/**
 * 
 * @param {*} img 
 * @returns 
 */
export const handleUrl = img => {
	let url = null
	if (img) {
		if (img.indexOf('static') != -1 || img.indexOf('pc') != -1) {
			url = img
		} else if (img.indexOf('base64') != -1) {
			url = img
		} else if (img.indexOf('http') != -1) {
			url = img
		} else {
			// url = OSSUrl + img
		}
	}
	return url
}

/**
 * 
 * @param {*} e 
 * @param {*} callback 
 * @returns 
 */
export const handleImgUploadChange = (e, callback) => {
	if (!e.target.files[0]) {
		return
	}
	let file = e.target.files[0]
	let form = new FormData()
	form.append('file', file)
	form.append('fileName', file.name)
	form.append('fileType', _.last(file.name.split('.')))
	// request.hpMagrCommFileUploadFile(form).then(res => {
	// 	callback(res.data)
	// })
	return false
}

/**
 * 
 * @param {*} option 
 * @returns 
 */
export const getUrlSearch = option => {
	let search = '?'
	for (let attr in option) {
		search = `${search}${attr}=${option[attr]}&`
	}
	return search.slice(0, search.length - 1)
}

/**
 * 
 * @returns 
 */
export const getUrlSearchData = () => {
	let searchObj = {}
	let searchStr = location.search.slice(1).split('&')
	searchStr.forEach(item => {
		let ary = item.split('=')
		searchObj[ary[0]] = ary[1]
	})
	return searchObj
}
