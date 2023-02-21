import React, { useState, useEffect } from "react";
import { Row, Col, Card, message, Button } from "antd";
import OrganizationList from "./organization-list";
import Campaign from "components/shared-components/Campaign";
import { CausesData } from "./DefaultDashboardData";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment"
import { useAuth } from "contexts/AuthContext";
import CampaignCard from "components/shared-components/CampaignCard";
import InfiniteScroll from "react-infinite-scroll-component";

export const DefaultDashboard = () => {
  const { currentOrganization, generateToken } = useAuth();

  //for api
  const source = axios.CancelToken.source();
  const cancelToken = source.token;

  //useState
  const [causesData] = useState(CausesData);
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [pageSetup, setPageSetup] = useState({ page: 1, pageSize: 2, landingPage:"homepage"})

  //useEffect
  useEffect(() => {
    getLatestCampaign()
  }, [pageSetup])

  //axios
  const getLatestCampaign = async () => {
    setLoading(true)

    const { page, pageSize, landingPage} = pageSetup

    await axios.get(
      `/api/campaign/latest?page=${page}&pageSize=${pageSize}&landingPage=${landingPage}`,
      generateToken()[1],
      { cancelToken })
      .then(
        (res) => {
          var data = res.data
          data.map((data) => data.starting_date = moment(new Date(data.starting_date)))

          setCampaigns([...campaigns, ...data])
          if (data.length == 0) setHasMore(false)
        })
      .catch((error) => {
        message.error("There is a problem with uploading the data!!!")
        console.log("error", error)
      })

    setLoading(false)
  }


  return (
    <>
      <InfiniteScroll
        dataLength={campaigns.length - 1} //This is important field to render the next data
        next={() => setPageSetup({ ...pageSetup, page: pageSetup.page + 1 })}
        hasMore={hasMore}
        loader={
          <h1>Loading...</h1>
        }
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >

        <Row gutter={16} align="center" className="w-100">
          {/* OrganizationList */}
          <Col xs={22} sm={22} md={22} lg={18} xl={18} xxl={14}>
            <OrganizationList />
          </Col>

        </Row>


        <Row gutter={16} align="center" className="w-100">
          {/* Trending Campaign */}
          <Col xs={22} sm={22} md={22} lg={18} xl={18} xxl={14}>
            <Card
              title="Trending Campaign"
              extra={<Link to="feeds/campaigns" style={{ fontSize: "1rem" }}>More</Link>}
            >
              <div className="mt-3">
                {causesData.map((result, i) => (
                  <div
                    key={i}
                    className={`d-flex align-items-center justify-content-between mb-4`}
                  >
                    <Campaign
                      id={i}
                      src={result.img}
                      name={result.title}
                      subTitle={result.supporters}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>

        {/* Post */}
        <Row gutter={16} align={"center"} className="w-100">
          {campaigns.length > 0 &&
            campaigns.map((campaign, id) => (
              <Col xs={22} sm={22} md={22} lg={18} xl={18} xxl={14} key={id} className="mb-2">
                <CampaignCard
                  title={campaign.title}
                  category={campaign.category}
                  orgName={campaign?.organization?.organization_name}
                  startingDate={campaign.starting_date}
                  content={campaign.description}
                  orgProfile={campaign?.organization?.profile}
                  images={campaign.images}
                  // isVisit={false}
                  enableVisit={false}
                  enablePost={false}
                />
              </Col>
            ))}
        </Row>


      </InfiniteScroll>
    </>
  );
};

export default withRouter(DefaultDashboard);
