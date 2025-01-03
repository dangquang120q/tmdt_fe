import { Button, Empty, Space, Tag, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { cartService } from "services/cart";
import AddressModal from "components/pages/account/components/AddressModal";
import { useAuthentication } from "store/useAuthentication";
import { ADDRESS_TAG_COLOR } from "constant";
import showMessage from "components/Message";

export const initAddress = {
  id: "",
  name: "",
  phone: "",
  address: "",
  type: "",
};

function Address() {
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

  const handleDelete = async (address_id) => {
    try {
      const res = await cartService.deleteAddress({ address_id });
      if (res.status == 200) {
        showMessage("success", "Delete address successful!");
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) fetchData();
  }, [id]);
  return (
    <div className="address profile">
      <div className="account-title">
        <h1>Địa chỉ nhận hàng</h1>
      </div>
      <Button
        type="primary"
        onClick={() => {
          setOpen((prev) => ({ ...prev, type: "add" }));
        }}
      >
        + Thêm mới địa chỉ
      </Button>
      <div className="address-container">
        {list.length > 0 ? (
          list.map((item, id) => (
            <div className="address-item" key={id}>
              <div className="address-item-info">
                <Space className="user-info">
                  <b>{item.name}</b> | <p>{item.phone}</p>
                </Space>
                <p>{item.address}</p>
                <Tag color={ADDRESS_TAG_COLOR[item.type]}>{item.type}</Tag>
              </div>
              <div className="address-item-action">
                <Button
                  type="link"
                  onClick={() => {
                    setOpen({ type: "edit", item: item });
                  }}
                >
                  Sửa
                </Button>{" "}
                |
                <Popconfirm
                  title="Xóa địa chỉ"
                  description="Bạn có chắc muốn xóa địa chỉ?"
                  onConfirm={() => {
                    handleDelete(item.id);
                  }}
                  okText="Đồng ý"
                  cancelText="Hủy"
                >
                  <Button type="link" danger>
                    Xóa
                  </Button>
                </Popconfirm>
              </div>
            </div>
          ))
        ) : (
          <Empty description="" />
        )}
      </div>
      <AddressModal open={open} setOpen={setOpen} getListAddress={fetchData} />
    </div>
  );
}

export default Address;
