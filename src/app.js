const express = require("express");
const cors = require("cors");

const testRoutes = require("./routes/testRoutes");
const authRoutes = require("./routes/authRoutes");
const titleRoutes = require("./routes/titleRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const contentRoutes = require("./routes/conteudoRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/test", testRoutes);
app.use("/auth", authRoutes);
app.use("/titles", titleRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/contents", contentRoutes);

module.exports = app;