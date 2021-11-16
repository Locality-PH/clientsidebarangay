import React, { Component } from 'react'
import { Form, Button, Input, Row, Col, message, Card, Space } from 'antd';
import {AiOutlineCheckCircle} from 'react-icons/ai'


export class EmailVerification extends Component {
    render() {
        return (
            <Card className="setting-content">
                <h2 className="mb-4">Email Verification</h2>

                    <Row style={{height: "inherit"}}>
                        <Col span={18} style={{display: "flex", alignItems: "center"}}>
                                <p style={{margin: "0px", color: "black"}}>Verify your email address to protect your account and to help you recover your password if you forget it.</p>
                        </Col>

                        <Col span={6}>
                            <div class="text-right">
                                {/* <Button type="primary">
                                    Send Code
                                </Button> */}

                                <h4 style={{color: "green"}}>Verified <AiOutlineCheckCircle/></h4>
                            </div>
                        </Col>
                    </Row>

            </Card>
        )
    }
}

export default EmailVerification
