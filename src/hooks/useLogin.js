import { yupResolver } from "@hookform/resolvers/yup";
import showMessage from "components/Message";
import { CartContext } from "context/CartContext";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { userService } from "services/user";
import { useAuthentication } from "store/useAuthentication";
import * as yup from "yup";
import { REGEX_PASSWORD } from "constant";

export const useLogin = (closeModal) => {
  const { login } = useAuthentication();
  const { fetchData } = useContext(CartContext);
  const schema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup
      .string()
      .required("Password is required")
      .matches(REGEX_PASSWORD, {
        message:
          "Password must contain at least 8 characters, 1 letter and 1 number",
      }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const res = await userService.login(data);
    try {
      if (res.status == 200) {
        const user = res.data.data;
        login({ ...user, fullName: user.name });
        fetchData(user.id);
        closeModal();
      } else {
        setError("password", { message: "Wrong password or email!" });
      }
    } catch (error) {
      const msg =
        err.response.status == 401
          ? err.response.data.data.msg
          : "Login failed!";
      showMessage("error", msg);
    }
  };
  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
