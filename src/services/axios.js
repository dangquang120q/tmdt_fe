import showMessage from "components/Message";
import axios from "axios";

export const API_URL = import.meta.env.VITE_API;

export const axiosCus = axios.create();

axiosCus.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const status = error.response?.status;
    console.log(error);
    if (status == 500) {
      showMessage("error", "Something bad happened on the server");
    } else {
      const msg = error.response.data.data.msg || error.statusText;
      showMessage("error", msg);
    }
    return Promise.reject(error);
  }
);
