import React, { useState } from "react";
import { PrinterOutlined } from "@ant-design/icons";
import { Card, Table, Button } from "antd";
import { invoiceData } from "./invoiceData";
import NumberFormat from "react-number-format";
import { useHistory } from "react-router-dom";

const { Column } = Table;

const Invoice = (props) => {
  let history = useHistory();
  const redirectHandle = (data) => {
    history.push(`invoice/${data}`);
  };
  return (
    <div className="container">
      <Card title="Invoice">
        <div className="">
          <i style={{ color: "red" }}>
            This thing is still testing since billing is not fully functional
          </i>
          <Table dataSource={invoiceData} pagination={false} className="mb-5">
            <Column title="Date" dataIndex="date" key="date" />
            <Column
              title="Charge"
              render={(text) => (
                <NumberFormat
                  displayType={"text"}
                  value={(Math.round(text.price * 100) / 100).toFixed(2)}
                  prefix={"$"}
                  thousandSeparator={true}
                />
              )}
              key="price"
            />{" "}
            <Column
              title=""
              render={(test, record) => (
                <div className="text-right">
                  <Button
                    type="text"
                    shape="circle"
                    icon={<PrinterOutlined />}
                    onClick={() => {
                      redirectHandle(record.key);
                    }}
                  />{" "}
                </div>
              )}
              key="price"
            />
          </Table>{" "}
        </div>
      </Card>
    </div>
  );
};

export default Invoice;
