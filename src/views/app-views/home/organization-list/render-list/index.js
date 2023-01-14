import React from "react";
import PropTypes from "prop-types";
import utils from "utils";
import { Avatar, Button } from "antd";
import { Link } from "react-router-dom";

const renderAvatar = (props) => {
  return (
    <Avatar {...props} className={`ant-avatar-${props.type}`}>
      {props.text}
    </Avatar>
  );
};

export const RenderList = (props) => {
  const {
    name,
    suffix,
    subTitle,
    id,
    type,
    src,
    icon,
    size,
    shape,
    gap,
    text,
  } = props;
  return (
    <>
      <div className="avatar-status d-flex align-items-center">
        {/*renderAvatar({ icon, src, type, size, shape, gap, text })*/}
        <Avatar
          className="font-size-sm"
          style={{ backgroundColor: "black" }}
        >
          {utils.getNameInitial(name)}
        </Avatar>
        <div className="ml-2">
          <div>
            <div className="avatar-status-name h4">{name}</div>
            <span>{suffix}</span>
          </div>
          <div className="text-muted avatar-status-subtitle h5">{subTitle}</div>
        </div>
      </div>
      <div>
        <Link to={`/home/organization/${id}`}>
          <Button type="primary" shape="round">
            View
          </Button>
        </Link>
      </div>
    </>
  );
};

RenderList.propTypes = {
  name: PropTypes.string,
  src: PropTypes.string,
  type: PropTypes.string,
  onNameClick: PropTypes.func,
};

export default RenderList;
