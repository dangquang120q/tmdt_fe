import axios from "axios";
import { createContext, useEffect, useState, useMemo } from "react";
import { cartService } from "services/cart";
import showMessage from "components/Message";
import { useAuthentication } from "store/useAuthentication";

export const CartContext = createContext();

export const CartProvide = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const user = useAuthentication();
  // Tổng tiền sản phẩm đã chọn
  const totalPrice = useMemo(() => {
    const total = selectedItems.reduce((res, item) => {
      return res + item.product.price * item.qty;
    }, 0);
    return total;
  }, [selectedItems]);
  // Tổng số lượng sản phẩm đã chọn
  const totalQuantities = useMemo(() => {
    const sumQty = selectedItems.reduce((res, item) => {
      return res + item.qty;
    }, 0);
    return sumQty;
  }, [selectedItems]);

  const selectedItemsKey = useMemo(() => {
    return selectedItems.map((item) => {
      return item.key;
    });
  }, [selectedItems]);

  useEffect(() => {
    const items = cartItems.filter(
      (item) =>
        selectedItemsKey.includes(item.id) && item.qty <= item.product.quantity
    );

    setSelectedItems(items);
  }, [cartItems]);
  const fetchData = async (id) => {
    const res = await cartService.viewCart({ customer_id: id });
    const data = res.data.data.map((item) => ({ ...item, key: item.id }));
    setCartItems(data);
  };
  useEffect(() => {
    if (user?.id) {
      fetchData(user.id);
    }
  }, [user.id]);
  const onAdd = async (product, quantity) => {
    if (user.id) {
      const res = await cartService.addToCart({
        customer_id: user.id,
        product_id: product.id,
        qty: quantity,
        totalPrice: product.price * quantity,
      });
      if (res.status == 200) {
        console.log(product);
        await fetchData(user.id);
        showMessage("success", `${quantity} ${product.name} added to the cart`);
      } else {
        showMessage("error", "Add to cart failed!");
      }
    } else {
      showMessage("error", "Please login to add to cart !");
    }
  };

  const onRemove = async (product) => {
    const user = JSON.parse(localStorage.getItem("bookory-user"));
    const res = await axios.post("http://localhost:8080/api/cart/delete", {
      id: product.id,
    });

    if (res.data == "200") {
      fetchData(user.id);
    } else {
      showMessage("error", "Delete not success !");
    }
  };
  const updateQuantity = async (id, action) => {
    await axios.post("http://localhost:8080/api/cart/update", {
      id: id,
      action: action,
    });
  };
  const updateCart = async (id, qty) => {
    try {
      const res = cartService.updateCart({ id, qty });
    } catch (error) {
      showMessage("Update Cart Error!");
    }
  };
  const toggleQuantity = async (id, status) => {
    let isUpdate = 0;

    const updateCartItem = cartItems.map((item) => {
      let qty = item.qty;
      if (item.id == id) {
        if (status == "+" && item.product.quantity > item.qty) {
          qty += 1;
          isUpdate = 1;
          updateCart(item.id, item.qty + 1);
        } else if (status == "-" && qty > 1) {
          qty -= 1;
          isUpdate = 1;
          updateCart(item.id, item.qty - 1);
        }
      }
      return { ...item, qty: qty };
    });

    if (isUpdate) setCartItems(updateCartItem);
  };

  const handleCheckout = () => {
    // const orderid = crypto.randomUUID();
    // window.location.href = `/checkout-success/${orderid}`;
  };

  const handleCheckoutSuccess = async (id) => {};
  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        onAdd,
        onRemove,
        fetchData,
        handleCheckout,
        handleCheckoutSuccess,
        selectedItems,
        setSelectedItems,
        totalPrice,
        totalQuantities,
        selectedItemsKey,
        toggleQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
