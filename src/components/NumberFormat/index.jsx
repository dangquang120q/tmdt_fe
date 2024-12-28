import { NumericFormat } from "react-number-format";

const NumberFormat = ({ value, decimalScale = 2, prefix }) => {
  return (
    <NumericFormat
      thousandSeparator
      displayType="text"
      decimalScale={decimalScale}
      value={value}
      prefix={prefix}
    />
  );
};

export default NumberFormat;
