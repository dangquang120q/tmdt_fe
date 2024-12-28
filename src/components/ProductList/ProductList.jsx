import { Col, Row } from "antd";
import ProductItem from "../ProductItem/ProductItem";

function ProductList({ col = 2, bookList = [0, 1, 2, 3], noFlex = false }) {
  const padding = col == 1 ? "0" : "";
  const lastRow = (bookList.length / col - 1) * col;

  return (
    <Row className="product-list">
      {bookList.map((item, id) => (
        <Col span={24 / col} className="product-list_item" key={id}>
          <ProductItem noFlex={noFlex} item={item} />
        </Col>
      ))}
    </Row>
  );
}

export default ProductList;
