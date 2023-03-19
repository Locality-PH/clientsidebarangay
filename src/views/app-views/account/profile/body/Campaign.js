import { React, useState, useEffect } from 'react'
import { Row, Col, Tag, Card, Empty, Button, Spin, Divider, message } from 'antd';
import { LoadingOutlined, ClockCircleOutlined } from '@ant-design/icons';
import SuggestedCampaignList from 'components/shared-components/CampaignSuggestedList';
import { useAuth } from "contexts/AuthContext";
import axios from "axios";
import moment from "moment";

const Campaign = (props) => {
    //for api
    const source = axios.CancelToken.source();
    const cancelToken = source.token;
    const { generateToken } = useAuth();

    //useState
    const [campaigns, setCampaigns] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [pageSetup, setPageSetup] = useState({
        page: 1,
        pageSize: 5,
        landingPage: "suggestion",
    });

    //useEffect
    useEffect(() => {
        getLatestCampaign();
    }, []);

    useEffect(() => {
        getLatestCampaign();
    }, [pageSetup]);

    //axios
    const getLatestCampaign = async () => {
        const { page, pageSize, landingPage } = pageSetup;

        setLoading(true);

        try {
            await axios
                .get(
                    `/api/campaign/latest?page=${page}&pageSize=${pageSize}&landingPage=${landingPage}`,
                    generateToken()[1],
                    { cancelToken }
                )
                .then((res) => {
                    var data = res.data;
                    // data.map((data) => data.starting_date = moment(new Date(data.starting_date)))
                    setCampaigns([...campaigns, ...data]);
                    console.log("data", data);
                    if (data.length == 0) setHasMore(false);
                });
        } catch (error) {
            handleError(error);
        }

        setLoading(false);
    };

    const addSuggestedCampaign = async (values) => {

        await axios.post(
            `/api/campaign/add-suggestion`,
            { values },
            generateToken()[1],
            { cancelToken })
            .then(
                (res) => {
                    var data = res.data
                    data._id = data.campaign_id
                    var newCampaignList = [data, ...campaigns]
                    setCampaigns(newCampaignList)
                })
            .catch((error) => {
                handleError(error)
            })
    }

    const handleError = (error) => {
        message.error("There is a problem with uploading the data!!!");
        console.log("error", error);
    };


    const handleLoadMore = () => {
        setPageSetup({ ...pageSetup, page: pageSetup.page + 1 })
    }

    return (
        <Row gutter={16} align="center" className="w-100">
            <Col xs={24} lg={18}>
                {campaigns.length <= 0 ?
                    <Card loading={loading}>
                        <Empty description="You currenlty don't have any suggestion" />
                    </Card>
                    
                    :

                    <Card title="Your suggested Campaigns">
                        {campaigns.map((campaign, i) => {
                            return (
                                <div key={i}>
                                    <Divider
                                        className="divider-margin"
                                        style={{ margin: "0px !important" }}
                                    />
                                    <SuggestedCampaignList
                                        startDate={new Date(campaign?.starting_date)}
                                        profile={
                                            campaign && campaign.images && campaign.images[0]
                                                ? campaign.images[0].data
                                                : undefined
                                        }
                                        title={campaign?.title}
                                        address={campaign?.organization?.address}
                                        name={campaign?.organization?.organization_name}
                                        orgId={campaign?.organization?.organization_id}
                                        id={campaign?.organization?.organization_id}
                                        campaign_id={campaign?._id}
                                        status={campaign?.status}
                                    />
                                </div>
                            );
                        })}
                    </Card>
                }

            </Col>

            <Col justify="center" className="text-center" sm={24} lg={16}>
                {!loading ?
                    <>
                        {hasMore ?
                            <Button onClick={handleLoadMore}>Load more</Button>
                            :
                            <h4>You have seen it all!!"</h4>
                        }
                    </>

                    :

                    <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                }
            </Col>


        </Row>
    )
}

export default Campaign
