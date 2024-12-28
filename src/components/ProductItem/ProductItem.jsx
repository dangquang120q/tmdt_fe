import { Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { generateSlug, round } from "utils";
import Rate from "../Rate";

function ProductItem({ className = "", noFlex = false, item }) {
  const navigate = useNavigate();
  const goToProductDetail = () => {
    closeSearch();
    const slug = generateSlug(item.name);
    navigate(`/product/${slug}/${encodeURIComponent(item.lineId)}`);
  };
  const closeSearch = () => {
    const search = document.querySelector(".header-search-container");
    const main = document.querySelector(".public-layout-content");
    search.style.display = "none";
    main.style.display = "block";
  };

  const toggleOptions = () => {
    const slide = document.querySelector(".product-options");
    if (slide.classList.contains("cc-start")) {
      slide.classList.remove("cc-start");
      slide.classList.add("cc-end");
    } else {
      slide.classList.remove("cc-end");
      slide.classList.add("cc-start");
    }
  };
  const listImg = [
    ...item.images,
    ...item.options.map((option) => ({
      id: option.id,
      image: option.image,
    })),
  ];

  return (
    <div className={`product-item ${className} ${noFlex ? "no-flex" : ""}`}>
      <div className="product-item_img" onClick={goToProductDetail}>
        <img src={listImg[0].image} alt="" className="thumb" />
        <Tag className="product-tag">New in</Tag>
      </div>
      <div className="product-item_info">
        <p className="title" onClick={goToProductDetail}>
          {item?.name}
        </p>
        <div>
          <Rate value={item?.rate} showValue size={12} />
        </div>
        <div className="product-item_price-options">
          <div className="product-options cc-start">
            <div className="product-options_inner">
              <div className="product-options_slide">
                {item.options.map((item) => (
                  <div className="product-options_item" key={item.id}>
                    <img src={item.featureImage} alt="" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="price">${round(item?.defaultPrice, 2)} USD</p>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
