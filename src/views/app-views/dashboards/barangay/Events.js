import React, {useState, useEffect} from 'react'
import { Card, Button} from 'antd';
import { barangayEvents } from './BarangayData';
import {Link} from "react-router-dom";
import AvatarStatus from 'components/shared-components/AvatarStatus';

const Events = () => {
    const [events, setEvents] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setEvents(barangayEvents)
        setIsLoading(false)
    }, [events])
    
    return (
        <>
            <Card title="Upcoming Events" loading={isLoading}>
                {
                    events.map((result, i) => {
                        return (
                            <div key={i} className={`d-flex align-items-center justify-content-between mb-4`}>
                                <AvatarStatus src={result.img} name={result.name} subTitle={result.desc}/>
                                <Link to="">
                                    <Button type="primary" shape="round">View</Button>
                                </Link>
                            </div>
                        )
                    }) 
                }
	        </Card>
        </>
    )
}

export default Events
