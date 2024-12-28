import { message } from "antd";

export default function showMessage(msgType, msgContent, key) {
  if (msgContent === "undefined") {
    return;
  }

  message.config({
    maxCount: 1,
  });
  message.open({
    content: msgContent,
    className: "event-message",
    duration: 3,
    type: msgType,
    key: key,
  });
}
