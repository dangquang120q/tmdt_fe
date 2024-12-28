import { Button, Col, DatePicker, Form, Input, Radio, Row } from "antd";
import UploadAvatar from "components/UploadAvatar";
import dayjs from "dayjs";
import { useChangeProfile } from "hooks/useChangeProfile";
import { useAuthentication } from "store/useAuthentication";

function Profile() {
  const { contextHolder, form, onHandleChangeInfo } = useChangeProfile();
  const { username, fullName, email, id, avatar, phone, gender, dob } =
    useAuthentication();

  const initValue = {
    username,
    fullName,
    email,
    id,
    avatar,
    phone,
    gender,
    dob: dob ? dayjs("21-07-2002", "DD-MM-YYYY") : "",
  };
  return (
    <div className="profile">
      {contextHolder}
      <div className="account-title">
        <h1>My Profile</h1>
        <p>Manage and protect your account</p>
      </div>
      <Form
        form={form}
        layout="horizontal"
        className="profile-form"
        initialValues={initValue}
        onFinish={onHandleChangeInfo}
      >
        <Row gutter={30}>
          <Col span={14}>
            <Form.Item label="Username" name="username">
              <Input readOnly />
            </Form.Item>
            <Form.Item
              label="Full name"
              name="fullName"
              rules={[{ required: true, message: "Full name is required!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input readOnly />
            </Form.Item>
            <Form.Item label="Phone" name="phone">
              <Input readOnly />
            </Form.Item>
            <Form.Item label="Gender" name="gender">
              <Radio.Group>
                <Radio value="male"> Male </Radio>
                <Radio value="female"> Female </Radio>
                <Radio value="other"> Other </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Date of birth" name="dob">
              <DatePicker />
            </Form.Item>
            <div className="d-flex justify-content-center">
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </div>
          </Col>
          <Col span={10}>
            <Form.Item name="avatar">
              <UploadAvatar form={form} initValue={avatar} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default Profile;
