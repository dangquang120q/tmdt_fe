import { useEffect, useRef, useState } from "react";
import { feedbackService } from "services/feedback";
import { Avatar, Button, Form, Input } from "antd";
import { FaUser } from "react-icons/fa";
import dayjs from "dayjs";
import avatar from "resources/images/admin-avatar.webp";
import { useAuthentication } from "store/useAuthentication";
import showMessage from "../Message";

const Feedback = () => {
  const [feedback, setFeedback] = useState([]);
  const writeRef = useRef();
  const { id } = useAuthentication();
  const [form] = Form.useForm();
  const getListFeedback = async () => {
    try {
      const res = await feedbackService.getListReview();
      console.log(res);
      setFeedback(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getListFeedback();
  }, []);
  const handleSubmit = async (value) => {
    const data = {
      customer_id: id,
      ...value,
    };
    try {
      const res = await feedbackService.sendReview(data);
      if (res.status == 200) {
        showMessage("success", "Send Feedback Success!");
        getListFeedback();
        form.resetFields();
      }
    } catch (error) {
      showMessage("success", "Send Feedback Failed!");
    }
  };
  return (
    <div className="feedback">
      <h1 className="title">Website Feedback</h1>
      <div
        className="feedback-container"
        style={{ paddingBottom: writeRef.current?.clientHeight }}
      >
        {feedback.map((item, index) => (
          <div className="feedback-item" key={index}>
            <div className="feedback-item-header">
              <Avatar
                size={40}
                icon={<FaUser size={20} />}
                src={item.avatar || undefined}
              />
              <div className="user-info">
                <b>{item.name}</b>
                <p>{dayjs(item.createdAt).format("DD/MM/YYYY HH:mm")}</p>
              </div>
            </div>
            <div className="feedback-item-content">{item.content}</div>
            <div className="feedback-reply">
              {item.reply.map((reply, id) => (
                <div className="feedback-reply-item" key={id}>
                  <div className="feedback-item-header">
                    <Avatar
                      size={40}
                      icon={<FaUser size={20} />}
                      src={avatar}
                    />
                    <div className="user-info">
                      <b>Romand Amin</b>
                      <p>{dayjs(reply.createdAt).format("DD/MM/YYYY HH:mm")}</p>
                    </div>
                  </div>
                  <div className="feedback-item-content">{reply.content}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="write-feedback" ref={writeRef}>
        <Form onFinish={handleSubmit} form={form}>
          <Form.Item
            name="content"
            className="content"
            rules={[{ required: true, message: "Content is empty!" }]}
          >
            <Input.TextArea placeholder="Enter feedback" />
          </Form.Item>
          <Button type="primary" htmlType="submit" disabled={!id}>
            Send
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default Feedback;
