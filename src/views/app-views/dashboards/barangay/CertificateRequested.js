import React from 'react'
import {Card, Row, Col} from "antd"

const CertificateRequested = ({status}) => {
    return (
        <>
            <Card title={status}>
                <h4>Barangay Clearance</h4>
            <Row gutter={30}>
                    <Col sm={24} md={12}>
                        <h3>Price</h3>
                        <h4 className="text-muted">50</h4>
                    </Col>
                    <Col sm={24} md={12}>
                        <h3>Paid</h3>
                        <h4 className="text-muted">No</h4>
                    </Col>
                </Row>
            </Card>
        </>
    )
}

export default CertificateRequested
