import React, { useState } from "react";
import { Row, Col, Tooltip, Tag, Progress, Avatar, Menu, Card } from "antd";
import { CampaignListData } from "../BarangayData";
import {
  ClockCircleOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import utils from "utils";
import { COLORS } from "constants/ChartConstant";
import Flex from "components/shared-components/Flex";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import { Link } from "react-router-dom";

const ItemAction = ({ id, removeId, barangayUrl }) => (
  <EllipsisDropdown
    menu={
      <Menu>
        <Menu.Item key="0">
          <Link to={`${barangayUrl}/campaign/${id}`}>
            <EyeOutlined />
            <span className="ml-2">View</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="1">
          <Link to={`${barangayUrl}/campaign/edit/${id}`}>
            <EditOutlined />
            <span className="ml-2">Edit</span>
          </Link>
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item key="2" onClick={() => removeId(id)}>
          <DeleteOutlined />
          <span className="ml-2">Delete</span>
        </Menu.Item>
      </Menu>
    }
  />
);

const ItemHeader = ({ name, type }) => (
  <div>
    <h4 className="mb-0">{name}</h4>
    <span className="text-muted">{type} - Pending</span>
  </div>
);

const ItemInfo = ({ statusColor, dayAgo }) => (
  <Flex alignItems="center">
    <div className="mr-3">
      <span className="text-muted">Created</span>
    </div>

    <div>
      <Tag
        className={statusColor === "none" ? "bg-gray-lightest" : ""}
        color={statusColor !== "none" ? statusColor : ""}
      >
        <ClockCircleOutlined />
        <span className="ml-2 font-weight-semibold">{dayAgo} days ago</span>
      </Tag>
    </div>
  </Flex>
);

const ItemProgress = ({ progression }) => (
  <Progress
    percent={progression}
    strokeColor={getProgressStatusColor(progression)}
    size="small"
  />
);

const ItemMember = ({ member }) => (
  <>
    {member.map((result, i) =>
      i <= 2 ? (
        <Tooltip title={result.name} key={`avatar-${i}`}>
          <Avatar
            size="small"
            className={`ml-1 cursor-pointer ant-avatar-${result.avatarColor}`}
            src={result.img}
          >
            {result.img ? (
              ""
            ) : (
              <span className="font-weight-semibold font-size-sm">
                {utils.getNameInitial(result.name)}
              </span>
            )}
          </Avatar>
        </Tooltip>
      ) : null
    )}
    {member.length > 3 ? (
      <Tooltip title={`${member.length - 3} More`}>
        <Avatar
          size={25}
          className="ml-1 bg-white border cursor-pointer font-size-sm"
        >
          <span className="text-gray-light font-weight-semibold">
            +{member.length - 3}
          </span>
        </Avatar>
      </Tooltip>
    ) : null}
  </>
);

const Item = ({ data, removeId, barangayUrl }) => (
  <Card>
    <Flex alignItems="center" justifyContent="between">
      <ItemHeader name={data.name} type={data.type} />
      <ItemAction id={data.id} removeId={removeId} barangayUrl={barangayUrl} />
    </Flex>
    <div className="mt-2">
      <ItemInfo statusColor={data.statusColor} dayAgo={data.dayAgo} />
    </div>
    <div className="mt-3">
      <ItemProgress progression={data.progression} />
    </div>
    <div className="mt-2">
      <ItemMember member={data.member} />
    </div>
  </Card>
);

const getProgressStatusColor = (progress) => {
  if (progress >= 80) {
    return COLORS[1];
  }
  if (progress < 60 && progress > 30) {
    return COLORS[3];
  }
  if (progress < 30) {
    return COLORS[2];
  }
  return COLORS[0];
};

const CampaignRequested = ({ barangayUrl }) => {
  const [list, setList] = useState(CampaignListData);

  const deleteItem = (id) => {
    const data = list.filter((result) => result.id !== id);
    setList(data);
  };

  return (
    <>
      <Row gutter={16}>
        {list.map((result) => (
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12} key={result.id}>
            <Item
              data={result}
              removeId={(id) => deleteItem(id)}
              barangayUrl={barangayUrl}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default CampaignRequested;
