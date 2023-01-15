import React, { useState, useEffect } from "react";
import { Card, message } from "antd";
import { RenderList } from "views/app-views/home/organization-list/render-list";
import { BarangayData } from "../DefaultDashboardData";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "contexts/AuthContext";

const OrganizationList = () => {
  const { currentOrganization, generateToken } = useAuth();

  const [organizationList, setOrganizationList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getLatestOrganizations();
  }, []);

  const getAllOrganizations = async () => {
    await axios
      .get("/api/organization/get-all-organizations", generateToken()[1])
      .then((response) => {
        setOrganizationList(response.data);
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        message.error("Could not fetch the data in the server!");
        console.log(err);
      });
  };

  const getLatestOrganizations = async () => {
    await axios
      .get("/api/organization/get-latest-organizations", generateToken()[1])
      .then((response) => {
        setOrganizationList(response.data);
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        message.error("Could not fetch the data in the server!");
        console.log(err);
      });
  };

  return (
    <>
      <Card
        title="List of Organization"
        style={{ height: "33.3rem", overflow: "auto" }}
        loading={isLoading}
        extra={
          <Link to="feeds/list/organizations" style={{ fontSize: "1rem" }}>
            More
          </Link>
        }
      >
        <div className="mt-3">
          {organizationList.map((result, i) => (
            <div
              key={i}
              className={`d-flex align-items-center justify-content-between mb-4`}
            >
              <RenderList
                key={i}
                id={result.organization_id}
                // src={result.img}
                name={result.organization_name}
                subTitle={result.address}
              />
            </div>
          ))}
        </div>
      </Card>
    </>
  );
};

export default OrganizationList;
