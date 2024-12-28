import { Button, Form, Input, Modal, Rate, Spin } from "antd";
import { useState } from "react";
import { useAuthentication } from "store/useAuthentication";
import { useReviewForm } from "../../hooks/useReviewForm";
import { productService } from "services/product";
import showMessage from "components/Message";
import { initFeedback } from "../Comments/Comments";

function ReviewForm({ open, setOpen, fetchData }) {
  const { id } = useAuthentication();
  const [loading, setLoading] = useState(false);
  const handleCloseModal = () => {
    setOpen({
      lineId: "",
      feedback: initFeedback,
    });
  };
  1;
  const handleSubmit = async (value) => {
    const reqData = {
      ...value,
      customer_id: id,
      product_id: open.lineId,
      id: open.feedback.id || 0,
    };
    // console.log(reqData);
    setLoading(true);
    try {
      const res = await productService.sendFeedback(reqData);
      if (res.status == 200) {
        fetchData && (await fetchData());
        handleCloseModal();
      }
    } catch (error) {
      console.log(error);
      showMessage("error", "Send Review Error!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      open={open.lineId != ""}
      onCancel={handleCloseModal}
      footer={null}
      destroyOnClose={true}
      maskClosable={false}
      width={600}
      className="review-form-modal"
    >
      <h2 className="title">Share your thoughts</h2>
      <Form
        onFinish={handleSubmit}
        layout="vertical"
        initialValues={open.feedback}
      >
        <Form.Item
          name="rate"
          label="Rate your experience"
          rules={[{ required: true, message: "A star rating is required" }]}
        >
          <Rate />
        </Form.Item>
        <Form.Item
          name="content"
          label="Write a review"
          rules={[{ required: true, message: "Review content is required" }]}
        >
          <Input.TextArea
            placeholder="Tell us what you like or dislike"
            cols={72}
            rows={5}
            maxLength={500}
            showCount
          />
        </Form.Item>
        <Form.Item name="headline" label="Add a headline ">
          <Input placeholder="Summarize your experience" />
        </Form.Item>
        <div className="button-submit">
          {loading ? (
            <Spin size="large" />
          ) : (
            <Button type="primary" htmlType="submit">
              Send
            </Button>
          )}
        </div>
      </Form>
    </Modal>
  );
}

export default ReviewForm;
