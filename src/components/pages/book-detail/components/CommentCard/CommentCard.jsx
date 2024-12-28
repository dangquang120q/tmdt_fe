import { Avatar, Space } from "antd";
import Rate from "components/Rate";
import { FaCheckCircle, FaUser } from "react-icons/fa";
import avatar from "resources/images/admin-avatar.webp";
function CommentCard({ item }) {
  return (
    <div className="comment-card">
      <div className="user-comment">
        <div className="user-info">
          <Avatar
            size={50}
            icon={<FaUser size={20} />}
            src={item.avatar || undefined}
          />
          <p className="user-name">{item.name}</p>
        </div>
        <div className="comment-info">
          <div className="rate-date">
            <Space>
              <Rate value={item.rate} />
              <b style={{ fontSize: 17 }}>{item.headline}</b>
            </Space>
            <span className="date">
              {new Date(item.createdAt).toLocaleString()}
            </span>
          </div>
          <div className="comment-content">
            <p className="comment-content">{item.content}</p>
          </div>
        </div>
      </div>
      <div className="reply-comment-container">
        {item.reply.map((reply, index) => (
          <div className="reply-comment" key={index}>
            <div className="user-info">
              <Avatar size={50} src={avatar} />
            </div>
            <div className="comment-info">
              <div className="rate-date">
                <Space>
                  <b className="user-name">Romand Official</b>
                  <FaCheckCircle color="green" />
                </Space>
                <span className="date">
                  {new Date(reply.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="comment-content">
                <p className="comment-content">{reply.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentCard;
