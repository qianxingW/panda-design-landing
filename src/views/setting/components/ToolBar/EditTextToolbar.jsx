// react 依赖
import { useEffect, useRef } from 'react'

function EditTextToolbar(props) {
	const ref = useRef(null)

	function textFormat(e) {
		e.preventDefault()
		var text
		var clp = (e.originalEvent || e).clipboardData
		if (clp === undefined || clp === null) {
			text = window.clipboardData.getData('text') || ''
			if (text !== '') {
				if (window.getSelection) {
					var newNode = document.createElement('span')
					newNode.innerHTML = text
					window.getSelection().getRangeAt(0).insertNode(newNode)
				} else {
					document.selection.createRange().pasteHTML(text)
				}
			}
		} else {
			text = clp.getData('text/plain') || ''
			if (text !== '') {
				document.execCommand('insertText', false, text)
			}
		}
	}

	useEffect(() => {
		ref.current.addEventListener('paste', e => {
			textFormat(e)
		})
	}, [])

	return (
		<p suppressContentEditableWarning ref={ref} contentEditable="true" className="contentEditable-text" {...props}>
			{props.children}
		</p>
	)
}

export default EditTextToolbar
