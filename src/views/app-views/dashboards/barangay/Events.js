import React, {useState, useEffect} from 'react'
import { Card } from 'antd';
import { barangayEvents } from './BarangayData';
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
                            <div className={`${i === (events.length - 1)? '' : 'mb-4'}`} key={`connection-${i}`}>
                                <AvatarStatus src={result.img} name={result.name} subTitle={result.desc}/>
                            </div>
                        )
                    }) 
                }
	        </Card>
        </>
    )
}

export default Events
