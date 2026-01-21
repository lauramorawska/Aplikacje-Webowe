const express = require("express");
const jwt = require("jsonwebtoken");
const sequelize = require("./database");
const Order = require("./models/Order");

const JWT_SECRET = "super_secret_key_lab4";

const app = express();
app.use(express.json());

//JWT MIDDLEWARE

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

//SPRAWDZENIE bookId
async function checkBookExists(bookId) {
  const response = await fetch(`http://localhost:3001/api/books/${bookId}`);

  return response.ok;
}

//ENDPOINTY

// GET – zamówienia użytkownika (publiczne)
app.get("/api/orders/:userId", async (req, res) => {
  const orders = await Order.findAll({
    where: { userId: req.params.userId },
  });

  res.json(orders);
});

// POST – dodanie zamówienia (JWT + Books)
app.post("/api/orders", authenticateToken, async (req, res) => {
  const { userId, bookId, quantity } = req.body;

  const bookExists = await checkBookExists(bookId);
  if (!bookExists) {
    return res.status(400).json({ message: "Książka nie istnieje" });
  }

  const order = await Order.create({ userId, bookId, quantity });
  res.json({ id: order.id });
});

// DELETE – usuwanie zamówienia (JWT)
app.delete("/api/orders/:orderId", authenticateToken, async (req, res) => {
  const order = await Order.findByPk(req.params.orderId);

  if (!order) {
    return res.status(404).json({ message: "Nie znaleziono zamówienia" });
  }

  await order.destroy();
  res.json({ message: "Zamówienie usunięte" });
});

// PATCH – aktualizacja zamówienia (JWT)
app.patch("/api/orders/:orderId", authenticateToken, async (req, res) => {
  const order = await Order.findByPk(req.params.orderId);

  if (!order) {
    return res.status(404).json({ message: "Nie znaleziono zamówienia" });
  }

  if (req.body.quantity) {
    order.quantity = req.body.quantity;
    await order.save();
  }

  res.json(order);
});

//START SERWERA
sequelize.sync().then(() => {
  app.listen(3002, () => {
    console.log("Orders service działa na porcie 3002");
  });
});
