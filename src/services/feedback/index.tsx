import { API_URL, axiosCus } from "../axios";

class FeedbackService {
  getListReview() {
    return axiosCus.post(API_URL + "/user/getReview");
  }
  sendReview({ customer_id, content }) {
    return axiosCus.post(API_URL + "/user/sendReview", {
      customer_id,
      content,
    });
  }
}

export const feedbackService = new FeedbackService();
