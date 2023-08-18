import { useEffect, useMemo, useState, useRef } from 'react'

// 引入样式
import clsx from 'clsx'

// 引入样式
import './index.scss'

export default function ImagePic(props) {
	const { className, alt, style, mode = 'scaleToFill', src, ...prop } = props

	const ref = useRef(null)

	const [load, setLoad] = useState(false)
	const [imgStyle, setImgStyle] = useState({})
	const [warpStyle, setWarpStyle] = useState({})

	useEffect(() => {
		setImgStyle(imgStyleFn())
		setWarpStyle(warpStyleFn())
	}, [src, mode, load, ref.current])

	const imgStyleFn = () => {
		if (!ref.current) {
			return {}
		}
		let size = ref.current.getBoundingClientRect()

		if (!size) {
			return {}
		}
		switch (mode) {
			case 'scaleToFill':
				return {
					backgroundPosition: '0% 0%',
					backgroundSize: '100% 100%',
					backgroundRepeat: 'no-repeat',
				}
			case 'aspectFit':
				return {
					backgroundPosition: 'center center',
					backgroundSize: 'contain',
					backgroundRepeat: 'no-repeat',
				}
			case 'aspectFill':
				return {
					backgroundPosition: 'center center',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
				}
			case 'widthFix':
				return {
					backgroundSize: '100% 100%',
					backgroundRepeat: 'no-repeat',
				}
			case 'heightFix':
				return {
					backgroundSize: '100% 100%',
					backgroundRepeat: 'no-repeat',
				}
			case 'top':
				return {
					backgroundPosition: 'center top',
					backgroundSize: 'auto',
					backgroundRepeat: 'no-repeat',
				}
			case 'bottom':
				return {
					backgroundPosition: 'center bottom',
					backgroundSize: 'auto',
					backgroundRepeat: 'no-repeat',
				}
			case 'center':
				return {
					backgroundPosition: 'center center',
					backgroundSize: 'auto',
					backgroundRepeat: 'no-repeat',
				}
			case 'left':
				return {
					backgroundPosition: 'left center',
					backgroundSize: 'auto',
					backgroundRepeat: 'no-repeat',
				}
			case 'right':
				return {
					backgroundPosition: 'right center',
					backgroundSize: 'auto',
					backgroundRepeat: 'no-repeat',
				}
			case 'top left':
				return {
					backgroundPosition: 'left top',
					backgroundSize: 'auto',
					backgroundRepeat: 'no-repeat',
				}
			case 'top right':
				return {
					backgroundPosition: 'right top',
					backgroundSize: 'auto',
					backgroundRepeat: 'no-repeat',
				}
			case 'bottom left':
				return {
					backgroundPosition: 'left bottom',
					backgroundSize: 'auto',
					backgroundRepeat: 'no-repeat',
				}
			case 'bottom right':
				return {
					backgroundPosition: 'right bottom',
					backgroundSize: 'auto',
					backgroundRepeat: 'no-repeat',
				}
		}
	}

	const warpStyleFn = () => {
		if (!ref.current) {
			return {}
		}
		let size = ref.current.getBoundingClientRect()
		if (!size) {
			return {}
		}
		switch (mode) {
			case 'scaleToFill':
				return {}
			case 'aspectFit':
				return {}
			case 'aspectFill':
				return {}
			case 'widthFix':
				return {
					height: (size.width / ref.current.naturalWidth) * ref.current.naturalHeight,
				}
			case 'heightFix':
				return {
					width: (size.height / ref.current.naturalHeight) * ref.current.naturalWidth,
				}
			case 'top':
				return {}
			case 'bottom':
				return {}
			case 'center':
				return {}
			case 'left':
				return {}
			case 'right':
				return {}
			case 'top left':
				return {}
			case 'top right':
				return {}
			case 'bottom left':
				return {}
			case 'bottom right':
				return {}
		}
	}

	const picSrc = useMemo(() => {
		let url = null
		if (src) {
			if (src.indexOf('static') != -1 || src.indexOf('pc') != -1) {
				url = src
			} else if (src.indexOf('base64') != -1) {
				url = src
			} else if (src.indexOf('http') != -1) {
				url = src
			} else {
				// 网络图片
				// url = OSSUrl + src
			}
		}
		return url
	}, [src])

	return (
		<div
			className={clsx(className, 'panda-design-image', `panda-design-image`)}
			style={{
				...style,
				...warpStyle,
			}}
			{...prop}
		>
			<div style={{ backgroundImage: `url(${picSrc})`, ...imgStyle }}></div>
			<img
				src={picSrc}
				ref={ref}
				alt={alt}
				onLoad={() => {
					setLoad(true)
				}}
			/>
		</div>
	)
}
