const express = require("express");
const sequelize = require("./database");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

// tajny klucz JWT
const JWT_SECRET = "super_secret_key_lab4";

//POST /api/register
//Rejestracja użytkownika
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;

  // 1. walidacja
  if (!email || !password) {
    return res.status(400).json({ message: "Brak email lub hasła" });
  }

  // 2. sprawdzenie czy użytkownik istnieje
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: "Użytkownik już istnieje" });
  }

  // 3. hashowanie hasła
  const hashedPassword = await bcrypt.hash(password, 10);

  // 4. zapis do bazy
  const user = await User.create({
    email,
    password: hashedPassword,
  });

  // 5. odpowiedź
  res.json({ id: user.id });
});

//POST /api/login
//Logowanie + JWT
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  // 1. sprawdzenie danych
  if (!email || !password) {
    return res.status(400).json({ message: "Brak email lub hasła" });
  }

  // 2. znalezienie użytkownika
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: "Nieprawidłowe dane logowania" });
  }

  // 3. porównanie hasła
  const passwordCorrect = await bcrypt.compare(password, user.password);
  if (!passwordCorrect) {
    return res.status(401).json({ message: "Nieprawidłowe dane logowania" });
  }

  // 4. generowanie JWT
  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  // 5. odpowiedź
  res.json({ token });
});

sequelize.sync().then(() => {
  app.listen(3003, () => {
    console.log("Users service działa na porcie 3003");
  });
});
