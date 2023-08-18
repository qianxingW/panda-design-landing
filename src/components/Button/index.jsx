import { useEffect, useRef } from 'react'

import { Button } from 'antd'

// 引入样式
import './index.scss'

const Container = props => {
	const { type = 'default', style, defaultStyle = {}, hoverStyle = {}, text, ...prop } = props

	const button = useRef(null)
	useEffect(() => {
		if (!button.current) return
		if (type === 'default') {
			button.current.style.setProperty('--button-border-color', defaultStyle.borderColor || '#111628')
			button.current.style.setProperty('--button-background-color', defaultStyle.backgroundColor || 'transparent')
			button.current.style.setProperty('--button-text-color', defaultStyle.textColor || '#15171F')
			button.current.style.setProperty('--button-hover-border-color', hoverStyle.borderColor || 'var(--website-theme-color)')
			button.current.style.setProperty('--button-hover-background-color', hoverStyle.backgroundColor || 'transparent')
			button.current.style.setProperty('--button-hover-text-color', hoverStyle.textColor || 'var(--website-theme-color)')
		} else {
			button.current.style.setProperty('--button-border-color', defaultStyle.borderColor || '#214EFF')
			button.current.style.setProperty('--button-background-color', defaultStyle.backgroundColor || '#214EFF')
			button.current.style.setProperty('--button-text-color', defaultStyle.textColor || '#fff')
			button.current.style.setProperty('--button-hover-border-color', hoverStyle.borderColor || 'var(--website-theme-color)')
			button.current.style.setProperty('--button-hover-background-color', hoverStyle.backgroundColor || 'var(--website-theme-color)')
			button.current.style.setProperty('--button-hover-text-color', hoverStyle.textColor || '#fff')
		}
	}, [defaultStyle, type, hoverStyle, props])

	return (
		<Button
			{...prop}
			style={{
				...style,
			}}
			className="site-button"
			type={type}
			ref={button}
		>
			<span dangerouslySetInnerHTML={{ __html: text }}></span>
		</Button>
	)
}

export default Container
