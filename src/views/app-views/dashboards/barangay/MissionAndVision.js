import React from 'react'
import { Card, Row, Col} from 'antd';

const MissionAndVision = () => {
    return (
        <>
            <Card title="Purpose">
                <Row gutter={30}>
                    <Col sm={24} md={12}>
                        <h3>Mission</h3>
                        <h4 className="text-muted">The University of Rizal System is committed to nurture and produce upright and competent graduates and empowered community through relevant and sustainable higher professional and technical instruction, research, extension and production services.</h4>
                    </Col>
                    <Col sm={24} md={12}>
                        <h3>Vision</h3>
                        <h4 className="text-muted">The University of Rizal System is committed to nurture and produce upright and competent graduates and empowered community through relevant and sustainable higher professional and technical instruction, research, extension and production services.</h4>
                    </Col>
                </Row>
            </Card>
        </>
    )
}

export default MissionAndVision
