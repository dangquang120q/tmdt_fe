import axios from "axios";
import { API_URL, axiosCus } from "../axios";

class ProductService {
  baseUrl = API_URL + "/product";
  getListByCatagory(params) {
    const { category } = params;
    return axios.post(this.baseUrl + "/getProductByCategory", { category });
  }
  getProduct(params) {
    const lineId = params.id;
    return axios.post(this.baseUrl + "/viewProduct", { lineId });
  }
  getProductFeedback(params) {
    const lineId = params.lineId;
    return axios.post(this.baseUrl + "/getFeedback", { lineId });
  }
  getCategory = async () => {
    const res = await axios.post(this.baseUrl + "/getCategory");
    return res.data.data;
  };
  searchProduct = async ({ name }) => {
    const res = await axios.post(this.baseUrl + "/searchProduct", { name });
    return res.data.data || [];
  };
  sendFeedback = async ({
    customer_id,
    product_id,
    content,
    rate,
    headline,
    id,
  }) => {
    return await axiosCus.post(this.baseUrl + "/sendFeedback", {
      customer_id,
      product_id,
      content,
      rate,
      headline,
      id,
    });
  };
  checkFeedback = async ({ userId, lineId }) => {
    return axiosCus.post(this.baseUrl + "/checkFeedback", { userId, lineId });
  };
}

export const productService = new ProductService();
