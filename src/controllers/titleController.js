const { titles } = require("../data");
const minioClient = require("../minio");

const listTitles = (req, res) => {
  return res.json(titles);
};

const getTitleById = (req, res) => {
  const id = Number(req.params.id);
  const title = titles.find((item) => item.id === id);
  if (!title) {
    return res.status(404).json({ error: "Título não encontrado." });
  }
  return res.json(title);
};

const createTitle = (req, res) => {
  const { name, type, genre, year, description } = req.body;
  if (!name || !type || !genre || !year || !description) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  const newTitle = {
    id: titles.length + 1,
    name,
    type,
    genre,
    year: Number(year),
    description,
    poster: null,
  };

  titles.push(newTitle);
  return res.status(201).json(newTitle);
};

const uploadTitlePoster = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Arquivo de poster não enviado." });
  }

  if (!bucket) {
    return res.status(500).json({ error: "Firebase Storage não configurado." });
  }

  const id = Number(req.params.id);
  const title = titles.find((item) => item.id === id);
  if (!title) {
    return res.status(404).json({ error: "Título não encontrado." });
  }

const minioClient = require("../minio");

const filename = `posters/${Date.now()}_${req.file.originalname}`;

try {

  await minioClient.putObject(
    process.env.MINIO_BUCKET,
    filename,
    req.file.buffer,
    {
      "Content-Type": req.file.mimetype,
    }
  );

  const publicUrl =
    `http://localhost:9000/${process.env.MINIO_BUCKET}/${filename}`;

  title.poster = publicUrl;

  return res.json({
    posterUrl: publicUrl,
    title,
  });

} catch (error) {

  return res.status(500).json({
    error: "Erro ao enviar poster.",
  });

}
};

module.exports = {
  listTitles,
  getTitleById,
  createTitle,
  uploadTitlePoster,
};
