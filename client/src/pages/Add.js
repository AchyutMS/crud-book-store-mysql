import React, { useState } from "react";
import axios from "axios";

import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

function Add() {
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    price: null,
    description: "",
  });

  let handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/books", book);
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
        <form onSubmit={handleAddBook}>
          <div className="row">
            <div className="col-25">
              <label for="fname">Title</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                name="title"
                placeholder="Enter Book Title"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-25">
              <label for="fname">Price</label>
            </div>
            <div className="col-75">
              <input
                type="number"
                name="price"
                placeholder="Enter Book Price"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-25">
              <label for="fname">Description</label>
            </div>
            <div className="col-75">
              <input
                type="textarea"
                name="description"
                placeholder="Enter Book Description"
                onChange={handleChange}
              />
            </div>
          </div>

          <input type="submit" value="Add" />
        </form>
      </div>
    </>
  );
}

export default Add;
