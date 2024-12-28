import { Col, Divider, Row } from "antd";
import ava4 from "resources/images/avatar/ava4.png";
import ava5 from "resources/images/avatar/ava5.png";
import ava6 from "resources/images/avatar/ava6.png";

function AboutPage() {
  const tags = [
    {
      avatar: ava4,
      content:
        '"I am so happy to find a site where I can shop for unusual items. The packaging was phenomenal and my book arrived on time in perfect condition."',
      name: "Ellie A.",
      address: "New York",
    },
    {
      avatar: ava5,
      content:
        "“This is the best book store!. The prices are great, and there is always a sale of some kind going on. You can find just what you are looking for.”",
      name: "Joel M.",
      address: "New York",
    },
    {
      avatar: ava6,
      content:
        '"Excellent service. The books were wrapped securely and arrived in pristine condition. I sent an email after to books arrived to ask about the author."',
      name: "Join Doe",
      address: "New York",
    },
  ];
  return (
    <div className="about-page">
      <div className="page-title">
        <h1>About</h1>
      </div>
      <div className="page-content">
        <img
          src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/About_01_1.png"
          alt=""
        />
        <h2 className="description">
          We are the premier book retailing chain in the Southeastern United
          States with more than 260 Book stores in 32 states.
        </h2>
        <img
          className="store-image"
          src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/About_04.jpg"
          alt=""
        />
        <Divider orientation="left" orientationMargin="0">
          <h1>What clients say ?</h1>
        </Divider>
        <div className="client-tag-container">
          <Row gutter={16}>
            {tags.map((item, id) => (
              <Col span={8} key={id}>
                <div className="client-tag">
                  <img src={item.avatar} alt="" className="client-avatar" />
                  <div className="content">{item.content}</div>
                  <div className="info">
                    <b className="name">{item.name}</b>
                    <span>/ {item.address}</span>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
