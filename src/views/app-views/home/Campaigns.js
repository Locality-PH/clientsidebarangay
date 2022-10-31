import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'antd';
import { BarangayData } from './DefaultDashboardData';
import { Link } from 'react-router-dom';

const Campaigns = () => {
    const [barangayList, setBarangayList] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    // const [error, setError] = useState(null)

    useEffect(() => {
        setBarangayList(BarangayData)
        setIsLoading(false)
    }, [barangayList]);

    return (
        <>
            <Row gutter={16} >
                {
                    barangayList.map((result, i) => (
                        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12} key={i}>
                            <Card title={result.name}>
                                <img
                                    width="100%"
                                    alt="logo"
                                    src="/img/barangay/caniogan/BarangayCover.jpg"
                                />
                                <Button type="primary" shape="round"><Link to={`barangay/${result.name}`}>View</Link></Button>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </>
    )
}

export default Campaigns;
