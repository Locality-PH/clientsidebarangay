import React from 'react'
import './LayoutComponents.css'
import {  MessageOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';



export const NavMessage = () => {
    return (
        <div>
            <Link to="/app/apps/chat">
            < MessageOutlined className="nav-icon" style={{color: "white", marginRight: "10px"}}/>
            </Link>
        </div>
    )
}
