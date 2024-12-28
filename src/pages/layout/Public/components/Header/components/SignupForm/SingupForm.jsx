import FormItem from "components/FormItem/FormItem";
import { useSignup } from "hooks/useSignup";

function SignupForm() {
  const { register, handleSubmit, errors, onSubmit, contextHolder } =
    useSignup();
  return (
    <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
      {contextHolder}
      <FormItem
        label="Username*"
        name="username"
        register={register}
        error={errors.username}
      />
      <FormItem
        label="Fullname*"
        name="fullName"
        register={register}
        error={errors.fullName}
      />
      <FormItem
        label="Email*"
        name="email"
        register={register}
        error={errors.email}
      />
      <FormItem
        label="Phone number*"
        name="phone"
        register={register}
        error={errors.phone}
      />
      <div className="form-item gender">
        <label htmlFor="gender" className="label">
          Gender:
        </label>
        <div className="gender-option">
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            {...register("gender")}
          />
          <label for="male">Male</label>
        </div>
        <div className="gender-option">
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            {...register("gender")}
          />
          <label for="femal">Female</label>
        </div>
        <div className="gender-option">
          <input
            type="radio"
            id="other"
            name="gender"
            value="other"
            {...register("gender")}
          />
          <label for="other">Other</label>
        </div>
      </div>
      <p className="error-text">{errors.gender?.message}</p>
      <FormItem
        label="Password*"
        name="password"
        register={register}
        error={errors.password}
        type="password"
      />
      <FormItem
        label="Confirm password*"
        name="confirm"
        register={register}
        error={errors.confirm}
        type="password"
      />

      <button className="app-button">Created</button>
    </form>
  );
}

export default SignupForm;
