import axios from "axios";
import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ROUTE_URL } from "routes";
import { yupResolver } from "@hookform/resolvers/yup";
import { formatDate } from "utils";
import toast from "react-hot-toast";

export const useEditBook = (id) => {
  const navigate = useNavigate();
  const [bookCover, setbookCover] = useState("");
  const [category, setCategory] = useState("Comedy");
  const [image, setImage] = useState("");
  const schema = yup.object({
    title: yup.string().required("Title is required"),
    author: yup.string().required("Author is required"),
    description: yup.string(),
    price: yup.number().required("Price is required"),
    release: yup.date(),
    pages: yup.number(),
  });
  // Get book
  const getBook = async (id) => {
    if (id != -1) {
      const book = await axios.get(`http://localhost:8080/api/book/${id}`);
      setCategory(book.data.category);
      setbookCover(`http://localhost:8080/api/image/${book.data.slug}`);
      return book.data;
    }
    return {};
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: async () => getBook(id),
  });

  // Submit form
  const onSubmit = async (data) => {
    data.release = formatDate(data.release);
    console.log({ ...data, cover: image, category: category });
    if (id == -1) {
      handleAddBook(data, "http://localhost:8080/api/book/save");
    } else {
      console.log("Update");
      handleAddBook(data, `http://localhost:8080/api/book/update/${id}`);
    }
  };
  const handleAddBook = async (data, api) => {
    const res = await axios.post(api, {
      ...data,
      category: category,
    });
    console.log(res.data);
    if (res.data != 408 && res.data != 404) {
      if (image) {
        await uploadCover(res.data);
      }
      alert("Success !");
      navigate(ROUTE_URL.ADMIN_BOOKS);
    } else {
      toast.error("Book is exits!");
    }
  };
  // Upload book cover
  const uploadCover = async (slug) => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("slug", slug);
    const res = await fetch("http://localhost:8080/api/image", {
      method: "POST",
      body: formData,
    });
    const data = await res.text();
    console.log(data);
  };

  // Handle change category and image
  const handleChangeCategory = (e) => {
    setCategory(e);
  };
  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
    setbookCover(URL.createObjectURL(e.target.files[0]));
  };
  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    category,
    handleChangeCategory,
    image,
    handleChangeImage,
    bookCover,
  };
};
