import React from 'react'
import InnerAppLayout from 'layouts/inner-app-layout';
import ChatContent from './ChatContent';
import ChatMenu from './ChatMenu';

const Message = props => {
	return (
		<div className="chat">
			<InnerAppLayout
				sideContent={<ChatMenu {...props} />}
				mainContent={<ChatContent {...props} />}
				sideContentWidth={450}
				sideContentGutter={false}
				border
			/>
		</div>
	)
}

export default Message
