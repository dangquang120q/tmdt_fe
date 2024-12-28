import ProductList from "components/ProductList/ProductList";
import { item } from "constant/fakeData";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTE_URL } from "routes";
import { productService } from "services/product";

function BestSellers() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await productService.getListByCatagory({
          category: "",
        });
        if (res.status == 200) {
          setProducts(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="best-sellers">
      <div className="product-list-block">
        <div className="product-list-heading-block">
          <Link to={ROUTE_URL.SHOP}>All products</Link>
        </div>
        <div className="product-list_items">
          <ProductList col={4} bookList={products.slice(0, 4)} />
        </div>
      </div>
      <div className="product-list-block">
        <div className="product-list-heading-block">
          <Link to={ROUTE_URL.SHOP}>New Arrivals</Link>
        </div>
        <div className="product-list_items">
          <ProductList
            col={4}
            bookList={products.slice(products.length - 4, products.length)}
          />
        </div>
      </div>
    </div>
  );
}

export default BestSellers;
