import { Button, Empty, Form, Modal, Radio, Space, Tag } from "antd";
import AddressModal from "components/pages/account/components/AddressModal";
import { ADDRESS_TAG_COLOR } from "constant";
import { initAddress } from "pages/account/address";
import { useEffect, useState } from "react";
import { cartService } from "services/cart";
import { useAuthentication } from "store/useAuthentication";

function SelectAddressModal({ isOpen, setIsOpen, address, setAddress }) {
  const [list, setList] = useState([]);
  const [open, setOpen] = useState({
    type: "",
    item: initAddress,
  });
  const { id } = useAuthentication();

  const fetchData = async () => {
    try {
      const res = await cartService.listAddress({ customer_id: id });
      setList(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleSubmit = (val) => {
    setAddress(list.find((item) => item.id == val.address));
    handleClose();
  };
  useEffect(() => {
    if (id) fetchData();
  }, [id]);
  const initValue = {
    address: address.id,
  };
  return (
    <Modal
      className="address-modal"
      footer={false}
      open={isOpen}
      onCancel={handleClose}
    >
      <div className="account-title">
        <h1>My address</h1>
      </div>
      <Button
        type="primary"
        onClick={() => {
          setOpen((prev) => ({ ...prev, type: "add" }));
        }}
      >
        + Add New Address
      </Button>
      <Form onFinish={handleSubmit} initialValues={initValue}>
        <div className="address-container">
          {list.length > 0 ? (
            <Form.Item name="address">
              <Radio.Group>
                {list.map((item, id) => (
                  <div className="address-item" key={id}>
                    <Radio value={item.id}>
                      <div className="address-item-info">
                        <Space className="user-info">
                          <b>{item.name}</b> | <p>{item.phone}</p>
                        </Space>
                        <p>{item.address}</p>
                        <Tag color={ADDRESS_TAG_COLOR[item.type]}>
                          {item.type}
                        </Tag>
                      </div>
                    </Radio>
                  </div>
                ))}
              </Radio.Group>
            </Form.Item>
          ) : (
            <Empty description="No address" />
          )}
        </div>
        <Space>
          <Button onClick={handleClose}>Cancel</Button>
          <Button htmlType="submit" type="primary">
            Confirm
          </Button>
        </Space>
      </Form>
      <AddressModal open={open} setOpen={setOpen} getListAddress={fetchData} />
    </Modal>
  );
}

export default SelectAddressModal;
