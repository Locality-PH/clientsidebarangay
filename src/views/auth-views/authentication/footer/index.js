import React from 'react'
import { Row, Col, Card, Space, Layout, Divider } from "antd";
//Icons
import { FaFacebook, FaInstagram, FaTwitterSquare, FaFacebookMessenger } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="footer">
    <Row className="w-100 h-100" justify='center' align="middle" style={{ padding: "15px 10px" }}>
        <Space className="footer-content" direction="vertical" >
            <Space>
                <FaFacebook size="2em" color="black" />
                <FaInstagram size="2em" color="black" />
                <FaTwitterSquare size="2em" color="black" />
            </Space>
            <Space size={[0, 2]} split={<Divider type="vertical" />} wrap="true" style={{ justifyContent: "center" }}>
                <a>About Us</a>
                <a>Contact Us</a>
                <a>Terms &#38; Condition</a>
                <a>Privacy Policy</a>
                <a>Cookie Policy</a>

            </Space>
            ©2021 Barangay App | All Rights Reserve.
        </Space>
    </Row>
</div>
  )
}

export default Footer