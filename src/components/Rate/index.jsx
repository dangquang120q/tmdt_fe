import StarIcon from "resources/svg/Star";
import StarOutlineIcon from "resources/svg/StarOutline";

const Rate = ({ value = 0, count = 5, showValue = false, size = 24 }) => {
  return (
    <div className="romand-rate">
      <div className="star-wrapper" style={{ gap: size / 2 }}>
        {Array.from({ length: count }, (_, i) =>
          i < Math.round(value) ? 1 : 0
        ).map((item, index) =>
          item == 1 ? (
            <StarIcon width={size} height={size} key={index} />
          ) : (
            <StarOutlineIcon width={size} height={size} key={index} />
          )
        )}
      </div>
      {showValue && <b className="value">{value}</b>}
    </div>
  );
};
export default Rate;
