import FormItem from "components/FormItem/FormItem";
import { useLogin } from "hooks/useLogin";

function LoginForm({ onCloseModal }) {
  const { register, handleSubmit, errors, onSubmit } = useLogin(onCloseModal);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormItem
        label="Username*"
        name="username"
        register={register}
        error={errors.username}
      />
      <FormItem
        label="Password*"
        name="password"
        register={register}
        error={errors.password}
        type="password"
      />
      <button className="app-button" type="submit">
        Login
      </button>
    </form>
  );
}

export default LoginForm;
