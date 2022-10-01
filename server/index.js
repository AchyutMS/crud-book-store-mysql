import express from "express";
import mysql from "mysql2";
import cors from "cors";
const app = express();

// Enter your MySQL database credentials below
const db = mysql.createConnection({
  host: "",     //localhost
  user: "",     //username
  password: "", //password
  database: "", //database name
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("Hello from the server :)"));

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (error, result) => {
    if (error) {
      return res.json(error);
    }
    return res.json(result);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`,`description`,`price`) VALUES (?)";
  const values = [req.body.title, req.body.description, req.body.price];

  db.query(q, [values], (error, result) => {
    if (error) {
      return res.json(error);
    }
    return res.json("New Book Added Successfully");
  });
});

app.delete("/books/:id", (req, res) => {
  const q = "DELETE FROM books WHERE id = ?";
  const bookId = req.params.id;
  db.query(q, [bookId], (error, result) => {
    if (error) {
      return res.json(error);
    }
    return res.json("Book Deleted Successfully");
  });
});

app.put("/books/:id", (req, res) => {
  const q =
    "UPDATE books SET `title`=?, `price`=?,`description`=? WHERE id = ?";
  const bookId = req.params.id;
  const values = [req.body.title, req.body.price, req.body.description];

  db.query(q, [...values, bookId], (error, result) => {
    if (error) {
      return res.json(error);
    }
    return res.json("Book Updated Successfully");
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log("listening on port " + PORT));
