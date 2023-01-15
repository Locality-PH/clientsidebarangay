import React, { useState, useEffect, useMemo } from "react";
import { Table, Button, Tooltip, Row, Col, Card, Popconfirm } from "antd";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import BillingDrawer from "components/shared-components/DrawerBilling";
import { AUTH_TOKEN } from "redux/constants/Auth";
import { ccFormat } from "helper/Formula";
import { useAuth } from "contexts/AuthContext";
import notification from "components/shared-components/Notification";
import {
  getPaymethod,
  createPaymethod,
  deletePaymethod,
} from "api/AppController/AccountsController/BillingDetailsController";
const BillingTable = () => {
  const { generateToken } = useAuth();
  const tmp = [
    {
      card_holder: "12321",
      card_number: "1232132113112323",
      _id: 1,
      cvc: "N/A",
      issuer: "visa",
      user_id: "kwWXpExbfoTAVnQZQVeVqMzCRFP2",
      valid_thru: "N/A",
    },
  ];

  // Credit Card State
  const [creditCards, setCreditCards] = useState(tmp);
  const [paymentMethod, setPaymentMethod] = useState({});
  const [paymentMethodType, setPaymentMethodType] = useState("");
  const [drawer, setDrawer] = useState(false);

  // Table State Select
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // Table Empty Dataset

  const locale = {
    emptyText: (
      <div className="my-4 text-center">
        <img
          src="/img/others/img-7.png"
          alt="Add credit card"
          style={{ maxWidth: "90px" }}
        />
        <h3 className="mt-3 font-weight-light">Please add a payment method!</h3>
      </div>
    ),
  };

  const tableColumnsBilling = [
    {
      title: "Card type",
      dataIndex: "issuer",
      key: "issuer",
      render: (_, record) => {
        let image = "";
        if (record.issuer == "mastercard") image = "/img/others/img-9.png";

        if (record.issuer == "visa") image = "/img/others/img-8.png";

        if (record.issuer == "GCash")
          image = "/img/others/cards/GCash-Logo.png";
        return (
          <>
            {record.issuer == "GCash" ? (
              <img
                style={{ height: "13%" }}
                src={image}
                alt={record.cardType}
              />
            ) : (
              <img
                style={{ height: "auto" }}
                src={image}
                alt={record.cardType}
              />
            )}

            <span className="ml-2">{record.issuer}</span>
          </>
        );
      },
    },

    {
      title: "Card Number",
      dataIndex: "card_number",
      key: "card_number",
      render: (_, record) => {
        let creditFormat;
        if (record.card_number) creditFormat = ccFormat(record.card_number);
        return (
          <>
            <span className="ml-2">
              {ccFormat(
                record.card_number.replace(
                  record.card_number.substr(0, record.card_number.length - 4),
                  record.card_number
                    .substr(1, record.card_number.length - 3)
                    .replace(/./g, "•")
                )
              )}
            </span>
          </>
        );
      },
    },

    {
      title: "Expiry",
      dataIndex: "valid_thru",
      key: "valid_thru",
    },
    {
      title: () => <div className="text-right"></div>,
      key: "actions",
      render: (_, record) => (
        <Tooltip title="Remove card">
          <Popconfirm
            placement="top"
            title="Are you sure to delete this payment method"
            onConfirm={() => {
              onDeleteBilling(record);
            }}
            okText="Yes"
            cancelText="No"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <Button type="text" shape="circle" icon={<DeleteOutlined />} />{" "}
          </Popconfirm>
        </Tooltip>
      ),
    },
  ];
  // Delete Payment Method
  const onDeleteBilling = async (record) => {
    let data = creditCards;
    setCreditCards(data.filter((credit) => credit._id !== record._id));
    let secondData = data.filter((credit) => credit._id !== record._id);
    console.log(secondData[0]._id);
    setSelectedRowKeys([secondData[0]._id]);
    await Promise.all([
      deletePaymethod(record._id, [secondData[0]._id], generateToken),
    ]);

    // return notification({
    //   type: "success",
    //   title: "Delete",
    //   description: "hi",
    // });
  };

  const getBilling = async () => {
    // const billingData = await axios.get(
    //   "/api/app/user/billing/data",

    //   generateToken()[1]
    // );
    //(async () => {
    try {
      const billingData = await getPaymethod(generateToken);
      const i = [].concat.apply([], billingData[0].billing_method);
      setSelectedRowKeys([i[3]._id]);
      return setCreditCards(i);
    } catch (e) {
      // Handle fetch error
    }
    //    })();
  };

  const showDrawer = (type) => {
    if (creditCards.length <= 3)
      return notification({
        type: "warning",
        title: "Maximum Limit",
        description:
          "You have reached the maximum limit of your payment method please remove one to add a new payment record",
      });

    setPaymentMethodType(type);
    setDrawer(true);
  };

  const closeDrawer = () => {
    setDrawer(false);
  };

  const rowSelectionCredit = {
    onChange: (key, rows) => {
      setSelectedRowKeys(key);
    },
  };

  useEffect(() => {
    getBilling();
  }, []);
  useEffect(() => {
    if (!(JSON.stringify(paymentMethod) === "{}")) {
      // let credit = creditCards;
      let payment = paymentMethod;
      // payment.user_id = localStorage.getItem(AUTH_TOKEN);
      // payment._id = credit.length + 1;
      setCreditCards((oldArray) => [...oldArray, payment]);
    }
  }, [paymentMethod]);

  //Component UseMemo
  const billingMemoDrawer = useMemo(
    () => (
      <BillingDrawer
        visible={drawer}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        setDrawer={setDrawer}
        paymentType={paymentMethodType}
        close={() => {
          closeDrawer();
        }}
        generateToken={generateToken()[1]}
      />
    ),
    []
  );
  return (
    <>
      {billingMemoDrawer}
      <Card className="setting-content">
        <h2 className="mb-2">Billing</h2>
        <Table
          locale={locale}
          dataSource={creditCards}
          // rowSelection={rowSelection}
          columns={tableColumnsBilling}
          pagination={false}
          rowKey="_id"
          rowSelection={{
            selectedRowKeys: selectedRowKeys,
            type: "radio",
            preserveSelectedRowKeys: false,
            ...rowSelectionCredit,
          }}
        />
        <div className="mt-3 text-left">
          <Row gutter={24}>
            <Col sm={24} md={24} lg={24} className="text-left">
              <h4 className="mb-2">Credit Card/Debit Card</h4>
            </Col>
            <Col sm={24} md={24} lg={14}>
              <Button
                style={{ padding: "0 20px" }}
                className="card-platform"
                onClick={() => showDrawer("credit")}
              >
                <Row justify="space-between" className=" d-flex">
                  <Col className="text-left">
                    <img
                      style={{ width: "9%", marginRight: "5px" }}
                      src="/img/others/img-7.png"
                    />
                    Credit Card/Debit Card
                  </Col>
                  <Col sm={5} md={5} lg={5}>
                    <img
                      className="card-brand"
                      style={{ width: "25%" }}
                      src="/img/others/cards/amex.png"
                    />
                    <img
                      style={{ width: "25%" }}
                      className="card-brand"
                      src="/img/others/cards/jcb.png"
                    />
                    <img
                      style={{ width: "25%" }}
                      className="card-brand"
                      src="/img/others/cards/mc.png"
                    />
                    <img
                      style={{ width: "25%" }}
                      className="card-brand"
                      src="/img/others/cards/visa.png"
                    />
                  </Col>
                </Row>
              </Button>
            </Col>
            <Col sm={24} md={24} lg={24} className="text-left">
              <h4 className="mt-2">E-Wallet</h4>
            </Col>
            <Col sm={24} md={24} lg={12}>
              <Button
                style={{ padding: "0 20px" }}
                className="card-platform"
                onClick={() => showDrawer("e-wallet")}
              >
                <Row justify="space-between" className=" d-flex">
                  <Col className="text-left">
                    <Row>
                      <h4 className="mt-2 mr-1">GCash</h4>
                      <span className="pt-2-1">GCash</span>
                    </Row>
                  </Col>
                </Row>
              </Button>
            </Col>
          </Row>
        </div>
      </Card>
    </>
  );
};

export default React.memo(BillingTable);
