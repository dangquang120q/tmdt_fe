import { Modal } from "antd";
import { useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import SignupForm from "../SignupForm/SingupForm";

function LoginModal({ open, setOpen }) {
  const [toggle, setToggle] = useState(true);
  const handleClostModal = () => {
    setOpen(false);
  };
  return (
    <Modal
      open={open}
      onOk={handleClostModal}
      onCancel={handleClostModal}
      footer={null}
      destroyOnClose={true}
      maskClosable={false}
      wrapClassName="login-modal-wrap"
      width={500}
    >
      <div className="login-form-head">
        <span
          className={`login-form-title ${toggle ? "active" : ""}`}
          onClick={() => {
            setToggle(true);
          }}
        >
          Sign in
        </span>
        <span
          className={`login-form-title ${toggle ? "" : "active"}`}
          onClick={() => {
            setToggle(false);
          }}
        >
          Create an Account
        </span>
      </div>
      {toggle ? <LoginForm onCloseModal={handleClostModal} /> : <SignupForm />}
    </Modal>
  );
}

export default LoginModal;
