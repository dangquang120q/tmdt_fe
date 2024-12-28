import { Button, Space, Typography } from "antd";
import showMessage from "components/Message";
import { CartContext } from "context/CartContext";
import { useContext } from "react";
import { useAddToCart } from "../../hooks/useAddToCart";

const { Text } = Typography;

function AddToCart({ item, totalQty }) {
  const { value, increaseValue, decreaseValue, changeValue, onBlur } =
    useAddToCart(item);
  const { onAdd } = useContext(CartContext);
  const handleAddCart = async () => {
    if (item.id) {
      await onAdd(item, value);
    } else {
      showMessage("warning", "You have to select option");
    }
  };

  return (
    <div className="add-to-cart">
      <Space>
        <div className="quantity-input">
          <div className="quantity-button minus" onClick={decreaseValue}>
            -
          </div>
          <div className="quantity-button">
            <input
              type="number"
              value={value}
              onChange={changeValue}
              onBlur={onBlur}
              max={item.quantity}
            />
          </div>
          <div
            className="quantity-button plus"
            onClick={() => {
              if (value < item.quantity) increaseValue();
            }}
          >
            +
          </div>
        </div>
        <p>{item.id ? item.quantity : totalQty} products available</p>
      </Space>
      <br />
      {value > item.quantity && item.id && (
        <Text type="danger">
          Quantity selected is more than product available!
        </Text>
      )}
      <Button
        type="primary"
        className="add-button"
        onClick={handleAddCart}
        disabled={value > item.quantity && item.id}
      >
        <span>Add to cart</span>
      </Button>
    </div>
  );
}

export default AddToCart;
