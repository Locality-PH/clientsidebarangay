import CampaignView from 'components/shared-components/CampaignView'
import { useHistory, useParams } from "react-router-dom";
import React from 'react'

const CampaignPreview = (organizationId) => {
    //Initialize
    console.log(useParams());
    const { campaignId } = useParams();
    return (
        <div>
            <CampaignView organization_id={organizationId} campaign_id={campaignId} />
        </div>
    )
}

export default CampaignPreview