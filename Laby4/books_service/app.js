const express = require("express");
const jwt = require("jsonwebtoken");
const sequelize = require("./database");
const Book = require("./models/Book");

const JWT_SECRET = "super_secret_key_lab4";

const app = express();
app.use(express.json());

// JWT MIDDLEWARE
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Brak tokenu" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Nieprawidłowy token" });
    }

    req.user = user;
    next();
  });
}

//ENDPOINTY PUBLICZNE (GET)

// lista książek
app.get("/api/books", async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
});

// jedna książka
app.get("/api/books/:bookId", async (req, res) => {
  const book = await Book.findByPk(req.params.bookId);

  if (!book) {
    return res.status(404).json({ message: "Nie znaleziono książki" });
  }

  res.json(book);
});

//ENDPOINTY CHRONIONE (JWT)

// dodanie książki
app.post("/api/books", authenticateToken, async (req, res) => {
  const { title, author, year } = req.body;

  const book = await Book.create({ title, author, year });
  res.json({ id: book.id });
});

// usuwanie książki
app.delete("/api/books/:bookId", authenticateToken, async (req, res) => {
  const book = await Book.findByPk(req.params.bookId);

  if (!book) {
    return res.status(404).json({ message: "Nie znaleziono książki" });
  }

  await book.destroy();
  res.json({ message: "Książka usunięta" });
});

//START SERWERA
sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Books service działa na porcie 3001");
  });
});
