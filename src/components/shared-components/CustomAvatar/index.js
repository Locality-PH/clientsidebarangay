import { React, useState, useEffect } from 'react'
import { Avatar } from 'antd'
import { UserOutlined } from "@ant-design/icons";

const CustomAvatar = (props) => {
    const { icon, image, color, style, size, className, onClick = (null)} = props
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
                    onClick={() => onClick()}
                />

                :

                <Avatar
                    className={className}
                    size={size}
                    style={{ ...style, ...backgroundColor }}
                    icon={icon}
                    onClick={() => onClick()}
                />

        }
    )
}

CustomAvatar.defaultProps = {
    icon: <UserOutlined />,
    size: 70,
    onClick: () => console.log("tite", tite)
};

export default CustomAvatar