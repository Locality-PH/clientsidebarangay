import React, { useState } from "react";
import { Row, Col, Button, Card, Avatar, Dropdown, Table, Menu, Tag } from 'antd';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import { 
  BarangayData
} from './DefaultDashboardData';
import { 
  UserAddOutlined, 
  FileExcelOutlined, 
  PrinterOutlined, 
  PlusOutlined, 
  EllipsisOutlined, 
  StopOutlined, 
  ReloadOutlined 
} from '@ant-design/icons';
import {withRouter} from 'react-router-dom';

const latestTransactionOption = (
  <Menu>
    <Menu.Item key="0">
      <span>
        <div className="d-flex align-items-center">
          <ReloadOutlined />
          <span className="ml-2">Not interested in this</span>
        </div>
      </span>
    </Menu.Item>
    <Menu.Item key="1">
      <span>
        <div className="d-flex align-items-center">
          <PrinterOutlined />
          <span className="ml-2">This trend is harmful or spammy</span>
        </div>
      </span>
    </Menu.Item>
    {/* <Menu.Item key="12">
      <span>
        <div className="d-flex align-items-center">
          <FileExcelOutlined />
          <span className="ml-2">Export</span>
        </div>
      </span>
    </Menu.Item> */}
  </Menu>
);

const cardDropdown = (menu) => (
  <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
    <a href="/#" className="text-gray font-size-lg" onClick={e => e.preventDefault()}>
      <EllipsisOutlined />
    </a>
  </Dropdown>
)

export const DefaultDashboard = () => {
  const [barangayData] = useState(BarangayData)

  return (
    <>
    <Row>
      <Col xs={24} sm={24} md={24} xl={4}> </Col>
      <Col xs={24} sm={24} md={24} xl={16}>

      <Row gutter={8} >
        <Col xs={24} sm={24} md={24} xl={9}>
            <Card title="List of Barangay">
                    <div className="mt-3">
                      {
                        barangayData.map((elm, i) => (
                          <div key={i} className={`d-flex align-items-center justify-content-between mb-4`}>
                            <AvatarStatus id={i} src={elm.img} name={elm.name} subTitle={elm.title} />
                            {/* <div>
                              <Button icon={<UserAddOutlined />} type="default" size="small">Visit</Button>
                            </div> */}
                          </div>
                        ))
                      }
                    </div>
                  </Card>
        </Col>

        <Col xs={24} sm={24} md={24} xl={15}>

          <Card title="Trending News">
            <div>
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="avatar-status d-flex align-items-center">
                  <div className="ml-2">
                  <div className="text-muted avatar-status-subtitle">Global Nation</div>
                    <div>
                        <div className="avatar-status-name">Modified Enhanced Community Quaratine</div>
                    </div>
                    <div className="text-muted avatar-status-subtitle">109.9k Tweets</div>
                  </div>
                </div>
                <div>
                <Dropdown overlay={latestTransactionOption} trigger={['click']} placement="bottomRight">
                  <a href="/#" className="text-gray font-size-lg" onClick={e => e.preventDefault()}>
                    <EllipsisOutlined />
                  </a>
                </Dropdown>
                </div>
              </div>
            </div>

            <div>
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="avatar-status d-flex align-items-center">
                  <div className="ml-2">
                  <div className="text-muted avatar-status-subtitle">Sports</div>
                    <div>
                        <div className="avatar-status-name">LOL World Championship</div>
                    </div>
                    <div className="text-muted avatar-status-subtitle">92.7k Tweets</div>
                  </div>
                </div>
                <div>
                <Dropdown overlay={latestTransactionOption} trigger={['click']} placement="bottomRight">
                  <a href="/#" className="text-gray font-size-lg" onClick={e => e.preventDefault()}>
                    <EllipsisOutlined />
                  </a>
                </Dropdown>
                </div>
              </div>
            </div>

            <div>
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="avatar-status d-flex align-items-center">
                  <div className="ml-2">
                  <div className="text-muted avatar-status-subtitle">Entertainment</div>
                    <div>
                        <div className="avatar-status-name">Adele's new Album out Nov. 19</div>
                    </div>
                    <div className="text-muted avatar-status-subtitle">75.1k Tweets</div>
                  </div>
                </div>
                <div>
                <Dropdown overlay={latestTransactionOption} trigger={['click']} placement="bottomRight">
                  <a href="/#" className="text-gray font-size-lg" onClick={e => e.preventDefault()}>
                    <EllipsisOutlined />
                  </a>
                </Dropdown>
                </div>
              </div>
            </div>

            <div>
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="avatar-status d-flex align-items-center">
                  <div className="ml-2">
                  <div className="text-muted avatar-status-subtitle">Technology</div>
                    <div>
                        <div className="avatar-status-name">First Youtube Video</div>
                    </div>
                    <div className="text-muted avatar-status-subtitle">56.4k Tweets</div>
                  </div>
                </div>
                <div>
                <Dropdown overlay={latestTransactionOption} trigger={['click']} placement="bottomRight">
                  <a href="/#" className="text-gray font-size-lg" onClick={e => e.preventDefault()}>
                    <EllipsisOutlined />
                  </a>
                </Dropdown>
                </div>
              </div>
            </div>

          </Card>
            
        </Col>

      </Row>

      <Row gutter={8} >
        <Col xs={24} sm={24} md={24} xl={12}>
            <Card title="News Today">
                    <div className="mt-3">
                      {
                        barangayData.map((elm, i) => (
                          <div key={i} className={`d-flex align-items-center justify-content-between mb-4`}>
                            <AvatarStatus id={i} src={elm.img} name={elm.name} subTitle={elm.title} />
                            <div>
                              <Button icon={<UserAddOutlined />} type="default" size="small">Visit</Button>
                            </div>
                          </div>
                        ))
                      }
                    </div>
              </Card>
        </Col>

        <Col xs={24} sm={24} md={24} xl={12}>

          <Card title="News Today">
            <div className="mt-3">
              {
                barangayData.map((elm, i) => (
                  <div key={i} className={`d-flex align-items-center justify-content-between mb-4`}>
                    <AvatarStatus id={i} src={elm.img} name={elm.name} subTitle={elm.title} />
                    {/* <div>
                      <Button icon={<UserAddOutlined />} type="default" size="small">Visit</Button>
                    </div> */}
                  </div>
                ))
              }
            </div>
          </Card>
            
        </Col>

      </Row>
      </Col>
      <Col xs={24} sm={24} md={24} xl={4}></Col>

    </Row>  
      {/* <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={18}>
          <Row gutter={16}>
            {
              annualStatisticData.map((elm, i) => (
                <Col xs={24} sm={24} md={24} lg={24} xl={8} key={i}>
                  <StatisticWidget 
                    title={elm.title} 
                    value={elm.value}
                    status={elm.status}
                    subtitle={elm.subtitle}
                  />
                </Col>
              ))
            }
          </Row>
          <Row gutter={16}>
            <Col span={24}>
                <ChartWidget 
                  title="Unique Visitors" 
                  series={visitorChartData.series} 
                  xAxis={visitorChartData.categories} 
                  height={'400px'}
                  direction={direction}
                />
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={24} lg={6}>
          <GoalWidget 
            title="Monthly Target" 
            value={87}
            subtitle="You need abit more effort to hit monthly target"
            extra={<Button type="primary">Learn More</Button>}
          />
          <StatisticWidget 
            title={
              <MembersChart 
                options={memberChartOption}
                series={activeMembersData}
                height={145}
              />
            }
            value='17,329'
            status={3.7}
            subtitle="Active members"
          />
        </Col>
      </Row> */}
      {/* <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={7}>
          <Card title="News of Barangay">
            <div className="mt-3">
              {
                newMembersData.map((elm, i) => (
                  <div key={i} className={`d-flex align-items-center justify-content-between mb-4`}>
                    <AvatarStatus id={i} src={elm.img} name={elm.name} subTitle={elm.title} />
                    <div>
                      <Button icon={<UserAddOutlined />} type="default" size="small">Visit</Button>
                    </div>
                  </div>
                ))
              }
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={17}>
          <Card title="Latest Transactions" extra={cardDropdown(latestTransactionOption)}>
            <Table 
              className="no-border-last" 
              columns={tableColumns} 
              dataSource={recentTransactionData} 
              rowKey='id' 
              pagination={false}
            />
          </Card>
        </Col>
      </Row> */}
    </>
  )
}


export default withRouter(DefaultDashboard);
