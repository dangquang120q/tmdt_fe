import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { REGEX_EMAIL, REGEX_PASSWORD } from "constant";
import { message } from "antd";
import axios from "axios";
import { REGEX_PHONE } from "constant";
import { userService } from "services/user";

export const useSignup = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const schema = yup.object({
    username: yup.string().required("Name is required"),
    fullName: yup.string().required("Full name is required"),
    email: yup.string().required("Email is required").matches(REGEX_EMAIL, {
      message: "Invalid email",
    }),
    phone: yup
      .string()
      .required("Phone is required")
      .matches(REGEX_PHONE, { message: "Invalid phone number" }),
    password: yup
      .string()
      .required("Password is required")
      .matches(REGEX_PASSWORD, {
        message:
          "Password must contain at least 8 characters, 1 letter and 1 number",
      }),
    confirm: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Your passwords do not match."),
    gender: yup.string().required("Gender is required!"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const { confirm, fullName, ...params } = data;
    try {
      const res = await userService.signUp({
        ...params,
        role: "customer",
        name: fullName,
      });
      if (res?.status == 200) {
        messageApi.success("Signup successfully!");
        reset();
      } else {
        messageApi.error("Signup failed!");
      }
    } catch (err) {
      const msg =
        err.response.status == 402
          ? err.response.data.data.msg
          : "Signup failed!";
      messageApi.error(msg);
    }
  };
  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    contextHolder,
  };
};
