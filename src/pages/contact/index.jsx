import FormItem from "components/FormItem/FormItem";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required").email("Invalid email"),
  message: yup.string().required("Message is required"),
});
function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="contact-page">
      <div className="page-title">
        <h1>Contact</h1>
      </div>
      <div className="contact-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h1>We would love to hear from you</h1>
            <p className="desc mg-20">
              Your email address will not be published. Required fields are
              marked *
            </p>
          </div>
          <FormItem
            placeholder="Name*"
            name="name"
            register={register}
            error={errors.name}
          />
          <FormItem
            placeholder="Email*"
            name="email"
            register={register}
            error={errors.email}
          />
          <div>
            <textarea
              rows={5}
              className="input-item white"
              placeholder="Message"
              {...register("message")}
            />
            {errors.message && (
              <p className="error-text">{errors.message?.message}</p>
            )}
          </div>
          <button className="app-button w-max-content">Submit </button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
