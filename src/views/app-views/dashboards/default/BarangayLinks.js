import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';
import {Link} from "react-router-dom";

const renderAvatar = props => {
	return <Avatar {...props} className={`ant-avatar-${props.type}`}>{props.text}</Avatar>;
}

export const BarangayLinks = props => {
	const { name, suffix, subTitle, id, type, src, icon, size, shape, gap, text} = props
	return (
		<>
			<div className="avatar-status d-flex align-items-center">
				{renderAvatar({icon, src, type, size, shape, gap, text })}
				<div className="ml-2">
					<div>
						<Link to="/test">
							<div className="avatar-status-name">{name}</div>
							<span>{suffix}</span>
							</Link>
					</div>
					<div className="text-muted avatar-status-subtitle">{subTitle}</div>
				</div>
			</div>
		</>
	)
}

BarangayLinks.propTypes = {
	name: PropTypes.string,
	src: PropTypes.string,
	type: PropTypes.string,
	onNameClick: PropTypes.func
}

export default BarangayLinks;
