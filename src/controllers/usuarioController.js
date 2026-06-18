const Usuario = require("../entidades/Usuario");

let usuarios = [];

exports.list = (req, res) => {
  res.json(usuarios);
};