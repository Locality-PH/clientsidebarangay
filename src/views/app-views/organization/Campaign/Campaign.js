import React from 'react'
import { Row, Col } from 'antd';
import CampaignForm from './CampaignForm';
import CampaignRequested from './CampaignRequested';

const Campaign = ({barangayUrl}) => {
    return (
        <>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
              <CampaignForm></CampaignForm>
            </Col>
       
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={16}>
                <CampaignRequested barangayUrl={barangayUrl}></CampaignRequested>
            </Col>
        </Row>
        </>
    )
}

export default Campaign
