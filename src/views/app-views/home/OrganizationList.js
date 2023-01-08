import React, { useState, useEffect } from "react";
import { Card, message } from "antd";
import GroupLink from "components/shared-components/GroupLink";
import { BarangayData } from "./DefaultDashboardData";
import {withRouter, Link} from 'react-router-dom';
import axios from "axios";
import { useAuth } from "contexts/AuthContext";

const OrganizationList = () => {
    const { currentOrganization, generateToken } = useAuth();

    const [organizationList, setOrganizationList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        getAllOrganizations();
    }, []);

    const getAllOrganizations = async () => {
        await axios
            .get("/api/organization/get-all-organizations", generateToken()[1])
            .then((response) => {
                setOrganizationList(response.data);
                console.log(response.data)
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
                console.log(response.data)
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
                title="List of Barangay"
				style={{ height: "33.3rem", overflow: "auto" }}
                loading={isLoading}
                extra={<Link to="feeds/organizations" style={{fontSize: "1rem"}}>More</Link>}
            >
                <div className="mt-3">
                    {organizationList.map((result, i) => (
                        <div
                            key={i}
                            className={`d-flex align-items-center justify-content-between mb-4`}
                        >
                            <GroupLink
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
