import React, { useState, useEffect } from "react";
import { Row, Col, Card, message, Button } from "antd";
import OrganizationList from "./organization-list";
import Campaign from "components/shared-components/Campaign";
import { CausesData } from "./DefaultDashboardData";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
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
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [pageSetup, setPageSetup] = useState({ page: 1, pageSize: 2 });

  //useEffect
  useEffect(() => {
    getLatestCampaign({ page: pageSetup.page, pageSize: pageSetup.pageSize });
  }, [pageSetup]);

  //axios
  const getLatestCampaign = async (pageConfig) => {
    setLoading(true);

    const { page, pageSize } = pageConfig;

    await axios
      .get(
        `/api/campaign/latest?page=${page}&pageSize=${pageSize}`,
        generateToken()[1],
        { cancelToken }
      )
      .then((res) => {
        var data = res.data;
        data.map(
          (data) => (data.starting_date = moment(new Date(data.starting_date)))
        );

        setCampaigns([...campaigns, ...data]);
        if (data.length == 0) setHasMore(false);
      })
      .catch((error) => {
        message.error("There is a problem with uploading the data!!!");
        console.log("error", error);
      });

    setLoading(false);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={campaigns.length - 1} //This is important field to render the next data
        next={() => setPageSetup({ ...pageSetup, page: pageSetup.page + 1 })}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Row gutter={16} align="center" className="w-100">
          {/* OrganizationList */}
        </Row>

        {/* Post */}
        <Row gutter={16} align={"center"} className="w-100">
          <Col xs={24} sm={24} md={22} lg={12} xl={12} xxl={12}>
            <OrganizationList />
          </Col>

          {/* Trending Campaign */}
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Card
              title="Trending Campaign"
              extra={
                <Link to="feeds/campaigns" style={{ fontSize: "1rem" }}>
                  More
                </Link>
              }
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
          {campaigns.length > 0 &&
            campaigns.map((campaign, id) => (
              <Col
                xs={24}
                sm={24}
                md={22}
                lg={18}
                xl={18}
                xxl={14}
                key={id}
                className="mb-4"
              >
                <CampaignCard
                  title={campaign?.title}
                  category={campaign?.category}
                  orgName={campaign?.organization?.organization_name}
                  startingDate={campaign?.starting_date}
                  name={
                    campaign?.publisher?.first_name +
                    " " +
                    campaign?.publisher?.last_name
                  }
                  content={campaign.description}
                  profile={campaign?.publisher?.profileUrl}
                  images={campaign?.images}
                  isVisit={false}
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
