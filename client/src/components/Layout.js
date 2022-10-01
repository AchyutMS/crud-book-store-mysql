import React from "react";
import { useNavigate } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();
  return (
    <>
      <h1 className="title" onClick={() => navigate("/")}>
        CRUD BOOK STORE
      </h1>
    </>
  );
}

export default Layout;
