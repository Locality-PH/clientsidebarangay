import React, { useState, useEffect } from "react";
import { Row, Col, Card, message, Divider, Skeleton, Button } from "antd";
import SearchCampaign from "components/shared-components/SearchCampaign";
import Officials from "./officials/Officials";
import Events from "./events/Events";
import About from "./about/About";
import MissionAndVision from "./other/MissionAndVision";
import Projects from "./other/Projects";
import { useAuth } from "contexts/AuthContext";
import axios from 'axios'
import moment from 'moment'


const Organization = ({ organizationId, organization, match }) => {
  console.log("match", match)
  //for api
  const source = axios.CancelToken.source();
  const cancelToken = source.token;
  const { generateToken } = useAuth();

  //useState
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [campaignList, setCampaignList] = useState([]);
  const [pageSetup, setPageSetup] = useState({ page: 1, pageSize: 2, landingPage: "barangay", })

  //useEffect
  useEffect(() => {
    getLatestCampaign()
  }, [])

  useEffect(() => {
    getLatestCampaign()
  }, [pageSetup])

  //axios
  const getLatestCampaign = async () => {
    const { page, pageSize, landingPage } = pageSetup

    setLoading(true)

    try {
      await axios.get(
        `/api/campaign/latest?page=${page}&pageSize=${pageSize}&landingPage=${landingPage}&orgId=${organizationId}`,
        generateToken()[1],
        { cancelToken })
        .then(
          (res) => {
            var data = res.data
            console.log("data", data)
            setCampaignList([...campaignList, ...data])
            if (data.length == 0) setHasMore(false)
          })
    } catch (error) {
      handleError(error)
    }

    setLoading(false)
  }

  const handleError = (error) => {
    message.error("There is a problem with uploading the data!!!")
    console.log("error", error)
  }

  return (
    <>
      <Row gutter="16">
        <Col xs={24} sm={24} md={8}>
          <Officials organizationMembers={organization?.organization_member} />
          <About about={organization.about} />
        </Col>

        <Col xs={24} sm={24} md={16}>
          <MissionAndVision mission={organization.mission} vision={organization.vision} />

          <Card title={"Organization Events"}>
            {campaignList.map((item, i) => {
              return (
                <div key={i}>
                  <Divider
                    className="divider-margin"
                    style={{ margin: "0px !important" }}
                  />
                  <Col sm={24} md={24}>
                    <SearchCampaign
                      startDate={
                        new Date(item?.starting_date)
                      }
                      profile={
                        item && item.images && item.images[0]
                          ? item.images[0].data
                          : undefined
                      }
                      title={item?.title}
                      address={item?.organization?.address}
                      name={item?.organization?.organization_name}
                      id={item?.organization?.organization_id}
                      campaign_id={item?._id}
                      link={`${match.url}/campaign/${item?._id}`}
                    />
                  </Col>
                </div>
              );
            })}
            {loading && (
              <>
                <Col sm={24} md={24}>
                  <Card>
                    <Skeleton loading={loading} avatar active></Skeleton>
                  </Card>
                </Col>
                <Col sm={24} md={24}>
                  <Card>
                    <Skeleton loading={loading} avatar active></Skeleton>
                  </Card>
                </Col>
                <Col sm={24} md={24}>
                  <Card>
                    <Skeleton loading={loading} avatar active></Skeleton>
                  </Card>
                </Col>
              </>
            )}
            <Col justify="center" className="text-center" sm={24} md={24}>
              {!loading && hasMore && (
                <Button
                  onClick={() => setPageSetup({ ...pageSetup, page: pageSetup.page + 1 })}
                >
                  Load More
                </Button>
              )}
            </Col>
          </Card>

        </Col>
      </Row>
    </>
  );
};

export default Organization;
