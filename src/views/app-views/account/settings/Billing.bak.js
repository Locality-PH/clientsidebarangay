import React, { Component } from "react";
import {
  Table,
  Button,
  Tooltip,
  Form,
  Modal,
  Input,
  Row,
  Col,
  Card,
} from "antd";
import {
  DeleteOutlined,
  CreditCardOutlined,
  CalendarOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { ROW_GUTTER } from "constants/ThemeConstant";

const { Column } = Table;

export class Billing extends Component {
  state = {
    selectedRowKeys: ["card-1"], // Check here to configure the default column
    creditCards: [
      {
        key: "card-1",
        cardType: "Visa",
        cardTypeImg: "/img/others/img-8.png",
        cardNumber: "•••• •••• •••• 7260",
        exp: "06/22",
      },
      {
        key: "card-2",
        cardType: "Master",
        cardTypeImg: "/img/others/img-9.png",
        cardNumber: "•••• •••• •••• 1272",
        exp: "04/21",
      },
    ],
    modalVisible: false,
    newCreditCardInfo: {
      cardHolderName: "",
      cardNumber: "",
      exp: "06/22",
    },
  };

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys });
  };

  showModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  addCard = (values) => {
    const { cardNumber, exp } = values;
    const cardType = [
      {
        img: "/img/others/img-8.png",
        type: "Visa",
      },
      {
        img: "/img/others/img-9.png",
        type: "Master",
      },
    ];
    const randomCardType =
      cardType[Math.floor(Math.random() * cardType.length)];
    const reg = /\b(?:\d{4}[ -]?){3}(?=\d{4}\b)/gm;
    const substr = `•••• •••• •••• `;
    const cardInfo = {
      key: `card-${this.state.creditCards.length + 1}`,
      cardType: randomCardType.type,
      cardTypeImg: randomCardType.img,
      cardNumber: cardNumber.replace(reg, substr),
      exp: exp,
    };
    this.setState({
      modalVisible: false,
      creditCards: [...this.state.creditCards, cardInfo],
    });
  };

  render() {
    const { selectedRowKeys, creditCards, modalVisible } = this.state;
    const rowSelection = {
      selectedRowKeys,
      type: "radio",
      onChange: this.onSelectChange,
    };

    const locale = {
      emptyText: (
        <div className="my-4 text-center">
          <img
            src="/img/others/img-7.png"
            alt="Add credit card"
            style={{ maxWidth: "90px" }}
          />
          <h3 className="mt-3 font-weight-light">Please add a credit card!</h3>
        </div>
      ),
    };

    return (
      <Card className="setting-content">
        <h2 className="mb-4">Billing</h2>
        <Table
          locale={locale}
          dataSource={creditCards}
          rowSelection={rowSelection}
          pagination={false}
        >
          <Column
            title="Card type"
            key="cardType"
            render={(text, record) => (
              <>
                <img src={record.cardTypeImg} alt={record.cardType} />
                <span className="ml-2">{record.cardType}</span>
              </>
            )}
          />
          <Column title="Card Number" dataIndex="cardNumber" key="cardNumber" />
          <Column title="Expires on" dataIndex="exp" key="exp" />
          <Column
            title=""
            key="actions"
            className="text-right"
            render={(text, record) => (
              <Tooltip title="Remove card">
                <Button
                  type="text"
                  shape="circle"
                  icon={<DeleteOutlined />}
                  onClick={() => {
                    const newCreditCards = [...creditCards];
                    this.setState({
                      creditCards: newCreditCards.filter(
                        (item) => item.key !== record.key
                      ),
                    });
                  }}
                />
              </Tooltip>
            )}
          />
        </Table>
        <div className="mt-3 text-right">
          <Button type="primary" onClick={this.showModal}>
            Add new card
          </Button>
        </div>
        <AddNewCardForm
          visible={modalVisible}
          onCreate={this.addCard}
          onCancel={this.closeModal}
        />
      </Card>
    );
  }
}

export default Billing;
