import axios from "axios";
import { useEffect, useState } from "react";

const getBook = async (slug) => {
  const resolve = await axios.get(
    `http://localhost:8080/api/book-detail/${slug}`
  );
  const book = resolve.data;
  return book;
};
export const useGetBookDetail = (slug) => {
  const [book, setBook] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const data = await getBook(slug);
      setBook(data);
    };
    fetchData();
  }, []);
  return {
    book,
  };
};
