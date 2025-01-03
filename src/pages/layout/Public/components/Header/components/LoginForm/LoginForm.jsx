import FormItem from "components/FormItem/FormItem";
import { useLogin } from "hooks/useLogin";

function LoginForm({ onCloseModal }) {
  const { register, handleSubmit, errors, onSubmit } = useLogin(onCloseModal);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormItem
        label="Tên đăng nhập*"
        name="username"
        register={register}
        error={errors.username}
      />
      <FormItem
        label="Mật khẩu*"
        name="password"
        register={register}
        error={errors.password}
        type="password"
      />
      <button className="app-button" type="submit">
        Đăng nhập
      </button>
    </form>
  );
}

export default LoginForm;
