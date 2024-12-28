import { useParams, Link } from "react-router-dom";
import FormItem from "components/FormItem/FormItem";
import { useEditBook } from "../hooks/useEditBook";
import { Empty, Select } from "antd";
import { categories } from "constant";
import { useEffect, useState } from "react";
import { ROUTE_URL } from "routes";
import { BsChevronLeft } from "react-icons/bs";

function ViewBook() {
  const { id } = useParams();
  const [edit, setEdit] = useState(false);
  const {
    bookCover,
    register,
    handleSubmit,
    errors,
    onSubmit,
    category,
    handleChangeCategory,
    handleChangeImage,
  } = useEditBook(id);
  const options = categories.map((item) => {
    return {
      label: item.name,
      value: item.name,
    };
  });
  useEffect(() => {}, [bookCover, category]);

  return (
    <div className={`view-book ${!edit && id != -1 ? "disable" : ""}`}>
      <div className="book-info">
        <form className="book-info-text" onSubmit={handleSubmit(onSubmit)}>
          <Link to={ROUTE_URL.ADMIN_BOOKS} className="back-btn">
            <BsChevronLeft />
            <p>Back</p>
          </Link>
          <h1>{id == -1 ? "New Book" : `Book ${id}`}</h1>
          <FormItem
            label="Title"
            register={register}
            error={errors.title}
            name="title"
          />
          <FormItem
            label="Author"
            register={register}
            error={errors.author}
            name="author"
          />
          <div>
            <label htmlFor="">Description</label>
            <textarea
              rows={5}
              className="input-item white"
              {...register("description")}
            />
            {errors.description && (
              <p className="error-text">{errors.description?.description}</p>
            )}
          </div>
          <div className="d-flex gap-20">
            <FormItem
              label="Price"
              register={register}
              error={errors.price}
              type="text"
              name="price"
            />
            <FormItem
              label="Release"
              register={register}
              error={errors.release}
              type="date"
              name="release"
            />
          </div>
          <div className="d-flex gap-20 align-items-center">
            <FormItem
              label="Pages"
              register={register}
              error={errors.pages}
              type="number"
              name="pages"
            />
            <Select
              onChange={handleChangeCategory}
              options={options}
              value={category}
              style={{ width: 200 }}
            />
          </div>
          <div className="d-flex justify-content-center">
            {edit == false && id != -1 ? (
              <div className="app-button" onClick={() => setEdit(true)}>
                Edit Book
              </div>
            ) : (
              <button className="app-button" type="submit">
                {id == -1 ? "Add Book" : "Save Book"}
              </button>
            )}
          </div>
        </form>
        <div className="book-cover">
          <label htmlFor="cover" className="app-button">
            Upload
          </label>
          <input type="file" id="cover" onChange={handleChangeImage} />
          <div className="book-cover-image">
            {bookCover ? <img src={bookCover} /> : <Empty />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewBook;
