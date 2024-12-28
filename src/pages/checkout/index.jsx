import { Form, Table, Space, Button, Radio, Select, Row, Col } from "antd";
import { useContext, useEffect, useState } from "react";
import SelectAddressModal from "components/pages/checkout/AddressModal";
import { cartService } from "services/cart";
import { useAuthentication } from "store/useAuthentication";
import { CartContext } from "context/CartContext";
import { initAddress } from "../account/address";
import NumberFormat from "components/NumberFormat";
import { BsTicketPerforated } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";
import { payment } from "constant/fakeData";
import { useCheckOut } from "hooks/useCheckOut";
import { orderService } from "services/order";
import { useNavigate } from "react-router-dom";
import showMessage from "components/Message";

function Checkout() {
  const [address, setAddress] = useState(initAddress);
  const [info, setInfo] = useState({
    shippingValue: 0,
    voucher: 0,
    paymentMethod: "Cash on Delivery"
  });
  const navigate = useNavigate();
  const { shipping, voucher } = useCheckOut();

  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const { id } = useAuthentication();
  const { selectedItems, totalPrice, totalQuantities, fetchData } =
    useContext(CartContext);
  const getListAddress = async () => {
    try {
      const res = await cartService.listAddress({ customer_id: id });
      setAddress(res.data.data[0] || initAddress);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (value) => {
    if (!address.id) {
      showMessage("warning", "You haven't selected address");
      return;
    }
    if(value.paymentMethod == "zalopay"){
      value.paymentMethod = "Cash on Zalo Pay"
    }
    else{
      value.paymentMethod = "Cash on Delivery"
    }
    const data = {
      ...value,
      addressId: address.id,
      products: selectedItems,
      totalPrice: totalPrice + info.shippingValue - info.voucher,
    };
    console.log(data);
    try {
      const res = await orderService.createOrder(data);

      if (res.data.statusCode == 200) {
        console.log(value.paymentMethod);
        if (value.paymentMethod = "Cash on Zalo Pay") {
          // console.log(res.data.data.msg);
          // window.href(`${res.data.data.msg}`);
          window.location.href = res.data.data.msg
        }
        else{
          navigate(`/checkout-success/${res.data.data.order_id}`)
        }
        fetchData && fetchData();
      } else {
        showMessage("error", "Place order failed!");
      }
    } catch (error) {
      console.log(error);
      showMessage("error", "Place order failed!");
    }
  };

  useEffect(() => {
    getListAddress();
  }, [id]);
  const column = [
    {
      title: <h2 className="table-title">Product Ordered</h2>,
      dataIndex: "product",
      key: "product",
      width: "45%",
      render: (product) => (
        <div className="product-info">
          <img src={product.image} alt="" />
          <div>
            <p className="product-name">{product.name}</p>
            <p className="product-option">#{product.optionName}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Unit price",
      dataIndex: "product",
      key: "product",
      align: "center",
      width: "10%",
      render: (product) => <p>${product.price}</p>,
    },
    {
      title: "Amount",
      dataIndex: "qty",
      key: "qty",
      width: "10%",
      align: "center",
    },
    {
      title: "Sub Total",
      dataIndex: "qty",
      key: "qty",
      align: "center",
      width: "10%",
      render: (val, rec) => (
        <p className="product-total">
          $<NumberFormat value={val * rec.product.price} />{" "}
        </p>
      ),
    },
  ];

  return (
    <div className="checkout">
      <h1 className="title">Checkout</h1>
      <Form form={form} onFinish={handleSubmit}>
        <div className="delivery-address-border" />
        <div className="delivery-address">
          <h2>Delivery Address</h2>
          <Space>
            <Space className="address-info">
              <b>
                {address.name} | {address.phone}
              </b>
              <p>{address.address}</p>
            </Space>
            <Button
              type="link"
              onClick={() => {
                setOpen(true);
              }}
            >
              Change
            </Button>
          </Space>
        </div>
        <div className="product-ordered">
          <Table
            columns={column}
            dataSource={selectedItems}
            className="cart-table"
            pagination={false}
          />
          <Space className="total">
            <p>Order Total ({totalQuantities} items):</p>
            <b>
              $<NumberFormat value={totalPrice} />
            </b>
          </Space>
        </div>
        <div className="shipping-voucher">
          <div className="shipping">
            <div className="shipping-total">
              <h2>Shipping Option:</h2>
              <b>${info.shippingValue}</b>
            </div>
            <Form.Item
              name="shippingTypeId"
              rules={[
                {
                  required: true,
                  message: "You haven't selected shipping type",
                },
              ]}
            >
              <Radio.Group
                onChange={(e) => {
                  e = e.target.value;
                  const data = shipping.find((item) => item.id == e);
                  setInfo((prev) => ({ ...prev, shippingValue: data.value }));
                }}
              >
                {shipping.map((item) => (
                  <Radio value={item.id}>
                    <div className="shipping-item">
                      <Space>
                        <FaShippingFast
                          size={16}
                          style={{ marginTop: 6 }}
                          color="#26aa99"
                        />
                        <p>
                          {item.name} - {item.value}$
                        </p>
                      </Space>
                      <p className="desc">{item.description}</p>
                    </div>
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </div>
          <div className="voucher">
            <div className="voucher-title">
              <BsTicketPerforated size={20} />
              <h2>Voucher</h2>
            </div>
            <div className="voucher-input">
              <Form.Item name="voucherId">
                <Select
                  style={{ width: "300px" }}
                  options={voucher.map((item) => ({
                    value: item.id,
                    label: (
                      <div className="voucher-item">
                        <div className="d-flex align-items-center gap-10">
                          <BsTicketPerforated />
                          <p>{item.name}</p>
                        </div>
                        <span>{item.description}</span>
                      </div>
                    ),
                  }))}
                  onChange={(e) => {
                    console.log(e);
                    const data = voucher.find((item) => item.id == e);
                    setInfo((prev) => ({
                      ...prev,
                      voucher: data.discountPercent
                        ? totalPrice * data.discountPercent
                        : data.discountAmount,
                    }));
                  }}
                ></Select>
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="payment">
          <div className="payment-method">
            <h2>Payment method</h2>
            <Form.Item name="paymentMethod">
              <Select
                options={payment}
                style={{ width: "300px" }}
                defaultValue={"cash"}
                onChange={(e) => {
                  const data = payment.find((item) => item.value == e);
                  console.log(data.label);
                  setInfo((prev) => ({
                    ...prev,
                    paymentMethod: data.label
                  }));
                }}
              ></Select>
            </Form.Item>
          </div>
          <div className="total">
            <Row>
              <Col span={18}></Col>
              <Col span={3}>
                <div className="total-name">
                  <p>Merchandise Subtotal:</p>
                  <p>Shipping Total:</p>
                  <p>Voucher Discount:</p>
                  <p>Total Payment:</p>
                </div>
              </Col>
              <Col span={3}>
                <div className="total-value">
                  <p>
                    $<NumberFormat value={totalPrice} />
                  </p>
                  <p>${info.shippingValue}</p>
                  <p>-${info.voucher}</p>
                  <h2>
                    $
                    <NumberFormat
                      value={totalPrice + info.shippingValue - info.voucher}
                    />
                  </h2>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={18}></Col>
              <Col span={6}>
                <Button type="primary" className="btn-order" htmlType="submit">
                  Place Order
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </Form>
      <SelectAddressModal
        isOpen={open}
        setIsOpen={setOpen}
        address={address}
        setAddress={setAddress}
      />
    </div>
  );
}

export default Checkout;
