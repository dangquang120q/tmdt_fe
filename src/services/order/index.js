import { API_URL, axiosCus } from "../axios";

class OrderService {
  baseUrl = API_URL + "/order";

  getShippingType() {
    return axiosCus.post(this.baseUrl + "/shippingType");
  }
  getVoucher({ customerId }) {
    return axiosCus.post(this.baseUrl + "/getVoucherOrder", { customerId });
  }
  createOrder(params) {
    return axiosCus.post(this.baseUrl + "/createOrder", params);
  }
  getListOrder({ customerId, status }) {
    return axiosCus.post(this.baseUrl + "/getListOrderByCustomer", {
      customerId,
      status,
    });
  }
  updateOrderStatus({ orderId, status }) {
    return axiosCus.post(this.baseUrl + "/updateOrderStatus", {
      orderId,
      status,
    });
  }
  getOrder({ orderId }) {
    return axiosCus.post(this.baseUrl + "/getOrder", { orderId });
  }
}

export const orderService = new OrderService();
