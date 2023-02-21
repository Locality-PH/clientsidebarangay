import React, { useState, useEffect } from "react";
import { Card, Row, Col, Skeleton, Divider, Button, message } from "antd";
import axios from "axios";
import { useAuth } from "contexts/AuthContext";
import SearchAvatar from "components/shared-components/SearchAvatar";
import { useParams } from "react-router-dom";
import SearchCampaign from "components/shared-components/SearchCampaign";
import moment from "moment";
const Organizations = () => {
  // Context State
  const { generateToken } = useAuth();
  let { id } = useParams();
  const searchItem = id || "";
  // Barangay Search State
  const [barangayList, setBarangayList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [landingLoading, setLandingLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  // Page State
  const count = 6;
  const [start, setStart] = useState(7);
  // Campaign Search State
  const [campaignList, setCampaignList] = useState([]);
  const [isLoadingCampaign, setIsLoadingCampaign] = useState(false);
  const [landingLoadingCampaign, setLandingLoadingCampaign] = useState(false);
  const [hasMoreCampaign, setHasMoreCampaign] = useState(true);
  // Page State
  const countCampaign = 6;
  const [startCampaign, setStartCampaign] = useState(7);

  const handleGetAll = (data) => {
    setBarangayList(data);
    setIsLoading(false);
    setLandingLoading(false);
  };
  const handleGetAllCampaign = (data) => {
    setCampaignList(data);
    setIsLoadingCampaign(false);
    setLandingLoadingCampaign(false);
  };
  const handleNextGetAllCampaign = (data) => {
    setCampaignList((oldArray) => [...oldArray, ...data]);
    if (data.length === 0) setHasMoreCampaign(false);
    setIsLoadingCampaign(false);
  };
  const handleNextGetAll = (data) => {
    setBarangayList((oldArray) => [...oldArray, ...data]);
    if (data.length === 0) setHasMore(false);
    setIsLoading(false);
  };
  const getAllOrganizations = async (callback, token, data) => {
    await axios
      .get(
        `/api/organization/get-all-organizations?q=${data.trim()}&result=${count}&start=${0}`,
        token
      )
      .then((response) => {
        callback(response.data);
      })
      .catch((err) => {
        message.error("Could not fetch the data in the server!");
        console.log(err);
      });
  };

  const getDocumentDataNext = async (callback, token, count, start, data) => {
    await axios
      .get(
        `/api/organization/get-all-organizations?q=${data.trim()}&result=${count}&start=${start}`,
        token
      )
      .then((res) => {
        return callback(res.data);
      });
  };
  console.log(isLoading, hasMore);

  const getAllCampaign = async (callback, token, data) => {
    await axios
      .get(
        `/api/campaign/search?q=${data.trim()}&result=${count}&start=${0}`,
        token
      )
      .then((response) => {
        callback(response.data);
      })
      .catch((err) => {
        message.error("Could not fetch the data in the server!");
        console.log(err);
      });
  };
  const getDocumentDataNextCampaign = async (
    callback,
    token,
    count,
    start,
    data
  ) => {
    await axios
      .get(
        `/api/campaign/search?q=${data.trim()}&result=${count}&start=${start}`,
        token
      )
      .then((res) => {
        return callback(res.data);
      });
  };
  useEffect(() => {
    setLandingLoadingCampaign(true);
    setLandingLoading(true);
    setIsLoadingCampaign(true);
    setIsLoading(true);
    Promise.all([
      getAllOrganizations(handleGetAll, generateToken()[1], searchItem),
      getAllCampaign(handleGetAllCampaign, generateToken()[1], searchItem),
    ]);
  }, []);
  console.log(campaignList);
  return (
    <>
      <Row justify="center">
        <Col xs={24} sm={24} md={15} lg={15}>
          <Card loading={landingLoading} title={"Pages"}>
            {barangayList.map((item, i) => {
              return (
                <div key={i}>
                  <Divider
                    className="divider-margin"
                    style={{ margin: "0px !important" }}
                  />
                  <Col sm={24} md={24}>
                    <SearchAvatar
                      id={item?.organization_id}
                      profile={item?.profile?.fileUrl}
                      name={item?.organization_name}
                      address={item?.address}
                    />
                  </Col>
                </div>
              );
            })}
            {isLoading && (
              <>
                <Col sm={24} md={24}>
                  <Card>
                    <Skeleton loading={isLoading} avatar active></Skeleton>
                  </Card>
                </Col>
                <Col sm={24} md={24}>
                  <Card>
                    <Skeleton loading={isLoading} avatar active></Skeleton>
                  </Card>
                </Col>
                <Col sm={24} md={24}>
                  <Card>
                    <Skeleton loading={isLoading} avatar active></Skeleton>
                  </Card>
                </Col>
              </>
            )}
            <Col justify="center" className="text-center" sm={24} md={24}>
              {!isLoading && hasMore && (
                <Button
                  onClick={() => {
                    setIsLoading(true);
                    setStart(count + start);
                    getDocumentDataNext(
                      handleNextGetAll,
                      generateToken()[1],
                      count,
                      start,
                      searchItem
                    );
                  }}
                >
                  Load More
                </Button>
              )}
            </Col>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={15} lg={15}>
          <Card loading={landingLoadingCampaign} title={"Events"}>
            {campaignList.map((item, i) => {
              return (
                <div key={i}>
                  <Divider
                    className="divider-margin"
                    style={{ margin: "0px !important" }}
                  />
                  {console.log(item)}
                  <Col sm={24} md={24}>
                    <SearchCampaign
                      startDate={
                        new Date(moment(item?.starting_date).format("LL"))
                      }
                      profile={
                        item && item.images && item.images[0]
                          ? item.images[0].data
                          : undefined
                      }
                      title={item?.title}
                      address={item?.organization?.address}
                      name={item?.organization?.organization_name}
                      id={item?.organization?._id}
                      campaign_id={item?.campaign_id}
                    />
                  </Col>
                </div>
              );
            })}
            {isLoadingCampaign && (
              <>
                <Col sm={24} md={24}>
                  <Card>
                    <Skeleton loading={isLoading} avatar active></Skeleton>
                  </Card>
                </Col>
                <Col sm={24} md={24}>
                  <Card>
                    <Skeleton loading={isLoading} avatar active></Skeleton>
                  </Card>
                </Col>
                <Col sm={24} md={24}>
                  <Card>
                    <Skeleton loading={isLoading} avatar active></Skeleton>
                  </Card>
                </Col>
              </>
            )}
            <Col justify="center" className="text-center" sm={24} md={24}>
              {!isLoadingCampaign && hasMoreCampaign && (
                <Button
                  onClick={() => {
                    setIsLoadingCampaign(true);
                    setStartCampaign(countCampaign + startCampaign);
                    getDocumentDataNextCampaign(
                      handleNextGetAllCampaign,
                      generateToken()[1],
                      countCampaign,
                      startCampaign,
                      searchItem
                    );
                  }}
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

export default Organizations;
