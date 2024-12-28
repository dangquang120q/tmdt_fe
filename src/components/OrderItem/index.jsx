import { Button, Popconfirm, Space, Table, message } from "antd";
import { ORDER_STATUS } from "constant";
import dayjs from "dayjs";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE_URL } from "routes";
import { orderService } from "services/order";
import { generateSlug } from "utils";
import showMessage from "../Message";
import NumberFormat from "../NumberFormat";

const OrderItem = ({ order, fetchData }) => {
  const navigate = useNavigate();

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
        <Link
          to={`/product/${generateSlug(product.name)}/${product.lineId}`}
          className="product-info"
        >
          <img src={product.image} alt="" />
          <div>
            <p className="product-name">{product.name}</p>
            <p className="product-option">#{product.optionName}</p>
          </div>
        </Link>
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
    {
      title: "Review",
      dataIndex: "id",
      key: "id",
      hiden: order.status != "Completed",
      render: (_val, product) => (
        <Button
          type="link"
          onClick={() => {
            navigate(
              `/product/${generateSlug(product.name)}/${product.lineId}#comment`
            );
          }}
        >
          Review
        </Button>
      ),
    },
  ].filter((item) => !item.hiden);
  const handleCancel = async () => {
    try {
      const loading = showMessage("loading", "Loading...");
      const res = await orderService.updateOrderStatus({
        orderId: order.id,
        status: ORDER_STATUS[4].value,
      });
      if (res.status == 200) {
        message.destroy(loading);
        showMessage("success", "Order canceled successfully!");
        fetchData();
      }
    } catch (error) {
      message.destroy(loading);
      showMessage("error", "Cancel order failed!");
    }
  };
  const handleReceived = async () => {
    try {
      const loading = showMessage("loading", "Loading...");
      const res = await orderService.updateOrderStatus({
        orderId: order.id,
        status: ORDER_STATUS[3].value,
      });
      if (res.status == 200) {
        message.destroy(loading);
        showMessage("success", "Order received successfully!");
        fetchData();
      }
    } catch (error) {
      message.destroy(loading);
      showMessage("error", "Confirm failed!");
    }
  };
  return (
    <div className="purchase-order-item">
      <div className="order-header">
        <Space
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate(ROUTE_URL.PURCHASE + "/order/" + order.id);
          }}
        >
          <p>Order ID:</p>
          <b>{order.id}</b>
        </Space>
        <Space>
          <p>{dayjs(order.updatedAt).format("DD/MM/YYYY HH:mm:ss")}</p> |
          <p className="status">{order.newStatus}</p>
        </Space>
      </div>
      <Table
        columns={column}
        dataSource={order.products}
        className="cart-table"
        pagination={false}
      />
      <div className="total">
        <div>
          {order.newStatus == "Processing" && (
            <Popconfirm
              title="Cancel Order?"
              description="Are you sure to cancel this order?"
              onConfirm={handleCancel}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary">Cancel</Button>
            </Popconfirm>
          )}
          {order.newStatus == "Delivering" && (
            <Popconfirm
              title="Received Order?"
              description="Do you have received your order?"
              onConfirm={handleReceived}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary">Received Order</Button>
            </Popconfirm>
          )}
        </div>
        <Space>
          <p>Total:</p>
          <b>${order.totalPrice}</b>
        </Space>
      </div>
    </div>
  );
};
export default OrderItem;
