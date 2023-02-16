import React, { useState, useEffect } from "react";
import { Card, Button, Tag, Avatar } from "antd";
import utils from "utils";
import { COLORS } from "constants/ChartConstant";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { UserOutlined } from "@ant-design/icons";

const SearchAvatar = (props) => {
  const { id, profile, name, address } = props;
  return (
    <>
      <Card className="no-border">
        <div className={`d-flex align-items-center justify-content-between`}>
          <div className="avatar-status d-flex align-items-center">
            {profile != null ? (
              <Avatar
                className="font-size-sm"
                icon={<UserOutlined />}
                src={profile}
              >
                {utils.getNameInitial(name)}
              </Avatar>
            ) : (
              <Avatar
                className="font-size-sm"
                style={{
                  backgroundColor:
                    COLORS[Math.floor(Math.random() * COLORS.length)],
                }}
              >
                {utils.getNameInitial(name)}
              </Avatar>
            )}

            <div className="ml-2">
              <div>
                <div className="avatar-status-name ">{name}</div>
                <span></span>
              </div>
              <div className="text-muted avatar-status-subtitle h5">
                {address}
              </div>
            </div>
          </div>
          <div>
            <Link to={`/home/organization/${id}`}>
              <Button type="primary" shape="round">
                View
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </>
  );
};
SearchAvatar.propTypes = {
  id: PropTypes.string,
  profile: PropTypes.string,
  name: PropTypes.string,
  address: PropTypes.string,
};

SearchAvatar.defaultProps = {
  id: "",
  profile: null,
  name: "",
  address: "",
};
export default SearchAvatar;
