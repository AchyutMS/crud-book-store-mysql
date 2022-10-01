import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";

function Books() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  const fetchAllBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/books");
      setBooks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      console.log(id);
      await axios.delete(`http://localhost:5000/books/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllBooks();
  }, []);

  console.log(books);
  return (
    <>
      <Layout />
      <section class="products">
        {books &&
          books.map((book) => (
            <div className="product-card" key={book.id}>
              <div className="product-image">
                <img
                  src="https://png.pngtree.com/png-clipart/20200709/original/pngtree-green-cover-design-template-png-image_3643599.jpg"
                  alt="book cover"
                />
              </div>
              <div className="product-info">
                <h5>{book.title}</h5>
                <h6>Rs.{book.price}</h6>
              </div>
              <button
                className="update-btn"
                onClick={() => navigate("/update", { state: { book: book } })}
              >
                Update
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDeleteBook(book.id)}
              >
                Delete
              </button>
            </div>
          ))}
      </section>
      <footer className="footer" onClick={() => navigate("/add")}>
        <p>Add New Book</p>
      </footer>
    </>
  );
}

export default Books;
