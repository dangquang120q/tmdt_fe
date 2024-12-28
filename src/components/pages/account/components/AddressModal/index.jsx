import { Button, Form, Input, Modal, Radio, Space } from "antd";
import { initAddress } from "pages/account/address";
import { cartService } from "services/cart";
import showMessage from "components/Message";
import { useAuthentication } from "store/useAuthentication";

const { TextArea } = Input;

function AddressModal({ open, setOpen, getListAddress }) {
  const { id } = useAuthentication();
  const handleClose = () => {
    setOpen({
      type: "",
      item: initAddress,
    });
  };
  const handleSubmit = async (value) => {
    if (open.type == "add") {
      value.customer_id = id;
      try {
        console.log(value);
        const res = await cartService.addAddress(value);
        if (res.status == 200) {
          showMessage("success", "Add address successful!");
          getListAddress();
        }
      } catch (error) {
        console.log(error);
      }
    } else if (open.type == "edit") {
      value.address_id = open.item.id;
      try {
        const res = await cartService.editAddress(value);
        if (res.status == 200) {
          showMessage("success", "Edit address successful!");
          getListAddress();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const initValue = {
    name: open.item.name || "",
    phone: open.item.phone || "",
    address: open.item.address || "",
    type: open.item.type || "",
  };
  return (
    <Modal
      open={open.type != ""}
      onCancel={handleClose}
      footer={false}
      maskClosable={false}
      closeIcon={undefined}
      className="address-modal"
      destroyOnClose
    >
      <h1>{open.type == "add" ? "New Address" : "Edit Address"}</h1>
      <Form layout="vertical" onFinish={handleSubmit} initialValues={initValue}>
        <Form.Item
          name="name"
          label="Full Name"
          rules={[{ required: true, message: "Full Name is required!" }]}
        >
          <Input placeholder="Full Name" size="large" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[{ required: true, message: "Phone number is required!" }]}
        >
          <Input placeholder="Phone Number" size="large" />
        </Form.Item>
        <Form.Item
          name="address"
          label="Detail Address"
          rules={[{ required: true, message: "Address is required!" }]}
        >
          <TextArea placeholder="Detail Address" size="large" />
        </Form.Item>
        <Form.Item name="type" label="Label As">
          <Radio.Group>
            <Radio value="Home"> Home </Radio>
            <Radio value="Office"> Office </Radio>
            <Radio value="Other"> Other </Radio>
          </Radio.Group>
        </Form.Item>
        <Space className="button-container">
          <Button onClick={handleClose} size="large">
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" size="large">
            Save
          </Button>
        </Space>
      </Form>
    </Modal>
  );
}

export default AddressModal;
