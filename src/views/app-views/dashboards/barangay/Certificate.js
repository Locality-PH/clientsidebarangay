import React from 'react'
import { Row, Col} from 'antd';
import CertificateRequestForm from './CertificateRequestForm';
import CertificateRequested from './CertificateRequested';

const Certificate = () => {
    return (
        <>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
                    <CertificateRequestForm></CertificateRequestForm>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
                    <CertificateRequested status="Pending"></CertificateRequested>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
                    <CertificateRequested status="Ready"></CertificateRequested>
                </Col>
            </Row>
        </>
    )
}

export default Certificate
