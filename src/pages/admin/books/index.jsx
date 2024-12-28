import { Table, message, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AllBook() {
  const [messageApi, contextHolder] = message.useMessage();
  const [bookList, setProductList] = useState([]);
  const handleDelete = async (id) => {
    const res = await axios.post(`http://localhost:8080/api/book/delete/${id}`);
    console.log(res);
    if (res.data == "200") {
      message.success("Delete success!");
    } else {
      message.error("Delete failed!");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get("http://localhost:8080/api/books");
      setProductList(data.data);
    };
    fetchData();
  }, []);
  const bookColumn = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (val, record, index) => index + 1,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Stars",
      dataIndex: "stars",
      key: "stars",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        const user = JSON.parse(localStorage.getItem("bookory-user"));

        if (user?.isLogin)
          return (
            <div className="column-action">
              <Link
                to={`/admin/book/${record.id}`}
                className="column-action-btn"
              >
                View
              </Link>
              <Popconfirm
                title="Delete this book"
                description="Are you sure to delete this book?"
                onConfirm={() => {
                  handleDelete(record.id);
                }}
                onCancel={() => {
                  messageApi.info("Cancel delete");
                }}
                okText="Yes"
                cancelText="No"
              >
                <span className="column-action-btn delete">Delete</span>
              </Popconfirm>
            </div>
          );
        return "";
      },
    },
  ];
  return (
    <div className="all-book">
      {contextHolder}
      <h1>All Books</h1>
      <Table columns={bookColumn} dataSource={bookList} />
      <Link to="/admin/book/-1" className="app-button">
        <span>Add Book</span>
      </Link>
    </div>
  );
}

export default AllBook;
