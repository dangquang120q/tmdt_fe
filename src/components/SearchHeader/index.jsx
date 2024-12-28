import { useState, useCallback, useEffect } from "react";
import { useDebounce } from "hooks/useDebounce";
import { productService } from "services/product";
import { Empty, Input } from "antd";
import ProductList from "../ProductList/ProductList";
import SearchIcon from "resources/svg/Search";

const SearchHeader = () => {
  const [dataSource, setDataSource] = useState([]);
  const [key, setKey] = useState("");
  const debounceKey = useDebounce(key);
  const handleSearch = useCallback(async () => {
    if (debounceKey) {
      const data = await productService.searchProduct({ name: debounceKey });
      setDataSource(data);
    } else {
      setDataSource([]);
    }
  }, [debounceKey]);
  useEffect(() => {
    handleSearch();
  }, [debounceKey, handleSearch]);

  const onChange = (value) => {
    setKey(value);
  };
  const closeSearch = () => {
    const search = document.querySelector(".header-search-container");
    const main = document.querySelector(".public-layout-content");
    search.style.display = "none";
    main.style.display = "block";
  };

  return (
    <div
      className="header-search-container main-container"
      style={{ display: "none" }}
    >
      <div className="input-container">
        <Input
          allowClear
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
        <SearchIcon />
        <span className="close-btn" onClick={closeSearch}>
          Close
        </span>
      </div>
      {debounceKey && (
        <div className="total-result">We found {dataSource.length} results</div>
      )}
      {dataSource.length > 0 ? (
        <ProductList col={4} bookList={dataSource} noFlex />
      ) : (
        debounceKey && (
          <Empty
            description={`Your search for ${debounceKey} did not yield any results.`}
          />
        )
      )}
    </div>
  );
};

export default SearchHeader;
