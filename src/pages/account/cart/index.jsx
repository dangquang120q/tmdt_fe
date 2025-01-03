import { Button, Input, Popconfirm, Space, Table, Typography } from "antd";
import { CartContext } from "context/CartContext";
import { useContext, useEffect } from "react";
import NumberFormat from "components/NumberFormat";
import { useAuthentication } from "store/useAuthentication";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE_URL } from "routes";
import { cartService } from "services/cart";
import showMessage from "components/Message";
import { generateSlug } from "utils";

const { Text } = Typography;

function Cart() {
  const {
    cartItems,
    handleCheckout,
    fetchData,
    setSelectedItems,
    totalPrice,
    totalQuantities,
    selectedItemsKey,
    toggleQuantity,
  } = useContext(CartContext);
  const navigate = useNavigate();
  const { id } = useAuthentication();
  const handleDelete = async (id) => {
    try {
      const res = await cartService.deleteCart({ id });
      if (res.status == 200) {
        showMessage("success", "Xóa sản phẩm thành công!");
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const column = [
    {
      title: "Sản phẩm",
      dataIndex: "product",
      key: "product",
      width: "45%",
      render: (product) => (
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
      dataIndex: "product",
      key: "product",
      align: "center",
      width: "120px",

      render: (product) => <p>${product.price}</p>,
    },
    {
      title: "Số lượng",
      dataIndex: "qty",
      key: "qty",
      width: 115,
      align: "center",
      render: (val, rec) => (
        <div
          className={`product-qty ${
            val > rec.product.quantity ? "product-qty-error" : ""
          }`}
        >
          <Space className="product-qty-input">
            <Button
              onClick={() => {
                toggleQuantity(rec.id, "-");
              }}
            >
              -
            </Button>
            <Input value={val} />
            <Button
              onClick={() => {
                toggleQuantity(rec.id, "+");
              }}
            >
              +
            </Button>
          </Space>

          <Text type="danger">{rec.product.quantity} sản phẩm còn lại</Text>
        </div>
      ),
    },
    {
      title: "Thành tiền",
      dataIndex: "qty",
      key: "qty",
      align: "center",
      width: "120px",
      render: (val, rec) => (
        <p className="product-total">
          <NumberFormat value={val * rec.product.price} /> VNĐ{" "}
        </p>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: 80,
      render: (val) => (
        <Popconfirm
          title="Xóa sản phẩm"
          description="Bạn có chắc muốn xóa sản phẩm?"
          onConfirm={() => {
            handleDelete(val);
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger>
            Xóa
          </Button>
        </Popconfirm>
      ),
    },
  ];
  useEffect(() => {
    if (id) fetchData(id);
  }, [id]);
  const rowSelection = {
    onChange: (_selectedRowKeys, selectedRows) => {
      setSelectedItems(selectedRows);
    },
    getCheckboxProps: (record) => {
      const item = cartItems.find((el) => el.id == record.id);
      return {
        disabled: record.product?.quantity < item.qty,
        // Column configuration not to be checked
      };
    },
  };

  return (
    <div className="cart">
      <h1 className="title">Giỏ hàng</h1>
      <div className="cart-item-container">
        <Table
          columns={column}
          dataSource={cartItems}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
            selectedRowKeys: selectedItemsKey,
          }}
          pagination={false}
          className="cart-table"
        />
      </div>
      <div className="total">
        <Space className="total-amount">
          <h2>
            Tổng tiền (<NumberFormat value={totalQuantities} /> sản phẩm):
          </h2>{" "}
          <h1 className="amount">
            <NumberFormat value={totalPrice} /> VNĐ{" "}
          </h1>
        </Space>
        <button
          className="app-button"
          onClick={() => {
            navigate(ROUTE_URL.CHECKOUT);
          }}
          disabled={selectedItemsKey.length <= 0}
        >
          <span>Thanh toán</span>
        </button>
      </div>
    </div>
  );
}

export default Cart;
