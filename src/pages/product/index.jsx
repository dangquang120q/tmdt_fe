import { Divider } from "antd";
import Rate from "components/Rate";
import AddToCart from "components/pages/book-detail/components/AddToCart/AddToCart";
import Comments from "components/pages/book-detail/components/Comments/Comments";
import ImageSlide from "components/pages/book-detail/components/ImageSlide";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "resources/svg/Loader";
import { productService } from "services/product";
import { round } from "utils";

function ProductDetail() {
  const { slug, id } = useParams();
  const [product, setProduct] = useState({
    images: [],
    options: [],
  });

  // console.log(product);
  const [selectedOption, setSelectedOption] = useState({
    id: "",
    name: "",
    price: "",
    quantity: "",
    featureImage: "",
    image: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await productService.getProduct({ id });
        if (res.status == 200) {
          const data = res.data.data;
          const options = data.options.map((item) => ({
            ...item,
            name: item.optionName,
          }));
          setProduct({ ...data, options });
        }
      } catch (error) {
        history.back();
      }
    };

    fetchData();
  }, [slug, id]);
  const listImg = [
    ...product.images,
    ...product.options.map((option) => ({
      id: option.id,
      image: option.image,
    })),
  ];
  const totalAvailable = useMemo(() => {
    const total = product.options.reduce((res, item) => item.quantity + res, 0);
    return total;
  }, [product]);
  return product.lineId ? (
    <div className="product-detail">
      <div className="product-detail-content">
        <div className="product-detail_image">
          <ImageSlide listImg={listImg} selectedOption={selectedOption} />
        </div>
        <div className="product-detail-information">
          <h1 className="title">{product.name}</h1>
          <h2 className="price">
            $ {round(selectedOption.price || product.defaultPrice, 2)} USD
          </h2>
          <div className="rate" style={{ display: "flex", gap: 20 }}>
            <Rate value={Math.round(product?.rate * 10) / 10} />
            <span className="ant-rate-text">
              {Math.round(product?.rate * 10) / 10}
            </span>
          </div>
          <Divider />
          <div className="product-options">
            <p className="product-options_name">
              <b>{product.variantName}</b>: {selectedOption.name}
            </p>
            <div className="product-options_items">
              {product.options.map((item) => (
                <div
                  className={`product-options_item ${
                    selectedOption.id == item.id ? "active" : ""
                  }`}
                  key={item.id}
                  onClick={() => {
                    setSelectedOption(item);
                  }}
                >
                  <img src={item.featureImage} alt="" />
                </div>
              ))}
            </div>
          </div>
          <div className="quantity">
            <p>Quantity</p>
            <AddToCart item={selectedOption} totalQty={totalAvailable} />
          </div>
          <div className="description-container">
            <h1>Description</h1>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
      <div id="#comment">
        <Comments bookid={product.lineId} />
      </div>
    </div>
  ) : (
    <Loader />
  );
}

export default ProductDetail;
