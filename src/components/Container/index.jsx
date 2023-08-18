
import { getBackground } from '@utils'

// 引入组件
import { OpenLink, Button } from '../index';

// 引入样式
import './index.scss';

const Container = props => {
	const { title, subtitle, footerButtonText, children, config, query } = props
	return (
		<div className="container-full card-container-full" style={getBackground(config)}>
			<div className="container">
				{config.layout && config.layout.header !== false && (
					<div className="container-header">
						<OpenLink data={title} type="text" name="title" edit>
							<h2 className="container-title" dangerouslySetInnerHTML={{ __html: title.text }}></h2>
						</OpenLink>
						<div className="container-line"></div>
						<OpenLink data={subtitle} type="text" name="subtitle" edit>
							<h3 className="container-subtitle" dangerouslySetInnerHTML={{ __html: subtitle.text }}></h3>
						</OpenLink>
					</div>
				)}
				<div className="container-body">{children}</div>
				{config.layout && config.layout.footer !== false && (
					<div className="container-footer">
						<OpenLink data={footerButtonText} queryData={query} type="button" name="footerButtonText" edit={true}>
							<Button {...footerButtonText} />
						</OpenLink>
					</div>
				)}
			</div>
		</div>
	)
}

export default Container;
