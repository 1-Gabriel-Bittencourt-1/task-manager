const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")

const app = express();
app.use(cors()));

// Banco de usuários em memória
let users = [
  { id: 1, username: "TheChosenOne", password: "011105" }
  { id: 2, username: "CaioEscolhido", password: "GCG2000" }
];

// Registrar novo usuário
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: "Usuário já existe" });
  }

  const newUser = {
    id: Date.now(),
    username,
    password
  };
  users.push(newUser);
  res.json({ message: "Usuário registrado com sucesso", user: newUser });
});

// Login de usuário
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Usuário ou senha inválidos" });
  }

  res.json({ message: "Login bem-sucedido", user });
});

// Rodar servidor
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});