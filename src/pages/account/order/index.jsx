import { Button, Col, Divider, Row, Space, Steps, Table, Tooltip } from "antd";
import NumberFormat from "components/NumberFormat";
import { ORDER_STATUS } from "constant";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { BsExclamationCircleFill, BsXCircleFill } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";
import { HiInboxArrowDown } from "react-icons/hi2";
import { IoIosArrowBack } from "react-icons/io";
import { IoReceiptOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { orderService } from "services/order";

const Order = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const shippingIndex = ORDER_STATUS.findIndex(
    (item) => item.value == order.status
  );
  const orderTracking = (
    order.status == "Cancelled"
      ? [
          {
            title: "Order Placed",
            icon: <IoReceiptOutline />,
            index: 1,
            status: "Processing",
          },
          {
            title: "Order Cancelled",
            icon: <BsXCircleFill />,
            index: 4,
            status: "Cancelled",
          },
        ]
      : [
          {
            title: "Order Placed",
            icon: <IoReceiptOutline />,
            index: 1,
            status: "Processing",
          },
          {
            title: "Order Shipped Out",
            icon: <FaShippingFast />,
            index: 2,
            status: "Delivering",
          },
          {
            title: "Order Received",
            icon: <HiInboxArrowDown />,
            index: 3,
            status: "Completed",
          },
        ]
  ).map(({ title, icon, index, status }) => ({
    title: (
      <div className="step-item-title">
        <div className="step-item-icon">{icon}</div>
        <p>{title}</p>
      </div>
    ),
    status: shippingIndex >= index ? "finish" : "wait",
    description: (() => {
      if (shippingIndex >= index) {
        try {
          const shipping = order.tracking.find((item) => item.status == status);
          return dayjs(shipping.updatedAt).format("DD-MM-YYYY HH:MM");
        } catch (error) {
          return "";
        }
      }
    })(),
  }));
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const res = await orderService.getOrder({ orderId: id });
      if (res.status == 200) {
        console.log(res.data.data);
        setOrder(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const column = [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (_val, _rec, id) => <p>{id + 1}</p>,
    },
    {
      title: "Product",
      dataIndex: "id",
      key: "id",
      width: "45%",
      render: (_val, product) => (
        <div className="product-info">
          <img src={product.image} alt="" />
          <div>
            <p className="product-name">{product?.name}</p>
            <p className="product-option">#{product.optionName}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Unit price",
      dataIndex: "price",
      key: "price",
      align: "center",
    },
    {
      title: "Quantity",
      dataIndex: "qty",
      key: "qty",
      width: 115,
      align: "center",
    },
    {
      title: "Sub Total",
      dataIndex: "qty",
      key: "qty",
      align: "center",
      render: (val, rec) => (
        <p className="product-total">
          $<NumberFormat value={val * rec.price} />{" "}
        </p>
      ),
    },
  ];
  const priceItem = [
    {
      title: "Merchandise Subtotal",
      value: (
        <NumberFormat
          value={order.products?.reduce(
            (val, item) => val + item.price * item.qty,
            0
          )}
          prefix="$"
        />
      ),
    },
    {
      title: "Shipping Fee",
      value: <NumberFormat value={order.shipping?.value} prefix="$" />,
    },
    {
      title: (
        <p className="order-voucher">
          <p>Voucher Applied</p>
          <Tooltip
            title={
              order.voucher
                ? order.voucher?.name + " - " + order.voucher?.description
                : "No voucher applied"
            }
          >
            <BsExclamationCircleFill />
          </Tooltip>
        </p>
      ),
      value: (() => {
        const total = order.products?.reduce(
          (val, item) => val + item.price * item.qty,
          0
        );
        const value =
          order.voucher?.discountAmount ||
          total * order.voucher?.discountPercent ||
          0;
        return <NumberFormat value={value * -1} prefix="$" />;
      })(),
    },
    {
      title: "Order Total",
      value: (
        <div className="order-total">
          <NumberFormat value={order.totalPrice} prefix="$" />
        </div>
      ),
    },
    {
      title: "Payment Method",
      value: order.paymentMethod,
    },
  ];
  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  return (
    <div className="order-detail">
      <div className="order-detail-header">
        <Button
          type="link"
          onClick={() => {
            navigate(-1);
          }}
        >
          <IoIosArrowBack /> <span>Back</span>
        </Button>
        <Space>
          <p className="order-id">Order ID: {id}</p> |
          <p className="order-status">
            {ORDER_STATUS.find((item) => item.value == order.status)?.desc}
          </p>
        </Space>
      </div>
      <div className="order-detail-step">
        <Steps items={orderTracking} />
        <Row gutter={30}>
          <Col span={14}>
            <div className="order-delivery">
              <h3>Delivery Address:</h3>
              <p>
                {order.address?.name} - {order.address?.phone}
              </p>
              <p>{order.address?.address}</p>
            </div>
          </Col>

          <Col span={10}>
            <div className="order-shipping-type">
              <h3>Shipping Type:</h3>
              <p>
                {order.shipping?.name} - ${order.shipping?.value}
              </p>
              <p>{order.shipping?.description}</p>
            </div>
          </Col>
        </Row>
      </div>
      <div className="order-product">
        <Table
          columns={column}
          dataSource={order.products}
          className="cart-table"
          pagination={false}
        />
        <div className="order-price">
          {priceItem.map((item) => (
            <div className="order-price-item">
              <p>{item.title}</p>
              <b>{item.value}</b>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
