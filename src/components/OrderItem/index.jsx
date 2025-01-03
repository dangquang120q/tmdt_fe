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
      title: "Mã",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (_val, _rec, id) => <p>{id + 1}</p>,
    },
    {
      title: "Sản phẩm",
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
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      align: "center",
    },
    {
      title: "Số lượng",
      dataIndex: "qty",
      key: "qty",
      width: 115,
      align: "center",
    },
    {
      title: "Thành tiền",
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
      title: "Đánh giá",
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
      const loading = showMessage("loading", "Đang tải...");
      const res = await orderService.updateOrderStatus({
        orderId: order.id,
        status: ORDER_STATUS[4].value,
      });
      if (res.status == 200) {
        message.destroy(loading);
        showMessage("success", "Hủy đơn hàng thành công!");
        fetchData();
      }
    } catch (error) {
      message.destroy(loading);
      showMessage("error", "Hủy đơn hàng thất bại!");
    }
  };
  const handleReceived = async () => {
    try {
      const loading = showMessage("loading", "Đang tải...");
      const res = await orderService.updateOrderStatus({
        orderId: order.id,
        status: ORDER_STATUS[3].value,
      });
      if (res.status == 200) {
        message.destroy(loading);
        showMessage("success", "Xác nhận đơn hàng thành công!");
        fetchData();
      }
    } catch (error) {
      message.destroy(loading);
      showMessage("error", "Xác nhận đơn hàng thất bại!");
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
          <p>Mã đơn hàng:</p>
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
              title="Hủy đơn hàng"
              description="Bạn có chắc muốn hủy đơn hàng?"
              onConfirm={handleCancel}
              okText="Đồng ý"
              cancelText="Thoát"
            >
              <Button type="primary">Hủy đơn hàng</Button>
            </Popconfirm>
          )}
          {order.newStatus == "Delivering" && (
            <Popconfirm
              title="Đã nhận được hàng"
              description="Bạn xác nhận đã nhận được hàng?"
              onConfirm={handleReceived}
              okText="Đồng ý"
              cancelText="Thoát"
            >
              <Button type="primary">Đã nhận được hàng</Button>
            </Popconfirm>
          )}
        </div>
        <Space>
          <p>Tổng tiền:</p>
          <b>{order.totalPrice} VNĐ</b>
        </Space>
      </div>
    </div>
  );
};
export default OrderItem;
