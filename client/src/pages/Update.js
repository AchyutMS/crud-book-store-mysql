import React, { useState } from "react";
import axios from "axios";

import Layout from "../components/Layout";
import { useNavigate, useLocation } from "react-router-dom";

function Update() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: state.book.title,
    price: state.book.price,
    description: state.book.description,
  });

  let handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateBook = async (e) => {
    e.preventDefault();
    console.log(book);
    try {
      const response = await axios.put(
        `http://localhost:5000/books/${state.book.id}`,
        book
      );
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout />
      <div className="container">
        <form onSubmit={handleUpdateBook}>
          <div className="row">
            <div className="col-25">
              <label>Title</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                name="title"
                value={book.title}
                placeholder="Enter Book Title"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-25">
              <label>Price</label>
            </div>
            <div className="col-75">
              <input
                type="number"
                name="price"
                value={book.price}
                placeholder="Enter Book Price"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-25">
              <label>Description</label>
            </div>
            <div className="col-75">
              <input
                type="textarea"
                name="description"
                value={book.description}
                placeholder="Enter Book Description"
                onChange={handleChange}
              />
            </div>
          </div>

          <input
            type="submit"
            value="Update"
            style={{ backgroundColor: "blueviolet" }}
          />
        </form>
      </div>
    </>
  );
}

export default Update;
