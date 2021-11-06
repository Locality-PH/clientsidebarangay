import React, {useState, useEffect} from 'react'
import { Card, Button } from 'antd';

const About = () => {
    const [about, setAbout] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setAbout([])
        setIsLoading(false)
    }, [about])

    return (
        <>
            <Card title="About" loading={isLoading}>
                <p>The Philippines is one of the world’s largest archipelago nations. It is situated in Southeast Asia in the Western Pacific Ocean. Its islands are classified into three main geographical areas – Luzon, Visayas, and Mindanao. Because of its archipelagic nature, Philippines is a culturally diverse country. With its topography consisting of mountainous terrains, dense forests, plains, and coastal areas.</p>
                <div className="mt-3">
                    <Button type="primary" shape="round" style={{width: "100%", height: "3rem"}}>Learn More</Button>
                </div>
             </Card>
        </>
    )
}

export default About
