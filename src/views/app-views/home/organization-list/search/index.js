import React, { useState, useEffect } from "react";
import { Card, Table, Input, Button, Tag, message, Avatar } from 'antd';
import Flex from 'components/shared-components/Flex'
import AvatarStatus from 'components/shared-components/AvatarStatus';
import { BarangayData } from "../../DefaultDashboardData";
import utils from 'utils'
import { Link } from "react-router-dom";
import {
    SearchOutlined
} from '@ant-design/icons';
import axios from "axios";
import { useAuth } from "contexts/AuthContext";

const Organizations = () => {
    const { currentOrganization, generateToken } = useAuth();

    const [barangayList, setBarangayList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAllOrganizations();
    }, []);

    const getAllOrganizations = async () => {
        await axios
            .get("/api/organization/get-all-organizations", generateToken()[1])
            .then((response) => {
                setBarangayList(response.data);
                console.log(response.data)
                setIsLoading(false);

            })
            .catch((err) => {
                message.error("Could not fetch the data in the server!");
                console.log(err);
            });
    };

    const tableColumns = [
        {
            title: 'Organization',
            dataIndex: 'name',
            render: (_, record) => (
                <div className="d-flex align-items-center">
                    <Avatar
                        size={30}
                        className="font-size-sm"
                        style={{ backgroundColor: "black" }}
                    >
                        {utils.getNameInitial(record.organization_name)}
                    </Avatar>
                    <span className="ml-2">{record.organization_name}</span>
                </div>
            ),
            sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
        },
        {
            title: 'Address',
            dataIndex: 'address',
            render: (_, record) => (
                <span className="font-weight-semibold">{record.address}</span>
            )
        },
        {
            title: 'Email',
            dataIndex: 'email',
            render: (_, record) => (
                <Tag color="green">{record.email}</Tag>
            )
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_, record) => (
                <Button type="primary" shape="round"><Link to={`/home/group/${record.organization_id}`}>View</Link></Button>
            )
        }

    ]

    const onBarangaySearch = (e) => {
        // const value = e.currentTarget.value;
        // const searchArray = e.currentTarget.value ? barangayList : BarangayData;
        // const data = utils.wildCardSearch(searchArray, value);
        // setBarangayList(data);
    };

    return (
        <>
            <Card title="Organizations">
                <Flex
                    alignItems="center"
                    className=""
                    justifyContent="between"
                    mobileFlex={false}
                >
                    <Flex className="mb-1" mobileFlex={false}>
                        <div className="mb-3 mr-md-3">
                            <Input
                                placeholder="Search"
                                prefix={<SearchOutlined />}
                                onChange={(e) => onBarangaySearch(e)}
                            />
                        </div>
                    </Flex>
                </Flex>
                <Table
                    pagination={true}
                    columns={tableColumns}
                    dataSource={barangayList}
                    rowKey='organization_id'
                />
            </Card>
        </>
    )
}

export default Organizations
