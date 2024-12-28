import { useEffect, useState } from "react";

export const useAddToCart = (item) => {
  const [value, setValue] = useState(1);
  const increaseValue = () => {
    setValue((prev) => prev + 1);
  };
  const decreaseValue = () => {
    if (value > 1) setValue((prev) => prev - 1);
  };

  const changeValue = (e) => {
    const number = +e.target.value;
    if (number > 0) {
      setValue(number);
    } else {
      setValue("");
    }
  };

  const onBlur = () => {
    if (!value) {
      setValue(1);
    }
  };
  return {
    value,
    changeValue,
    increaseValue,
    decreaseValue,
    onBlur,
  };
};
