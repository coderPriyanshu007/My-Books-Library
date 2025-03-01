import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pool from "./db/db.js"; // ✅ Import database connection

const app = express();
const port = 3000;

// Middlewares
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Fetches the cover with ISBN and returns the URL, fallback image on error
async function getCover(isbn) {
  try {
    const coverUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg?default=false`;
    const response = await axios.get(coverUrl);
    return response.config.url;
  } catch (error) {
    console.error("Error fetching book cover:", error.message);
    return "/assets/images/fallback.png";
  }
}

const modifyBook = async (book) => {
  return {
    ...book, 
    cover: await getCover(book.isbn), // ✅ Fetch book cover
  };
};

// Store books

let edit = false;

// Home Route - Fetch all books
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT *,date::TEXT FROM books");
    let books = result.rows;

    if (books.length) {
      books = await Promise.all(
        books.map(async (book) => {
          return await modifyBook(book);
        })
      );
    }

    res.render("index.ejs", { books:books });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get Book Details
app.get("/books/:isbn", async (req, res) => {
  const isbn = req.params.isbn;
  try {
    const result = await pool.query("SELECT *,date::TEXT FROM books WHERE isbn = $1", [isbn]);
    let book = result.rows[0];
    book = await modifyBook(book);

    console.log(book);
    res.render("notes.ejs", book);
  } catch (error) {
    console.error(error.message);
  }
});

// Add Book Page
app.get("/add-book", (req, res) => {
  edit = false;
  res.render("addBook.ejs", { edit });
});

// Edit Book Page
app.get("/edit-book/:isbn", async (req, res) => {
  edit = req.query.edit === "true";
  try {
    const result = await pool.query("SELECT *,date::TEXT FROM books WHERE isbn = $1", [
      req.params.isbn,
    ]);
    let book = result.rows[0];
    book = await modifyBook(book);
    console.log(book);
    res.render("addBook.ejs", { book, edit });
  } catch (error) {
    console.error(error.message);
  }
});

// Add or Edit Book
app.post("/add-book", async (req, res) => {
  const book = [
    req.body.title,
    req.body.author,
    req.body.isbn.trim(),
    req.body.about,
    req.body.notes,
    req.body.rating,
    req.body.date,
  ];

  const insertQuery =
    "INSERT INTO books(title, author, isbn, intro, notes, rating, date) VALUES ($1, $2, $3, $4, $5, $6, $7)";
  const updateQuery =
    "UPDATE books SET title = $1, author = $2, isbn = $3, intro = $4, notes = $5, rating = $6, date = $7 WHERE isbn = $8";

  try {
    await pool.query(
      edit ? updateQuery : insertQuery,
      edit ? [...book, req.body.isbn] : book
    );
    edit ? res.redirect(`/books/${req.body.isbn}`) : res.redirect("/");
  } catch (err) {
    console.error("Error inserting/updating book:", err);

    if (err.code === "23505") {
      return res
        .status(400)
        .json({ error: "Book with this ISBN already exists" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server listening at: http://localhost:${port}`);
});
