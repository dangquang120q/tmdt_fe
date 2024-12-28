import { API_URL, axiosCus } from "../axios";

class CartService {
  baseUrl = API_URL + "/cart";
  addToCart({ customer_id, product_id, qty, totalPrice }) {
    return axiosCus.post(this.baseUrl + "/addProductToCart", {
      customer_id,
      product_id,
      qty,
      totalPrice,
    });
  }
  viewCart({ customer_id }) {
    return axiosCus.post(this.baseUrl + "/viewCart", { customer_id });
  }
  deleteCart({ id }) {
    return axiosCus.post(this.baseUrl + "/deleteCart", { id });
  }
  updateCart({ id, qty }) {
    return axiosCus.post(this.baseUrl + "/updateCart", { id, qty });
  }
  listAddress({ customer_id }) {
    return axiosCus.post(this.baseUrl + "/listAddress", { customer_id });
  }
  addAddress({ customer_id, name, address, phone, type }) {
    return axiosCus.post(this.baseUrl + "/addAddress", {
      customer_id,
      name,
      address,
      phone,
      type,
    });
  }
  editAddress({ address_id, name, address, phone, type }) {
    return axiosCus.post(this.baseUrl + "/editAddress", {
      address_id,
      name,
      address,
      phone,
      type,
    });
  }
  deleteAddress({ address_id }) {
    return axiosCus.post(this.baseUrl + "/deleteAddress", { address_id });
  }
}

export const cartService = new CartService();
