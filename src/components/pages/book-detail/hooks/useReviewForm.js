import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useAuthentication } from "store/useAuthentication";
import { formatDate } from "utils";
import toast from "react-hot-toast";

export const useReviewForm = (bookid) => {
  const [stars, setStars] = useState(5);
  const { user } = useAuthentication();
  const schema = yup.object({
    review: yup.string().required("Review is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const res = await axios.post("http://localhost:8080/api/comment/save", {
      bookid: bookid,
      userid: user.id,
      rate: stars,
      content: data.review,
      timeup: formatDate(new Date()),
    });
    toast.success("Upload comment success!");
    setTimeout(() => {
      location.reload();
    }, [2000]);
    // console.log(res.data);
  };
  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    setStars,
  };
};
