import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

function FormItem({ placeholder, error, name, register, label, ...props }) {
  const [show, setShow] = useState(false);
  const showPassword = () => {
    setShow(true);
  };
  const hidePassword = () => {
    setShow(false);
  };

  return (
    <div className="form-item">
      {label && (
        <label htmlFor={name} className="label">
          {label}
        </label>
      )}
      {props.type == "password" ? (
        <div className="input-password">
          <input
            type={show ? "text" : "password"}
            className="input-item white"
            {...register(name)}
          />
          {show ? (
            <IoEyeOffOutline className="icon" onClick={hidePassword} />
          ) : (
            <IoEyeOutline className="icon" onClick={showPassword} />
          )}
        </div>
      ) : (
        <input
          className="input-item white"
          placeholder={placeholder}
          {...register(name)}
          {...props}
        />
      )}
      {error && <p className="error-text">{error?.message}</p>}
    </div>
  );
}

export default FormItem;
