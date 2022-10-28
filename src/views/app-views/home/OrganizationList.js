import React, { useState, useEffect } from "react";
import { Card, message } from "antd";
import GroupLink from "components/shared-components/GroupLink";
import { BarangayData } from "./DefaultDashboardData";
import axios from "axios";
import { useAuth } from "contexts/AuthContext";

const OrganizationList = () => {
    const { currentOrganization, generateToken } = useAuth();

    const [organizationList, setOrganizationList] = useState(BarangayData);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        getAllOrganizations();
    }, []);

    const getAllOrganizations = async () => {
        await axios
            .get("/api/organization/get-latest-organizations", generateToken()[1])
            .then((response) => {
                setOrganizationList(response.data);
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
                loading={isLoading}
                extra={
                    <a href="#" style={{ fontSize: "1rem" }}>
                        More
                    </a>
                }
            >
                <div className="mt-3">
                    {organizationList.map((result, i) => (
                        <div
                            key={i}
                            className={`d-flex align-items-center justify-content-between mb-4`}
                        >
                            <GroupLink
                                key={i}
                                id={i}
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
