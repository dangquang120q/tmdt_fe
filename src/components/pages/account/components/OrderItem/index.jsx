import axios from "axios";
import toast from "react-hot-toast";
import { truncateString } from "utils";
import CartItem from "../CartItem";

function OrderItem({ item, pending = false }) {
  const handleCancel = async () => {
    if (confirm("Do you want to cancel this order?")) {
      await axios.post(`http://localhost:8080/api/cancelled/${item.id}`);
      toast.success("Cancelled !");
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
            Cancel
          </button>
        )}
        Total: <span>{item.total} $</span>
      </p>
    </div>
  );
}

export default OrderItem;
