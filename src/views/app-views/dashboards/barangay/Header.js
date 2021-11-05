import React from 'react'
import PropTypes from 'prop-types';
import { Row, Col, Card, Avatar, Typography, Button} from 'antd';
const { Text, Link } = Typography;

const renderAvatar = props => {
	return <Avatar {...props} className={`ant-avatar-${props.type}`}>{props.text}</Avatar>;
}

export const Header = props => {
	const { name, suffix, subTitle, id, type, src, icon, size, shape, gap, text, content} = props
	return (
		<>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={24}>
                    <Card>
                    
                        <div key={1} className={`d-flex align-items-center justify-content-between mb-4`}>
                            <div className="avatar-status d-flex align-items-center">
                                {renderAvatar({icon, src, type, size, shape, gap, text })}
                                <div className="ml-4">
                                    <div>
                                        <div className="avatar-status-name h1">{name}</div>
                                        <span>{suffix}</span>
                                    </div>
                                    <div className="text-muted avatar-status-subtitle h3">{subTitle}</div>
                                </div>
                            </div>

                            <div>
                            </div>
                        </div>
                        {/* <Col xs={24} sm={24} md={24} lg={12}>
                        <Text className="h4">{content}</Text>
                        </Col> */}
                        
                    </Card>
                </Col>
            </Row>
		</>
	)
}

Header.propTypes = {
	name: PropTypes.string,
	src: PropTypes.string,
	type: PropTypes.string,
	onNameClick: PropTypes.func
}

export default Header;
