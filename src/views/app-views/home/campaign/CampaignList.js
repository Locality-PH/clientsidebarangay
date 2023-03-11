import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Input,
  Button,
  Tag,
  message,
  Avatar,
  Row,
  Col,
  Skeleton,
  Divider,
} from "antd";
import Flex from "components/shared-components/Flex";
import AvatarStatus from "components/shared-components/AvatarStatus";
import utils from "utils";
import { COLORS } from "constants/ChartConstant";
import { Link, useHistory} from "react-router-dom";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { useAuth } from "contexts/AuthContext";

const CampaignList = () => {
  const { currentOrganization, generateToken } = useAuth();
  const history = useHistory();

  const [barangayList, setBarangayList] = useState([]);
  const [listLimit, setListLimit] = useState(5);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllOrganizations();
  }, []);

  const getAllOrganizations = async () => {
    await axios
      .get("/api/campaign/getAll", generateToken()[1])
      .then((response) => {
        setBarangayList(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        message.error("Could not fetch the data in the server!");
        console.log(err);
      });
  };

  return (
    <>
      {!isLoading ? (
        <Row className="borderless" justify="center">
          <Col sm={24} md={15}>
            <Card>
              {barangayList.map(
                (result, i) =>
                  i < listLimit && (
                    <div
                      key={i}
                      className={`d-flex align-items-center justify-content-between mb-4`}
                    >
                      <div className="avatar-status d-flex align-items-center">
                        {result && result.images && result.images[0] != null ? (
                          <Avatar
                            className="mb-2 mr-1 rounded custom-hover-pointer"
                            icon={<UserOutlined />}
                            size={55}
                            src={result.images[0].data}
                            onClick={() => history.push(`/home/posts/${result.organization}/${result.campaign_id}/single/data`)}
                          />
                        ) : (
                          <Avatar
                            className="font-size-sm custom-hover-pointer"
                            style={{
                              backgroundColor: result.publisher.profileLogo,
                            }}
                            onClick={() => history.push(`/home/posts/${result.organization}/${result.campaign_id}/single/data`)}
                          >
                            {utils.getNameInitial(result.title)}
                          </Avatar>
                        )}

                        <div className="ml-2">
                          <div>
                            <div className="avatar-status-name">
                              <h4
                                className="custom-text-hover-pointer"
                                onClick={() => history.push(`/home/posts/${result.organization}/${result.campaign_id}/single/data`)}
                              >
                                {result.title}
                              </h4>
                            </div>
                          </div>
                          <div className="text-muted avatar-status-subtitle">
                            <h5
                              className="custom-text-hover-pointer"
                              onClick={() => history.push(`/home/posts/${result.organization}/${result.campaign_id}/single/data`)}
                            >
                              {result.participantCounter} Participants
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Link
                          to={`/home/posts/${result.organization}/${result.campaign_id}/single/data`}
                        >
                          <Button type="primary" shape="round">
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )
              )}

              <Button
                style={{ width: "100%", height: "3rem" }}
                shape="round"
                type="primary"
                onClick={() => setListLimit(listLimit + 5)}
                hidden={barangayList.length <= listLimit ? true : false}
              >
                Load more
              </Button>
            </Card>
          </Col>
        </Row>
      ) : (
        <Card>
          <Skeleton loading={isLoading} avatar active></Skeleton>
          <Skeleton loading={isLoading} avatar active></Skeleton>
          <Skeleton loading={isLoading} avatar active></Skeleton>
        </Card>
      )}
    </>
  );
};

export default CampaignList;
