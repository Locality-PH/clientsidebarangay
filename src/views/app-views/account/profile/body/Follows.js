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
  Divider
} from "antd";
import Flex from "components/shared-components/Flex";
import AvatarStatus from "components/shared-components/AvatarStatus";
import utils from "utils";
import { COLORS } from "constants/ChartConstant";
import { useHistory } from "react-router-dom";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { useAuth } from "contexts/AuthContext";

const Follows = () => {
  const { currentUser, currentOrganization, generateToken } = useAuth();
  const history = useHistory()

  const [barangayList, setBarangayList] = useState([]);
  const [listLimit, setListLimit] = useState(5);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserFollowing();
  }, []);

  const getUserFollowing = async () => {
    await axios
      .get("/api/organization/get-user-following/" + currentUser.uid, generateToken()[1])
      .then((response) => {
        setBarangayList(response.data.follows);
        setIsLoading(false);
      })
      .catch((err) => {
        message.error("Could not fetch the data in the server!");
        console.log(err);
      });
  };

  const unFollow = (organizationId) => {
    message.loading("unfollowing...", 0)
    axios
      .post("/api/organization/unfollow", {
        organization_id: organizationId,
        uuid: currentUser.uid
      }, generateToken()[1])
      .then((response) => {
        message.destroy();
        if (response.data == "Success") {
          getUserFollowing()

        } else {
          message.error("The action can't be completed, please try again.");
        }
      })
      .catch((error) => {
        message.error("The action can't be completed, please try again.");
      });

  }



  return (
    <Row justify="center" className="w-100">
      <Col xs={24} lg={18}>
        {
          isLoading && (
            <Card >
              <Skeleton loading={isLoading} avatar active></Skeleton>
              <Skeleton loading={isLoading} avatar active></Skeleton>
              <Skeleton loading={isLoading} avatar active></Skeleton>
            </Card>
          )
        }

        {(!isLoading && barangayList.length != 0) && (
          <Card>
            {barangayList.map((result, i) => i < listLimit && (
              <div key={i}>
                <div

                  className={`d-flex align-items-center justify-content-between`}
                >
                  <div className="avatar-status d-flex align-items-center">
                    {
                      result.profile != null
                        ?
                        <Avatar
                          className="font-size-sm custom-hover-pointer"
                          icon={<UserOutlined />}
                          src={result.profile.fileUrl}
                          onClick={() => history.push(`/home/organization/${result._id}`)}
                        >
                          {utils.getNameInitial(result.organization_name)}
                        </Avatar>
                        :
                        <Avatar
                          className="font-size-sm custom-hover-pointer"
                          style={{ backgroundColor: result.profile_color }}
                          onClick={() => history.push(`/home/organization/${result._id}`)}
                        >
                          {utils.getNameInitial(result.organization_name)}
                        </Avatar>
                    }

                    <div className="ml-2">
                      <div>
                        <div className="avatar-status-name">
                          <h4
                            className="custom-text-hover-pointer"
                            onClick={() => history.push(`/home/organization/${result._id}`)}
                          >
                            {result.organization_name}
                          </h4>
                        </div>
                        <span></span>
                      </div>
                      <div className="text-muted avatar-status-subtitle h5">
                        {result.address}
                      </div>
                    </div>
                  </div>
                  <div>

                    <Button type="primary" shape="round" onClick={() => unFollow(result._id)}>
                      Unfollow
                    </Button>


                  </div>
                </div>
                <Divider />
              </div>
            ))}

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
        )}

        {(!isLoading && barangayList.length <= 0) && (
          <h2>No Following</h2>
        )}
      </Col>
    </Row>
  );
};

export default Follows;
