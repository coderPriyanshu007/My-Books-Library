import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import axios from "axios";

const app = express();
const port = 3000;

//db setup
const db = new pg.Client({
  user: "postgres",
  database: "my library",
  host: "localhost",
  password: "kandari007",
  port: 5432,
});

db.connect();

//middlewares
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//fetches the cover with isbn and return the url for the cover image, in case of any error returns fallback image 
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

let books = []; // store the books
let edit = false;

//home
app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM books");
    books = result.rows;
    if (books.length) {
      books = await Promise.all(
        books.map(async (book) => {
          const isbn = book.isbn;
          return {
            ...book,
            date: book.date.toISOString().split("T")[0], // ✅ Modify date t return only date and trim time stamp
            cover: await getCover(isbn), // ✅ wait for coverURL
          };
        })
      );
    } else {
      console.error("Books not found");
    }
    res.render("index.ejs", { books: books });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});



app.get("/books/:id/:isbn", (req, res) => {
  const book = books.find((book) => book.id == req.params.id);
  res.render("notes.ejs", { book: book });
});



app.get("/add-book", async (req, res) => {
  edit = false; //when ever add-book route hit sets edit to false
  res.render("addBook.ejs", { edit: false }); // edit determines weather user is editing or adding
});




app.get("/edit-book/:isbn", (req, res) => {
  const book = books.find((book) => book.isbn == req.params.isbn); //find requested book using isbn
  edit = req.query.edit === "true"; // if request contains query ?edit=true  sets value of edit to true
  res.render("addBook.ejs", { book: book, edit: edit });
});



app.post("/add-book", (req, res) => {
  // same post route for adding and editing book
  const book = [
    req.body.title,
    req.body.author,
    req.body.isbn.trim(),
    req.body.about,
    req.body.notes,
    req.body.rating,
    req.body.date,
  ];
  const insert =
    "INSERT INTO books(title,author,isbn,intro,notes,rating,date) VALUES ($1,$2,$3,$4,$5,$6,$7)"; // for adding
  const update =
    "UPDATE books SET title = $1,author = $2, isbn = $3, intro = $4, notes = $5, rating = $6, date = $7 WHERE isbn = $8"; // sql query for editing

  db.query(
    edit ? update : insert, //sql query update or insert according to value of edit
    edit ? [...book, book[2]] : book, // values
    (err, result) => {
      if (err) {
        console.error("Error inserting book:", err);

        if (err.code === "23505") {
          //catch error if book already exist
          return res
            .status(400)
            .json({ error: "Book with this ISBN already exists" });
        }

        return res.status(500).json({ error: "Internal Server Error" });
      }

      res.redirect("/");
    }
  );
});

app.listen(port, () => {
  console.log(`server listening on  : http://localhost:${port}`);
});
