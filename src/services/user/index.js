import { API_URL, axiosCus } from "../axios";

class UserService {
  baseUrl = API_URL + "/user";
  signUp(params) {
    return axiosCus.post(this.baseUrl + "/signup", params);
  }
  login(params) {
    return axiosCus.post(this.baseUrl + "/login", params);
  }
  changeInfo(params) {
    return axiosCus.post(this.baseUrl + "/changeInfo", {
      ...params,
      customer_id: params.id,
    });
  }
  getUser(params) {
    const { username } = params;
    return axiosCus.post(this.baseUrl + "/getUser", { username });
  }
}

export const userService = new UserService();
