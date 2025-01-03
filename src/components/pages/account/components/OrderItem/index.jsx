import axios from "axios";
import toast from "react-hot-toast";
import { truncateString } from "utils";
import CartItem from "../CartItem";

function OrderItem({ item, pending = false }) {
  const handleCancel = async () => {
    if (confirm("Bạn có chắc chắn muốn hủy đơn hàng?")) {
      await axios.post(`http://localhost:8080/api/cancelled/${item.id}`);
      toast.success("Hủy đơn hàng thành công!");
      setTimeout(() => {
        location.reload();
      }, [500]);
    }
  };
  return (
    <div className="order-item">
      <p className="id">
        <b>Order ID:</b> {truncateString(item.id, 12)}
      </p>
      <div className="order-product-container">
        {item.products.map((product, id) => {
          return <CartItem item={product} key={id} order />;
        })}
      </div>
      <p className="total">
        {pending && (
          <button className="app-button" onClick={handleCancel}>
            Hủy đơn hàng
          </button>
        )}
        Tổng cộng: <span>{item.total} VNĐ</span>
      </p>
    </div>
  );
}

export default OrderItem;
