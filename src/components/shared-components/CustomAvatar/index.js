import { React, useState, useEffect } from 'react'
import { Avatar } from 'antd'
import { UserOutlined } from "@ant-design/icons";

const CustomAvatar = (props) => {
    const { icon, image, color, style, size, className } = props
    const [error, setError] = useState(false)

    const backgroundColor = { backgroundColor: color }

    useEffect(() => {
        setError(false)
    }, [image]);

    return (
        {
            ...image != null && error != true ?
                <Avatar
                    className={className}
                    size={size}
                    style={style}
                    src={image}
                    onError={() => {
                        setError(true)
                    }}
                />

                :

                <Avatar
                    className={className}
                    size={size}
                    style={{ ...style, ...backgroundColor }}
                    icon={icon}
                />

        }
    )
}

CustomAvatar.defaultProps = {
    icon: <UserOutlined />,
    size: 70
};

export default CustomAvatar