const Conteudo = require("../entidades/Conteudo");

let conteudos = [];

exports.create = (req, res) => {
  const { title, type, genre, year, imageUrl } = req.body;

  const novoConteudo = new Conteudo(
    conteudos.length + 1,
    title,
    type,
    genre,
    year,
    imageUrl,
    req.usuarioId
  );

  conteudos.push(novoConteudo);

  res.status(201).json(novoConteudo);
};

exports.list = (req, res) => {
  res.json(conteudos);
};

exports.getById = (req, res) => {
  const conteudo = conteudos.find(
    (item) => item.id == req.params.id
  );

  if (!conteudo) {
    return res.status(404).json({
      error: "Conteúdo não encontrado"
    });
  }

  res.json(conteudo);
};

exports.remove = (req, res) => {
  conteudos = conteudos.filter(
    (item) => item.id != req.params.id
  );

  res.json({
    message: "Conteúdo removido"
  });
};

exports.update = (req, res) => {
  const conteudo = conteudos.find(
    (item) => item.id == req.params.id
  );

  if (!conteudo) {
    return res.status(404).json({
      error: "Conteúdo não encontrado"
    });
  }

  const { title, type, genre, year, imageUrl } = req.body;

  conteudo.title = title || conteudo.title;
  conteudo.type = type || conteudo.type;
  conteudo.genre = genre || conteudo.genre;
  conteudo.year = year || conteudo.year;
  conteudo.imageUrl = imageUrl || conteudo.imageUrl;

  res.json(conteudo);
};