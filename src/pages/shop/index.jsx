import { Empty } from "antd";
import ProductList from "components/ProductList/ProductList";
import { item } from "constant/fakeData";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { productService } from "services/product";
import { Loader } from "resources/svg/Loader";

function ShopPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await productService.getListByCatagory({
          category: category || "",
        });
        if (res.status == 200) {
          setProducts(res.data.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [category]);
  return (
    <div className="shop-page">
      <div className="filter">
        <div className="filter-title">
          <HiOutlineAdjustmentsHorizontal />
          <p>Filter</p>
        </div>
      </div>
      <div className="book-container">
        {isLoading ? (
          <Loader />
        ) : products.length > 0 ? (
          <ProductList col={4} bookList={products} noFlex />
        ) : (
          <Empty description="No product" />
        )}
      </div>
    </div>
  );
}

export default ShopPage;
